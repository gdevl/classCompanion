from .db import db
from sqlalchemy import Column, String, Integer, Text, Boolean
from .class_user import class_user

class Classroom(db.Model):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    class_image_url = Column(Text, nullable=True)
    description = Column(Text, nullable=False)
    daily_objective = Column(Text, nullable=True)
    meeting_link = Column(String(255), nullable=True)
    meeting_pw = Column(String(255), nullable=True)
    active = Column(Boolean, default=True)

    member = relationship('User', secondary=class_user, back_populates='classroom')
