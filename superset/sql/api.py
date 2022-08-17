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
import logging
from typing import Any, Callable, cast, Dict, List, Optional, Union

from flask import g, request, Response
from flask_appbuilder.api import BaseApi, expose, protect, safe

from superset import app, db, event_logger, is_feature_enabled
from superset.charts.commands.exceptions import ChartNotFoundError
from superset.constants import MODEL_API_RW_METHOD_PERMISSION_MAP, RouteMethod
from superset.databases.dao import DatabaseDAO
from superset.explore.commands.get import GetExploreCommand
from superset.explore.commands.parameters import CommandParameters
from superset.explore.exceptions import DatasetAccessDeniedError, WrongEndpointError
from superset.explore.permalink.exceptions import ExplorePermalinkGetFailedError
from superset.explore.schemas import ExploreContextSchema
from superset.extensions import event_logger
from superset.models.sql_lab import Query, TabState
from superset.utils import core as utils
from superset.utils.core import get_user_id
from superset.views.base import common_bootstrap_payload
from superset.views.utils import bootstrap_user_data

logger = logging.getLogger(__name__)

config = app.config

DATABASE_KEYS = [
    "allow_file_upload",
    "allow_ctas",
    "allow_cvas",
    "allow_dml",
    "allow_multi_schema_metadata_fetch",
    "allow_run_async",
    "allows_subquery",
    "backend",
    "database_name",
    "expose_in_sqllab",
    "force_ctas_schema",
    "id",
    "disable_data_preview",
]


class SqlRestApi(BaseApi):
    method_permission_name = MODEL_API_RW_METHOD_PERMISSION_MAP
    include_route_methods = {RouteMethod.GET}
    allow_browser_login = True
    # TO DO: make this use Sql permission not Explore
    class_permission_name = "Explore"
    resource_name = "sql"
    # openapi_spec_tag = "Sql"
    # openapi_spec_component_schemas = (ExploreContextSchema,)

    @staticmethod
    def _get_sqllab_tabs(user_id: Optional[int]) -> Dict[str, Any]:
        # send list of tab state ids
        tabs_state = (
            db.session.query(TabState.id, TabState.label)
            .filter_by(user_id=user_id)
            .all()
        )
        tab_state_ids = [str(tab_state[0]) for tab_state in tabs_state]
        # return first active tab, or fallback to another one if no tab is active
        active_tab = (
            db.session.query(TabState)
            .filter_by(user_id=user_id)
            .order_by(TabState.active.desc())
            .first()
        )

        databases: Dict[int, Any] = {}
        for database in DatabaseDAO.find_all():
            databases[database.id] = {
                k: v for k, v in database.to_json().items() if k in DATABASE_KEYS
            }
            databases[database.id]["backend"] = database.backend
        queries: Dict[str, Any] = {}

        # These are unnecessary if sqllab backend persistence is disabled
        if is_feature_enabled("SQLLAB_BACKEND_PERSISTENCE"):
            # return all user queries associated with existing SQL editors
            user_queries = (
                db.session.query(Query)
                .filter_by(user_id=user_id)
                .filter(Query.sql_editor_id.in_(tab_state_ids))
                .all()
            )
            queries = {
                query.client_id: dict(query.to_dict().items()) for query in user_queries
            }

        return {
            "tab_state_ids": tabs_state,
            "active_tab": active_tab.to_dict() if active_tab else None,
            "databases": databases,
            "queries": queries,
        }

    @expose("/", methods=["GET"])
    # need to track down where permision is assinged to roles
    @protect()
    @safe
    @event_logger.log_this_with_context(
        action=lambda self, *args, **kwargs: f"{self.__class__.__name__}.get",
        log_to_statsd=True,
    )
    def get(self) -> Response:

        payload = {
            "defaultDbId": config["SQLLAB_DEFAULT_DBID"],
            "common": common_bootstrap_payload(),
            **self._get_sqllab_tabs(get_user_id()),
        }

        form_data = request.form.get("form_data")
        if form_data:
            try:
                payload["requested_query"] = json.loads(form_data)
            except json.JSONDecodeError:
                pass

        payload["user"] = bootstrap_user_data(g.user, include_perms=True)
        bootstrap_data = json.dumps(
            payload, default=utils.pessimistic_json_iso_dttm_ser
        )

        return self.response(200, result=bootstrap_data)
