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
import logging

from flask import request, Response
from flask_appbuilder.api import expose, protect, rison, safe
from flask_appbuilder.models.sqla.interface import SQLAInterface

from superset.constants import MODEL_API_RW_METHOD_PERMISSION_MAP, RouteMethod
from superset.extensions import event_logger
from superset.message_threads.commands.get_or_create import GetOrCreateThreadCommand
from superset.message_threads.models import MessageThread
from superset.views.base_api import (
    BaseSupersetModelRestApi,
    RelatedFieldFilter,
    statsd_metrics,
)
from superset.views.filters import BaseFilterRelatedUsers, FilterRelatedOwners

logger = logging.getLogger(__name__)


class MessageThreadRestApi(BaseSupersetModelRestApi):
    datamodel = SQLAInterface(MessageThread)
    include_route_methods = RouteMethod.REST_MODEL_VIEW_CRUD_SET

    resource_name = "message_threads"
    allow_browser_login = True

    class_permission_name = "MessageThread"
    method_permission_name = MODEL_API_RW_METHOD_PERMISSION_MAP

    list_columns = [
        "id",
        "dashboard_id",
        "chart_id",
    ]

    list_select_columns = list_columns
    add_columns = list_columns

    show_columns = ["id", "dashboard_id", "chart_id", "uuid"]

    @expose("/", methods=("POST",))
    @protect()
    @safe
    @statsd_metrics
    @event_logger.log_this_with_context(
        action=lambda self, *args, **kwargs: f"{self.__class__.__name__}.add_threads",
        log_to_statsd=False,
    )
    def post(self) -> Response:
        try:
            data = request.json
            chart_id, dashboard_id = (
                data.get(key) for key in ["chart_id", "dashboard_id"]
            )
            # This validates custom Schema with custom validations
            thread = GetOrCreateThreadCommand(
                workspace_name="test",
                chart_id=chart_id,
                dashboard_id=dashboard_id,
            ).run()
            logger.info("thread: %s", thread.uuid)
            return self.response(201, result={"thread_id": thread.uuid})
        except KeyError:
            return self.response(
                400,
                message="Missing required field",
            )
