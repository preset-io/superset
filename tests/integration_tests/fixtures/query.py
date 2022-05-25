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
import uuid
from typing import Any, Dict

import pytest
from sqlalchemy import Column, create_engine, Date, Integer, MetaData, String, Table

from superset.extensions import db
from superset.models.core import Database
from superset.models.sql_lab import Query
from tests.integration_tests.test_app import app


@pytest.fixture
def get_query_datasource():
    engine = db.session.get_bind()
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
    db.session.add(query_obj)
    db.session.commit()

    yield query_obj

    # rollback changes
    db.session.delete(query_obj)
