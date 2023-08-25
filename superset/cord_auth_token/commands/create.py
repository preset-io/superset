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
from datetime import datetime, timedelta, timezone
from typing import Union

import jwt
from flask import g

from superset.commands.base import BaseCommand, CreateMixin
from superset.daos.exceptions import DAOCreateFailedError

logger = logging.getLogger(__name__)

CORD_ENDPOINT = "https://api.cord.com/v1/"

from enum import Enum


class status(Enum):
    ACTIVE = "active"
    DELETED = "deleted"


class platformUserVariables:
    def __init__(
        self,
        email: str,
        name: str = None,
        status: status = None,
        profile_picture_url: str = None,
        first_name: str = None,
        last_name: str = None,
    ):
        self.email = email
        self.name = name
        self.status = status
        self.profile_picture_url = profile_picture_url
        self.first_name = first_name
        self.last_name = last_name


class platformOrganizationVariables:
    def __init__(self, name: str, status: status = None, members: list[str] = None):
        self.name = name
        self.status = status
        self.members = members


class clientPlatformUserVariables:
    def __init__(
        self,
        id: str,
        email: str,
        name: str = None,
        status: status = None,
        profile_picture_url: str = None,
        first_name: str = None,
        last_name: str = None,
    ):
        self.id = id
        self.email = email
        self.name = name
        self.status = status
        self.profile_picture_url = profile_picture_url
        self.first_name = first_name
        self.last_name = last_name


class clientPlatformOrganizationVariables:
    def __init__(
        self, id: str, name: str, status: status = None, members: list[str] = None
    ):
        self.id = id
        self.name = name
        self.status = status
        self.members = members


def toJson(obj):
    return json.dumps(
        obj,
        default=lambda o: {key: value for key, value in o.__dict__.items() if value},
        indent=4,
        allow_nan=False,
    )


# payload: {
#   # The user ID can be any identifier that makes sense to your application.
#   # As long as it's unique per-user, Cord can use it to represent your user.
#   user_id: 'severusatreides',

#   # Same as above. An organization ID can be any unique string. Organizations
#   # are groups of users.
#   organization_id: 'starpotterdunewars',

#   # By supplying the  `user_details` object, you can create the user in
#   # Cord's backend on-the-fly. No need to pre-sync your users.
#   user_details: {
#     email: 'sevvy@arrakis.spice',
#     name: 'Severus Atreides',
#   },


#   # By supplying the `organization_details` object, just like the user,
#   # Cord will create the organization on-the-fly.
#   organization_details: {
#     name: "starpotterdunewars",
#   },
# }
def get_client_auth_token(
    app_id: str, secret: str, payload: dict[str, Union[str, dict]]
) -> str:
    return jwt.encode(
        payload={
            "app_id": app_id,
            "exp": datetime.now(tz=timezone.utc) + timedelta(minutes=1),
            "iat": datetime.now(tz=timezone.utc),
            **payload,
        },
        key=secret,
        algorithm="HS512",
    )


class CreateCordAuthTokenCommand(BaseCommand):
    def run(self) -> Union[str, None]:
        # self.validate()
        try:
            # this is a singleton command. It will return
            # the existing auth_token if it exists
            return get_client_auth_token(
                app_id="<todo>",
                secret="<todo>",
                payload={
                    "user_id": g.user.email,
                    "organization_id": "superset",
                },
            )
        except DAOCreateFailedError as ex:
            logger.exception(ex.exception)
            # raise TagCreateFailedError() from ex

    def validate(self) -> None:
        return super().validate()
