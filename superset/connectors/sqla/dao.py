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

from collections import defaultdict
from typing import Dict, List, Optional, Set

from flask_appbuilder.security.sqla.manager import SecurityManager
from sqlalchemy import or_
from sqlalchemy.orm import Session

from superset import db
from superset.connectors.sqla.models import SqlaTable
from superset.dao.base import BaseDAO
from superset.models.core import Database
from superset.utils.core import DatasourceName


class SqlaTableDAO(BaseDAO):
    @classmethod
    def get_all_datasets(cls, session: Session) -> List[SqlaTable]:
        qry = session.query(SqlaTable)
        qry = SqlaTable.default_query(qry)
        return qry.all()

    @classmethod
    def query_datasources_by_permissions(  # pylint: disable=invalid-name
        cls,
        session: Session,
        database: Database,
        permissions: Set[str],
        schema_perms: Set[str],
    ) -> List[SqlaTable]:
        # TODO(hughhhh): add unit test

        return (
            session.query(SqlaTable)
            .filter_by(database_id=database.id)
            .filter(
                or_(
                    SqlaTable.perm.in_(permissions),
                    SqlaTable.schema_perm.in_(schema_perms),
                )
            )
            .all()
        )

    @classmethod
    def get_user_datasets(cls) -> List[SqlaTable]:
        """
        Collect datasets which the user has explicit permissions to.

        :returns: The list of datasets
        """
        session = db.session
        user_perms = SecurityManager.user_view_menu_names("datasource_access")
        schema_perms = SecurityManager.user_view_menu_names("schema_access")
        user_datasets = (
            session.query(SqlaTable)
            .filter(
                or_(
                    SqlaTable.perm.in_(user_perms),
                    SqlaTable.schema_perm.in_(schema_perms),
                )
            )
            .all()
        )

        # group all datasets by database
        all_datasets = cls.get_all_datasets(session)
        datasets_by_database: Dict[Database, Set[SqlaTable]] = defaultdict(set)
        for dataset in all_datasets:
            datasets_by_database[dataset.database].add(dataset)

        # add datasets with implicit permission (eg, database access)
        for database, datasets in datasets_by_database.items():
            if SecurityManager.can_access_database(database):
                user_datasets.update(datasets)

        return list(user_datasets)

    @classmethod
    def get_datasources_accessible_by_user(  # pylint: disable=invalid-name
        self,
        database: Database,
        datasource_names: List[DatasourceName],
        schema: Optional[str] = None,
    ) -> List[DatasourceName]:
        """
        Return the list of SQL tables accessible by the user.

        :param database: The SQL database
        :param datasource_names: The list of eligible SQL tables w/ schema
        :param schema: The fallback SQL schema if not present in the table name
        :returns: The list of accessible SQL tables w/ schema
        """

        if SecurityManager.can_access_database(database):
            return datasource_names

        if schema:
            schema_perm = SecurityManager.get_schema_perm(database, schema)
            if schema_perm and SecurityManager.can_access("schema_access", schema_perm):
                return datasource_names

        user_perms = SecurityManager.user_view_menu_names("datasource_access")
        schema_perms = SecurityManager.user_view_menu_names("schema_access")
        user_datasources = self.query_datasources_by_permissions(
            db.session, database, user_perms, schema_perms
        )
        if schema:
            names = {d.table_name for d in user_datasources if d.schema == schema}
            return [d for d in datasource_names if d.table in names]

        full_names = {d.full_name for d in user_datasources}
        return [d for d in datasource_names if f"[{database}].[{d}]" in full_names]
