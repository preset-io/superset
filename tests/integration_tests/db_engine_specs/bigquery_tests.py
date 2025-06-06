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
import unittest.mock as mock
from contextlib import contextmanager

import pytest
from pandas import DataFrame
from sqlalchemy import column

from superset.connectors.sqla.models import TableColumn
from superset.db_engine_specs.base import BaseEngineSpec
from superset.db_engine_specs.bigquery import BigQueryEngineSpec
from superset.errors import ErrorLevel, SupersetError, SupersetErrorType
from superset.sql.parse import Table
from tests.integration_tests.base_tests import SupersetTestCase
from tests.integration_tests.fixtures.birth_names_dashboard import (
    load_birth_names_dashboard_with_slices,  # noqa: F401
    load_birth_names_data,  # noqa: F401
)


@contextmanager
def mock_engine_with_credentials(*args, **kwargs):
    engine_mock = mock.Mock()
    engine_mock.dialect.credentials_info = {
        "key": "value"
    }  # Add the credentials_info attribute
    yield engine_mock


class TestBigQueryDbEngineSpec(SupersetTestCase):
    def test_bigquery_sqla_column_label(self):
        """
        DB Eng Specs (bigquery): Test column label
        """
        test_cases = {
            "Col": "Col",
            "SUM(x)": "SUM_x__5f110",
            "SUM[x]": "SUM_x__7ebe1",
            "12345_col": "_12345_col_8d390",
        }
        for original, expected in test_cases.items():
            actual = BigQueryEngineSpec.make_label_compatible(column(original).name)
            assert actual == expected

    def test_timegrain_expressions(self):
        """
        DB Eng Specs (bigquery): Test time grain expressions
        """
        col = column("temporal")
        test_cases = {
            "DATE": "DATE_TRUNC(temporal, HOUR)",
            "TIME": "TIME_TRUNC(temporal, HOUR)",
            "DATETIME": "DATETIME_TRUNC(temporal, HOUR)",
            "TIMESTAMP": "TIMESTAMP_TRUNC(temporal, HOUR)",
        }
        for type_, expected in test_cases.items():
            col.type = type_
            actual = BigQueryEngineSpec.get_timestamp_expr(
                col=col, pdf=None, time_grain="PT1H"
            )
            assert str(actual) == expected

    def test_custom_minute_timegrain_expressions(self):
        """
        DB Eng Specs (bigquery): Test time grain expressions
        """
        col = column("temporal")
        test_cases = {
            "DATE": "CAST(TIMESTAMP_SECONDS("
            "5*60 * DIV(UNIX_SECONDS(CAST(temporal AS TIMESTAMP)), 5*60)"
            ") AS DATE)",
            "DATETIME": "CAST(TIMESTAMP_SECONDS("
            "5*60 * DIV(UNIX_SECONDS(CAST(temporal AS TIMESTAMP)), 5*60)"
            ") AS DATETIME)",
            "TIMESTAMP": "CAST(TIMESTAMP_SECONDS("
            "5*60 * DIV(UNIX_SECONDS(CAST(temporal AS TIMESTAMP)), 5*60)"
            ") AS TIMESTAMP)",
        }
        for type_, expected in test_cases.items():
            col.type = type_
            actual = BigQueryEngineSpec.get_timestamp_expr(
                col=col, pdf=None, time_grain="PT5M"
            )
            assert str(actual) == expected

    def test_fetch_data(self):
        """
        DB Eng Specs (bigquery): Test fetch data
        """

        # Mock a google.cloud.bigquery.table.Row
        class Row:
            def __init__(self, value):
                self._value = value

            def values(self):
                return self._value

        data1 = [(1, "foo")]
        with mock.patch.object(BaseEngineSpec, "fetch_data", return_value=data1):
            result = BigQueryEngineSpec.fetch_data(None, 0)
        assert result == data1

        data2 = [Row(1), Row(2)]
        with mock.patch.object(BaseEngineSpec, "fetch_data", return_value=data2):
            result = BigQueryEngineSpec.fetch_data(None, 0)
        assert result == [1, 2]

    @mock.patch.object(
        BigQueryEngineSpec, "get_engine", side_effect=mock_engine_with_credentials
    )
    @mock.patch.object(BigQueryEngineSpec, "get_time_partition_column")
    @mock.patch.object(BigQueryEngineSpec, "get_max_partition_id")
    @mock.patch.object(BigQueryEngineSpec, "quote_table", return_value="`table_name`")
    def test_get_extra_table_metadata(
        self,
        mock_quote_table,
        mock_get_max_partition_id,
        mock_get_time_partition_column,
        mock_get_engine,
    ):
        """
        DB Eng Specs (bigquery): Test extra table metadata
        """
        database = mock.Mock()
        sql = "SELECT * FROM `table_name`"
        database.compile_sqla_query.return_value = sql
        tbl = Table("some_table", "some_schema")

        # Test no indexes
        mock_get_time_partition_column.return_value = None
        mock_get_max_partition_id.return_value = None
        result = BigQueryEngineSpec.get_extra_table_metadata(database, tbl)
        assert result == {}

        mock_get_time_partition_column.return_value = "ds"
        mock_get_max_partition_id.return_value = "19690101"
        result = BigQueryEngineSpec.get_extra_table_metadata(database, tbl)
        print(result)
        assert result == {
            "indexes": [{"cols": ["ds"], "name": "partitioned", "type": "partitioned"}],
            "partitions": {
                "cols": ["ds"],
                "latest": {"ds": "19690101"},
                "partitionQuery": sql,
            },
        }

    @mock.patch("superset.db_engine_specs.bigquery.BigQueryEngineSpec.get_engine")
    @mock.patch("superset.db_engine_specs.bigquery.pandas_gbq")
    @mock.patch("superset.db_engine_specs.bigquery.service_account")
    def test_df_to_sql(self, mock_service_account, mock_pandas_gbq, mock_get_engine):
        """
        DB Eng Specs (bigquery): Test DataFrame to SQL contract
        """
        mock_service_account.Credentials.from_service_account_info = mock.MagicMock(
            return_value="account_info"
        )

        mock_get_engine.return_value.__enter__.return_value.url.host = "google-host"
        mock_get_engine.return_value.__enter__.return_value.dialect.credentials_info = (
            "secrets"
        )

        df = DataFrame()
        database = mock.MagicMock()
        BigQueryEngineSpec.df_to_sql(
            database=database,
            table=Table(table="name", schema="schema"),
            df=df,
            to_sql_kwargs={"if_exists": "extra_key"},
        )

        mock_pandas_gbq.to_gbq.assert_called_with(
            df,
            project_id="google-host",
            destination_table="schema.name",
            credentials="account_info",
            if_exists="extra_key",
        )

    def test_extract_errors(self):
        msg = "403 POST https://bigquery.googleapis.com/bigquery/v2/projects/test-keel-310804/jobs?prettyPrint=false: Access Denied: Project profound-keel-310804: User does not have bigquery.jobs.create permission in project profound-keel-310804"  # noqa: E501
        result = BigQueryEngineSpec.extract_errors(Exception(msg))
        assert result == [
            SupersetError(
                message='Unable to connect. Verify that the following roles are set on the service account: "BigQuery Data Viewer", "BigQuery Metadata Viewer", "BigQuery Job User" and the following permissions are set "bigquery.readsessions.create", "bigquery.readsessions.getData"',  # noqa: E501
                error_type=SupersetErrorType.CONNECTION_DATABASE_PERMISSIONS_ERROR,
                level=ErrorLevel.ERROR,
                extra={
                    "engine_name": "Google BigQuery",
                    "issue_codes": [
                        {
                            "code": 1017,
                            "message": "",
                        }
                    ],
                },
            )
        ]

        msg = "bigquery error: 404 Not found: Dataset fakeDataset:bogusSchema was not found in location"  # noqa: E501
        result = BigQueryEngineSpec.extract_errors(Exception(msg))
        assert result == [
            SupersetError(
                message='The schema "bogusSchema" does not exist. A valid schema must be used to run this query.',  # noqa: E501
                error_type=SupersetErrorType.SCHEMA_DOES_NOT_EXIST_ERROR,
                level=ErrorLevel.ERROR,
                extra={
                    "engine_name": "Google BigQuery",
                    "issue_codes": [
                        {
                            "code": 1003,
                            "message": "Issue 1003 - There is a syntax error in the SQL query. Perhaps there was a misspelling or a typo.",  # noqa: E501
                        },
                        {
                            "code": 1004,
                            "message": "Issue 1004 - The column was deleted or renamed in the database.",  # noqa: E501
                        },
                    ],
                },
            )
        ]

        msg = 'Table name "badtable" missing dataset while no default dataset is set in the request'  # noqa: E501
        result = BigQueryEngineSpec.extract_errors(Exception(msg))
        assert result == [
            SupersetError(
                message='The table "badtable" does not exist. A valid table must be used to run this query.',  # noqa: E501
                error_type=SupersetErrorType.TABLE_DOES_NOT_EXIST_ERROR,
                level=ErrorLevel.ERROR,
                extra={
                    "engine_name": "Google BigQuery",
                    "issue_codes": [
                        {
                            "code": 1003,
                            "message": "Issue 1003 - There is a syntax error in the SQL query. Perhaps there was a misspelling or a typo.",  # noqa: E501
                        },
                        {
                            "code": 1005,
                            "message": "Issue 1005 - The table was deleted or renamed in the database.",  # noqa: E501
                        },
                    ],
                },
            )
        ]

        msg = "Unrecognized name: badColumn at [1:8]"
        result = BigQueryEngineSpec.extract_errors(Exception(msg))
        assert result == [
            SupersetError(
                message='We can\'t seem to resolve column "badColumn" at line 1:8.',
                error_type=SupersetErrorType.COLUMN_DOES_NOT_EXIST_ERROR,
                level=ErrorLevel.ERROR,
                extra={
                    "engine_name": "Google BigQuery",
                    "issue_codes": [
                        {
                            "code": 1003,
                            "message": "Issue 1003 - There is a syntax error in the SQL query. Perhaps there was a misspelling or a typo.",  # noqa: E501
                        },
                        {
                            "code": 1004,
                            "message": "Issue 1004 - The column was deleted or renamed in the database.",  # noqa: E501
                        },
                    ],
                },
            )
        ]

        msg = 'Syntax error: Expected end of input but got identifier "from_"'
        result = BigQueryEngineSpec.extract_errors(Exception(msg))
        assert result == [
            SupersetError(
                message='Please check your query for syntax errors at or near "from_". Then, try running your query again.',  # noqa: E501
                error_type=SupersetErrorType.SYNTAX_ERROR,
                level=ErrorLevel.ERROR,
                extra={
                    "engine_name": "Google BigQuery",
                    "issue_codes": [
                        {
                            "code": 1030,
                            "message": "Issue 1030 - The query has a syntax error.",
                        }
                    ],
                },
            )
        ]

    @mock.patch("superset.models.core.Database.db_engine_spec", BigQueryEngineSpec)
    @mock.patch("sqlalchemy_bigquery._helpers.create_bigquery_client", mock.Mock)
    @pytest.mark.usefixtures("load_birth_names_dashboard_with_slices")
    def test_calculated_column_in_order_by(self):
        table = self.get_table(name="birth_names")
        TableColumn(
            column_name="gender_cc",
            type="VARCHAR(255)",
            table=table,
            expression="""
            case
              when gender='boy' then 'male'
              else 'female'
            end
            """,
        )

        table.database.sqlalchemy_uri = "bigquery://"
        query_obj = {
            "groupby": ["gender_cc"],
            "is_timeseries": False,
            "filter": [],
            "orderby": [["gender_cc", True]],
        }
        sql = table.get_query_str(query_obj)
        assert "ORDER BY `gender_cc` ASC" in sql
