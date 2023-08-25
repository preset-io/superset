import time
import uuid

from flask_appbuilder import Model
from sqlalchemy import Column, ForeignKey, Integer, String


# This table should live in manager. It will get the workspace name from shell
class CordAuthToken(Model):
    __tablename__ = "cord_auth_token"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("ab_user.id"), nullable=False)
    workspace_name = Column(String(255), nullable=False)
    auth_token = Column(String(255), nullable=False)
    user_uuid = Column(String(255), nullable=False, default=uuid.uuid4)
    expires_at = Column(Integer, nullable=False)

    def __init__(self, user_id, workspace_name, auth_token, expires_at, user_uuid):
        self.user_id = user_id
        self.workspace_name = workspace_name
        self.user_uuid = user_uuid
        self.auth_token = auth_token
        self.expires_at = expires_at

    def __repr__(self):
        return f"<CordAuthToken {self.id}>"

    def is_expired(self):
        return self.expires_at < int(time.time())
