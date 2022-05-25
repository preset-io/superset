# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import json
import uuid
from unittest.mock import patch

import pytest
from flask_appbuilder.security.sqla.models import User
from sqlalchemy import Column, create_engine, Date, Integer, MetaData, String, Table
from sqlalchemy.orm import Session

from superset.connectors.sqla.models import SqlaTable
from superset.datasets.commands.exceptions import DatasetAccessDeniedError
from superset.explore.form_data.commands.state import TemporaryExploreState
from superset.extensions import cache_manager, db
from superset.models.core import Database
from superset.models.slice import Slice
from superset.models.sql_lab import Query
from superset.utils.core import DatasourceType
from tests.integration_tests.base_tests import login
from tests.integration_tests.fixtures.client import client
from tests.integration_tests.fixtures.world_bank_dashboard import (
    load_world_bank_dashboard_with_slices,
    load_world_bank_data,
)
from tests.integration_tests.test_app import app

KEY = "test-key"
INITIAL_FORM_DATA = json.dumps({"test": "initial value"})
UPDATED_FORM_DATA = json.dumps({"test": "updated value"})


@pytest.fixture
def get_query_datasource():
    with app.app_context() as ctx:
        session: Session = ctx.app.appbuilder.get_session
        engine = session.get_bind()
        Query.metadata.create_all(engine)  # pylint: disable=no-member
        query_obj = Query(
            client_id="foo",
            database=Database(database_name="my_database", sqlalchemy_uri="sqlite://"),
            tab_name="test_tab",
            sql_editor_id="test_editor_id",
            sql="select * from bar",
            select_sql="select * from bar",
            executed_sql="select * from bar",
            limit=100,
            select_as_cta=False,
            rows=100,
            error_message="none",
            results_key="abc",
        )
        session.add(query_obj)
        session.commit()

        yield query_obj

        session.delete(query_obj)


@pytest.fixture
def query_id() -> int:
    with app.app_context() as ctx:
        session: Session = ctx.app.appbuilder.get_session
        query = session.query(Query).first()
        return query.id


@pytest.fixture
def chart_id(load_world_bank_dashboard_with_slices) -> int:
    with app.app_context() as ctx:
        session: Session = ctx.app.appbuilder.get_session
        chart = session.query(Slice).filter_by(slice_name="World's Population").one()
        return chart.id


@pytest.fixture
def admin_id() -> int:
    with app.app_context() as ctx:
        session: Session = ctx.app.appbuilder.get_session
        admin = session.query(User).filter_by(username="admin").one()
        return admin.id


@pytest.fixture
def datasource() -> int:
    with app.app_context() as ctx:
        session: Session = ctx.app.appbuilder.get_session
        dataset = (
            session.query(SqlaTable)
            .filter_by(table_name="wb_health_population")
            .first()
        )
        return dataset


@pytest.fixture(autouse=True)
def cache(chart_id, admin_id, datasource):
    entry: TemporaryExploreState = {
        "owner": admin_id,
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": INITIAL_FORM_DATA,
    }
    cache_manager.explore_form_data_cache.set(KEY, entry)


def test_post(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": INITIAL_FORM_DATA,
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    assert resp.status_code == 201


def test_post_bad_request_non_string(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": 1234,
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    assert resp.status_code == 400


def test_post_bad_request_non_json_string(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": "foo",
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    assert resp.status_code == 400


def test_post_access_denied(client, chart_id: int, datasource: SqlaTable):
    login(client, "gamma")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": INITIAL_FORM_DATA,
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    assert resp.status_code == 404


def test_post_same_key_for_same_context(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key == second_key


def test_post_different_key_for_different_context(
    client, chart_id: int, datasource: SqlaTable
):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "form_data": json.dumps({"test": "initial value"}),
    }
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key != second_key


def test_post_same_key_for_same_tab_id(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": json.dumps({"test": "initial value"}),
    }
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key == second_key


def test_post_different_key_for_different_tab_id(
    client, chart_id: int, datasource: SqlaTable
):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": json.dumps({"test": "initial value"}),
    }
    resp = client.post("api/v1/explore/form_data?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.post("api/v1/explore/form_data?tab_id=2", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key != second_key


def test_post_different_key_for_no_tab_id(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": INITIAL_FORM_DATA,
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.post("api/v1/explore/form_data", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key != second_key


def test_put(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 200


def test_put_same_key_for_same_tab_id(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.put(f"api/v1/explore/form_data/{KEY}?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key == second_key


def test_put_different_key_for_different_tab_id(
    client, chart_id: int, datasource: SqlaTable
):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}?tab_id=1", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.put(f"api/v1/explore/form_data/{KEY}?tab_id=2", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key != second_key


def test_put_different_key_for_no_tab_id(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    first_key = data.get("key")
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    data = json.loads(resp.data.decode("utf-8"))
    second_key = data.get("key")
    assert first_key != second_key


def test_put_bad_request(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": 1234,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 400


def test_put_bad_request_non_string(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": 1234,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 400


def test_put_bad_request_non_json_string(client, chart_id: int, datasource: SqlaTable):
    login(client, "admin")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": "foo",
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 400


def test_put_access_denied(client, chart_id: int, datasource: SqlaTable):
    login(client, "gamma")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 404


def test_put_not_owner(client, chart_id: int, datasource: SqlaTable):
    login(client, "gamma")
    payload = {
        "datasource_id": datasource.id,
        "datasource_type": datasource.type,
        "chart_id": chart_id,
        "form_data": UPDATED_FORM_DATA,
    }
    resp = client.put(f"api/v1/explore/form_data/{KEY}", json=payload)
    assert resp.status_code == 404


def test_get_key_not_found(client):
    login(client, "admin")
    resp = client.get(f"api/v1/explore/form_data/unknown-key")
    assert resp.status_code == 404


def test_get(client):
    login(client, "admin")
    resp = client.get(f"api/v1/explore/form_data/{KEY}")
    assert resp.status_code == 200
    data = json.loads(resp.data.decode("utf-8"))
    assert INITIAL_FORM_DATA == data.get("form_data")


def test_get_access_denied(client):
    login(client, "gamma")
    resp = client.get(f"api/v1/explore/form_data/{KEY}")
    assert resp.status_code == 404


@patch("superset.security.SupersetSecurityManager.can_access_datasource")
def test_get_dataset_access_denied(mock_can_access_datasource, client):
    mock_can_access_datasource.side_effect = DatasetAccessDeniedError()
    login(client, "admin")
    resp = client.get(f"api/v1/explore/form_data/{KEY}")
    assert resp.status_code == 403


def test_delete(client):
    login(client, "admin")
    resp = client.delete(f"api/v1/explore/form_data/{KEY}")
    assert resp.status_code == 200


def test_delete_access_denied(client):
    login(client, "gamma")
    resp = client.delete(f"api/v1/explore/form_data/{KEY}")
    assert resp.status_code == 404


def test_delete_not_owner(client, chart_id: int, datasource: SqlaTable, admin_id: int):
    another_key = "another_key"
    another_owner = admin_id + 1
    entry: TemporaryExploreState = {
        "owner": another_owner,
        "datasource_id": datasource.id,
        "datasource_type": DatasourceType(datasource.type),
        "chart_id": chart_id,
        "form_data": INITIAL_FORM_DATA,
    }
    cache_manager.explore_form_data_cache.set(another_key, entry)
    login(client, "admin")
    resp = client.delete(f"api/v1/explore/form_data/{another_key}")
    assert resp.status_code == 403


@pytest.mark.usefixtures("get_query_datasource")
def test_post_with_query(client, chart_id: int, get_query_datasource: Query):
    login(client, "admin")
    form_data = {
        "adhoc_filters": [],
        "viz_type": "sankey",
        "groupby": ["target"],
        "metric": "sum__value",
        "row_limit": 5000,
        "slice_id": chart_id,
        "time_range_endpoints": ["inclusive", "exclusive"],
        "datasource": f"100__query",
    }
    payload = {
        "datasource_id": get_query_datasource.id,
        "chart_id": chart_id,
        "form_data": json.dumps(form_data),
        "datasource_type": "query",
    }
    resp = client.post("api/v1/explore/form_data", json=payload)
    assert resp.status_code == 201
