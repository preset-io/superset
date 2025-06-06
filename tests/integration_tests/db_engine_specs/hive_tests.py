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
# isort:skip_file
from unittest import mock
import unittest

import pytest
import pandas as pd
from sqlalchemy.sql import select

from superset.db_engine_specs.hive import HiveEngineSpec, upload_to_s3
from superset.exceptions import SupersetException
from superset.sql.parse import Table
from tests.integration_tests.base_tests import SupersetTestCase
from tests.integration_tests.test_app import app


def test_0_progress():
    log = """
        17/02/07 18:26:27 INFO log.PerfLogger: <PERFLOG method=compile from=org.apache.hadoop.hive.ql.Driver>
        17/02/07 18:26:27 INFO log.PerfLogger: <PERFLOG method=parse from=org.apache.hadoop.hive.ql.Driver>
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 0


def test_number_of_jobs_progress():
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
    """.split("\n")
    assert HiveEngineSpec.progress(log) == 0


def test_job_1_launched_progress():
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
    """.split("\n")
    assert HiveEngineSpec.progress(log) == 0


def test_job_1_launched_stage_1():
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 0%,  reduce = 0%
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 0


def test_job_1_launched_stage_1_map_40_progress():  # pylint: disable=invalid-name
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 0%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 40%,  reduce = 0%
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 10


def test_job_1_launched_stage_1_map_80_reduce_40_progress():  # pylint: disable=invalid-name
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 0%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 40%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 80%,  reduce = 40%
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 30


def test_job_1_launched_stage_2_stages_progress():  # pylint: disable=invalid-name
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 0%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 40%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 80%,  reduce = 40%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-2 map = 0%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 100%,  reduce = 0%
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 12


def test_job_2_launched_stage_2_stages_progress():  # pylint: disable=invalid-name
    log = """
        17/02/07 19:15:55 INFO ql.Driver: Total jobs = 2
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 1 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 100%,  reduce = 0%
        17/02/07 19:15:55 INFO ql.Driver: Launching Job 2 out of 2
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 0%,  reduce = 0%
        17/02/07 19:16:09 INFO exec.Task: 2017-02-07 19:16:09,173 Stage-1 map = 40%,  reduce = 0%
    """.split("\n")  # noqa: E501
    assert HiveEngineSpec.progress(log) == 60


def test_hive_error_msg():
    msg = (
        '{...} errorMessage="Error while compiling statement: FAILED: '
        "SemanticException [Error 10001]: Line 4"
        ":5 Table not found 'fact_ridesfdslakj'\", statusCode=3, "
        "sqlState='42S02', errorCode=10001)){...}"
    )
    assert HiveEngineSpec.extract_error_message(Exception(msg)) == (
        "hive error: Error while compiling statement: FAILED: "
        "SemanticException [Error 10001]: Line 4:5 "
        "Table not found 'fact_ridesfdslakj'"
    )

    e = Exception("Some string that doesn't match the regex")
    assert HiveEngineSpec.extract_error_message(e) == f"hive error: {e}"

    msg = (
        "errorCode=10001, "
        'errorMessage="Error while compiling statement"), operationHandle'
        '=None)"'
    )
    assert (
        HiveEngineSpec.extract_error_message(Exception(msg))
        == "hive error: Error while compiling statement"
    )


def test_df_to_csv() -> None:
    with pytest.raises(SupersetException):
        HiveEngineSpec.df_to_sql(
            mock.MagicMock(),
            Table("foobar"),
            pd.DataFrame(),
            {"if_exists": "append"},
        )


@mock.patch("superset.db_engine_specs.hive.g", spec={})
def test_df_to_sql_if_exists_fail(mock_g):
    mock_g.user = True
    mock_database = mock.MagicMock()
    mock_database.get_df.return_value.empty = False
    with pytest.raises(SupersetException, match="Table already exists"):
        HiveEngineSpec.df_to_sql(
            mock_database, Table("foobar"), pd.DataFrame(), {"if_exists": "fail"}
        )


@mock.patch("superset.db_engine_specs.hive.g", spec={})
@unittest.skipUnless(
    SupersetTestCase.is_module_installed("thrift"), "thrift not installed"
)
def test_df_to_sql_if_exists_fail_with_schema(mock_g):
    mock_g.user = True
    mock_database = mock.MagicMock()
    mock_database.get_df.return_value.empty = False
    with pytest.raises(SupersetException, match="Table already exists"):
        HiveEngineSpec.df_to_sql(
            mock_database,
            Table(table="foobar", schema="schema"),
            pd.DataFrame(),
            {"if_exists": "fail"},
        )


@mock.patch("superset.db_engine_specs.hive.g", spec={})
@mock.patch("superset.db_engine_specs.hive.upload_to_s3")
@unittest.skipUnless(
    SupersetTestCase.is_module_installed("boto3"), "boto3 not installed"
)
def test_df_to_sql_if_exists_replace(mock_upload_to_s3, mock_g):
    config = app.config.copy()
    app.config["CSV_TO_HIVE_UPLOAD_DIRECTORY_FUNC"]: lambda *args: ""  # noqa: F722
    mock_upload_to_s3.return_value = "mock-location"
    mock_g.user = True
    mock_database = mock.MagicMock()
    mock_database.get_df.return_value.empty = False
    mock_execute = mock.MagicMock(return_value=True)
    mock_database.get_sqla_engine.return_value.__enter__.return_value.execute = (
        mock_execute
    )
    table_name = "foobar"

    with app.app_context():
        HiveEngineSpec.df_to_sql(
            mock_database,
            Table(table=table_name),
            pd.DataFrame(),
            {"if_exists": "replace", "header": 1, "na_values": "mock", "sep": "mock"},
        )

    mock_execute.assert_any_call(f"DROP TABLE IF EXISTS {table_name}")
    app.config = config


@mock.patch("superset.db_engine_specs.hive.g", spec={})
@mock.patch("superset.db_engine_specs.hive.upload_to_s3")
def test_df_to_sql_if_exists_replace_with_schema(mock_upload_to_s3, mock_g):
    config = app.config.copy()
    app.config["CSV_TO_HIVE_UPLOAD_DIRECTORY_FUNC"]: lambda *args: ""  # noqa: F722
    mock_upload_to_s3.return_value = "mock-location"
    mock_g.user = True
    mock_database = mock.MagicMock()
    mock_database.get_df.return_value.empty = False
    mock_execute = mock.MagicMock(return_value=True)
    mock_database.get_sqla_engine.return_value.__enter__.return_value.execute = (
        mock_execute
    )
    table_name = "foobar"
    schema = "schema"

    with app.app_context():
        HiveEngineSpec.df_to_sql(
            mock_database,
            Table(table=table_name, schema=schema),
            pd.DataFrame(),
            {"if_exists": "replace", "header": 1, "na_values": "mock", "sep": "mock"},
        )

    mock_execute.assert_any_call(f"DROP TABLE IF EXISTS {schema}.{table_name}")
    app.config = config


@pytest.mark.parametrize(
    "schema,upload_prefix",
    [("foo", "EXTERNAL_HIVE_TABLES/1/foo/"), (None, "EXTERNAL_HIVE_TABLES/1/")],
)
def test_s3_upload_prefix(schema: str, upload_prefix: str) -> None:
    mock_database = mock.MagicMock()
    mock_database.id = 1

    assert (
        app.config["CSV_TO_HIVE_UPLOAD_DIRECTORY_FUNC"](
            database=mock_database, user=mock.MagicMock(), schema=schema
        )
        == upload_prefix
    )


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("boto3"), "boto3 not installed"
)
def test_upload_to_s3_no_bucket_path():
    with app.app_context():
        with pytest.raises(
            Exception,
            match="No upload bucket specified. You can specify one in the config file.",
        ):
            upload_to_s3("filename", "prefix", Table("table"))


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("boto3"), "boto3 not installed"
)
@mock.patch("boto3.client")
def test_upload_to_s3_client_error(client):
    config = app.config.copy()
    app.config["CSV_TO_HIVE_UPLOAD_S3_BUCKET"] = "bucket"
    from botocore.exceptions import ClientError

    client.return_value.upload_file.side_effect = ClientError(
        {"Error": {}}, "operation_name"
    )

    with app.app_context():
        with pytest.raises(ClientError):
            upload_to_s3("filename", "prefix", Table("table"))

    app.config = config


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("boto3"), "boto3 not installed"
)
@mock.patch("boto3.client")
def test_upload_to_s3_success(client):
    config = app.config.copy()
    app.config["CSV_TO_HIVE_UPLOAD_S3_BUCKET"] = "bucket"
    client.return_value.upload_file.return_value = True

    with app.app_context():
        location = upload_to_s3("filename", "prefix", Table("table"))
        assert "s3a://bucket/prefix/table" == location  # noqa: F541

    app.config = config


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("thrift"), "thrift not installed"
)
def test_fetch_data_query_error():
    from TCLIService import ttypes

    err_msg = "error message"
    cursor = mock.Mock()
    cursor.poll.return_value.operationState = ttypes.TOperationState.ERROR_STATE
    cursor.poll.return_value.errorMessage = err_msg
    with pytest.raises(Exception, match=f"('Query error', '{err_msg})'"):
        HiveEngineSpec.fetch_data(cursor)


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("thrift"), "thrift not installed"
)
@mock.patch("superset.db_engine_specs.base.BaseEngineSpec.fetch_data")
def test_fetch_data_programming_error(fetch_data_mock):
    from pyhive.exc import ProgrammingError

    fetch_data_mock.side_effect = ProgrammingError
    cursor = mock.Mock()
    assert HiveEngineSpec.fetch_data(cursor) == []


@unittest.skipUnless(
    SupersetTestCase.is_module_installed("thrift"), "thrift not installed"
)
@mock.patch("superset.db_engine_specs.base.BaseEngineSpec.fetch_data")
def test_fetch_data_success(fetch_data_mock):
    return_value = ["a", "b"]
    fetch_data_mock.return_value = return_value
    cursor = mock.Mock()
    assert HiveEngineSpec.fetch_data(cursor) == return_value


@mock.patch("superset.db_engine_specs.hive.HiveEngineSpec._latest_partition_from_df")
def test_where_latest_partition(mock_method):
    mock_method.return_value = ("01-01-19", 1)
    database = mock.Mock()
    database.get_indexes = mock.Mock(return_value=[{"column_names": ["ds", "hour"]}])
    database.get_extra = mock.Mock(return_value={})
    database.get_df = mock.Mock()
    columns = [{"name": "ds"}, {"name": "hour"}]
    with app.app_context():
        result = HiveEngineSpec.where_latest_partition(
            database,
            Table("test_table", "test_schema"),
            select(),
            columns,
        )
    query_result = str(result.compile(compile_kwargs={"literal_binds": True}))
    assert "SELECT  \nWHERE ds = '01-01-19' AND hour = 1" == query_result


@mock.patch("superset.db_engine_specs.presto.PrestoEngineSpec.latest_partition")
def test_where_latest_partition_super_method_exception(mock_method):
    mock_method.side_effect = Exception()
    database = mock.Mock()
    columns = [{"name": "ds"}, {"name": "hour"}]
    with app.app_context():
        result = HiveEngineSpec.where_latest_partition(
            database,
            Table("test_table", "test_schema"),
            select(),
            columns,
        )
    assert result is None
    mock_method.assert_called()


@mock.patch("superset.db_engine_specs.presto.PrestoEngineSpec.latest_partition")
def test_where_latest_partition_no_columns_no_values(mock_method):
    mock_method.return_value = ("01-01-19", None)
    db = mock.Mock()
    with app.app_context():
        result = HiveEngineSpec.where_latest_partition(
            db,
            Table("test_table", "test_schema"),
            select(),
        )
    assert result is None


def test__latest_partition_from_df():
    def is_correct_result(data: list, result: list) -> bool:
        df = pd.DataFrame({"partition": data})
        return HiveEngineSpec._latest_partition_from_df(df) == result

    assert is_correct_result(["ds=01-01-19"], ["01-01-19"])
    assert is_correct_result(
        ["ds=01-01-19", "ds=01-03-19", "ds=01-02-19"], ["01-03-19"]
    )
    assert is_correct_result(["ds=01-01-19/hour=1"], ["01-01-19", "1"])
    assert is_correct_result(
        ["ds=01-01-19/hour=1", "ds=01-03-19/hour=1", "ds=01-02-19/hour=1"],
        ["01-03-19", "1"],
    )
    assert is_correct_result(
        ["ds=01-01-19/hour=1", "ds=01-03-19/hour=1", "ds=01-02-19/hour=2"],
        ["01-03-19", "1"],
    )


def test_get_view_names_with_schema():
    database = mock.MagicMock()
    mock_execute = mock.MagicMock()
    database.get_raw_connection().__enter__().cursor().execute = mock_execute
    database.get_raw_connection().__enter__().cursor().fetchall = mock.MagicMock(
        return_value=[["a", "b,", "c"], ["d", "e"]]
    )

    schema = "schema"
    result = HiveEngineSpec.get_view_names(database, mock.Mock(), schema)
    mock_execute.assert_called_once_with(f"SHOW VIEWS IN `{schema}`")
    assert result == {"a", "d"}


def test_get_view_names_without_schema():
    database = mock.MagicMock()
    mock_execute = mock.MagicMock()
    database.get_raw_connection().__enter__().cursor().execute = mock_execute
    database.get_raw_connection().__enter__().cursor().fetchall = mock.MagicMock(
        return_value=[["a", "b,", "c"], ["d", "e"]]
    )
    result = HiveEngineSpec.get_view_names(database, mock.Mock(), None)
    mock_execute.assert_called_once_with("SHOW VIEWS")
    assert result == {"a", "d"}


@mock.patch("superset.db_engine_specs.base.BaseEngineSpec.get_table_names")
@mock.patch("superset.db_engine_specs.hive.HiveEngineSpec.get_view_names")
def test_get_table_names(
    mock_get_view_names,
    mock_get_table_names,
):
    mock_get_view_names.return_value = {"view1", "view2"}
    mock_get_table_names.return_value = {"table1", "table2", "view1", "view2"}
    tables = HiveEngineSpec.get_table_names(mock.Mock(), mock.Mock(), None)
    assert tables == {"table1", "table2"}
