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
from typing import Union

from flask import g
from sqlalchemy.exc import SQLAlchemyError

from superset.daos.base import BaseDAO
from superset.daos.exceptions import DAOCreateFailedError, DAODeleteFailedError
from superset.exceptions import MissingUserContextException
from superset.extensions import db
from superset.message_threads.models import MessageThread
from superset.models.dashboard import Dashboard
from superset.models.slice import Slice
from superset.models.sql_lab import SavedQuery
from superset.tags.commands.exceptions import TagNotFoundError
from superset.utils.core import get_user_id

logger = logging.getLogger(__name__)


class MessageThreadDAO(BaseDAO[MessageThread]):
    # base_filter = TagAccessFilter

    @staticmethod
    def get_or_create(
        workspace_name, chart_id, dashboard_id
    ) -> Union[MessageThread, None]:
        """
        Gets or creates a Cord Auth Token object
        """

        # check that the user can access the chart and dashboard
        slice = db.session.query(Slice).filter(Slice.id == chart_id).first()
        dataset = slice.table
        dataset.raise_for_access()

        # not sure if we also need this check
        dashboard = (
            db.session.query(Dashboard).filter(Dashboard.id == dashboard_id).first()
        )
        dashboard.raise_for_access()
        message_thread = (
            db.session.query(MessageThread)
            .filter(
                MessageThread.workspace_name == workspace_name,
                MessageThread.chart_id == chart_id,
                MessageThread.dashboard_id == dashboard_id,
            )
            .one_or_none()
        )
        logger.info("message_thread: %s", message_thread)
        if not message_thread:
            # Create new thread

            message_thread = MessageThread(
                workspace_name=workspace_name,
                dashboard_id=dashboard_id,
                chart_id=chart_id,
            )
            logger.info("new message_thread: %s", message_thread.uuid)
            try:
                db.session.add(message_thread)
                db.session.commit()
            except SQLAlchemyError as ex:
                pass

        return message_thread
