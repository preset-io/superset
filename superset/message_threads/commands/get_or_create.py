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
from typing import Optional, Union

from superset.commands.base import BaseCommand, CreateMixin
from superset.daos.exceptions import DAOCreateFailedError
from superset.daos.message_thread import MessageThreadDAO
from superset.message_threads.models import MessageThread

logger = logging.getLogger(__name__)


class GetOrCreateThreadCommand(BaseCommand):
    def __init__(
        self,
        workspace_name,
        chart_id: Optional[int],
        dashboard_id: Optional[int],
    ):
        self.workspace_name = workspace_name
        self.chart_id = chart_id
        self.dashboard_id = dashboard_id

    def run(self) -> Union[MessageThread, None]:
        try:
            message_thread = MessageThreadDAO.get_or_create(
                workspace_name=self.workspace_name,
                dashboard_id=self.dashboard_id,
                chart_id=self.chart_id,
            )
            return message_thread
        except DAOCreateFailedError as ex:
            logger.exception(ex.exception)

    def validate(self) -> None:
        return super().validate()

    # def validate(self) -> None:
    #     exceptions = []
    #     # Validate object_id
    #     if self._object_id == 0:
    #         exceptions.append(TagCreateFailedError())
    #     # Validate object type
    #     object_type = to_object_type(self._object_type)
    #     if not object_type:
    #         exceptions.append(
    #             TagCreateFailedError(f"invalid object type {self._object_type}")
    #         )
    #     if exceptions:
    #         raise TagInvalidError(exceptions=exceptions)
