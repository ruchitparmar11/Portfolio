from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(Text)
    tech_stack = Column(String(255))
    image_url = Column(String(255))
    link = Column(String(255))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    proficiency = Column(Integer) # 1-100
    category = Column(String(100)) # e.g., Frontend, Backend

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))
    message = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
