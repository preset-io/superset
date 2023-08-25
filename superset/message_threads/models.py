import uuid

from flask_appbuilder import Model
from sqlalchemy import Column, ForeignKey, Integer, String


# this will be stored in manager
class MessageThread(Model):
    __tablename__ = "message_threads"
    id = Column(Integer, primary_key=True)
    dashboard_id = Column(Integer, ForeignKey("dashboards.id"), nullable=True)
    chart_id = Column(Integer, ForeignKey("slices.id"), nullable=True)
    uuid = Column(String(36), unique=True, nullable=False, default=uuid.uuid4)
    workspace_name = Column(String(255), nullable=False)

    def __init__(self, workspace_name, dashboard_id=None, chart_id=None):
        self.workspace_name = workspace_name
        self.dashboard_id = dashboard_id
        self.chart_id = chart_id

    def __repr__(self):
        return f"<MessageThread {self.id}>"
