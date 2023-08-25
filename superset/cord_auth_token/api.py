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
from superset.cord_auth_token.commands.create import CreateCordAuthTokenCommand
from superset.cord_auth_token.models import CordAuthToken
from superset.extensions import event_logger
from superset.views.base_api import (
    BaseSupersetModelRestApi,
    RelatedFieldFilter,
    statsd_metrics,
)
from superset.views.filters import BaseFilterRelatedUsers, FilterRelatedOwners

logger = logging.getLogger(__name__)


# This api would live in manager. It will get the workspace name from shell
class CordTokenRestApi(BaseSupersetModelRestApi):
    datamodel = SQLAInterface(CordAuthToken)  # this model does not persist in db
    include_route_methods = RouteMethod.REST_MODEL_VIEW_CRUD_SET

    resource_name = "cord_token"
    allow_browser_login = True

    class_permission_name = "CordToken"
    method_permission_name = MODEL_API_RW_METHOD_PERMISSION_MAP

    list_columns = [
        "id",
        "user_id",
        "auth_token",
    ]

    list_select_columns = list_columns
    add_columns = list_columns

    show_columns = [
        "id",
        "user_id",
        "auth_token",
    ]

    # in manager it will be something like /api/v1/cord_token/<workspace_name>
    @expose("/", methods=("POST",))
    @protect()
    @safe
    @statsd_metrics
    @event_logger.log_this_with_context(
        action=lambda self, *args, **kwargs: f"{self.__class__.__name__}.add_token",
        log_to_statsd=False,
    )
    def post(self) -> Response:
        try:
            cord_auth_token = CreateCordAuthTokenCommand().run()
            return self.response(201, response={"auth_token": cord_auth_token})
        except KeyError:
            return self.response(
                400,
                message="Missing required field",
            )
