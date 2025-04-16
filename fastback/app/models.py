from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
import datetime

class UploadedTable(Base):
    __tablename__ = "uploaded_data"
    id = Column(Integer, primary_key=True, index=True)
    table_name = Column(String(255), unique=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class QueryLog(Base):
    __tablename__ = "query_log"
    id = Column(Integer, primary_key=True, index=True)
    query_text = Column(String(1000))
    sql_generated = Column(String(1000))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)