from .db import db
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class Answer(db.Model):
    __tablename__ = 'answers'

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    question_id = Column(Integer, ForeignKey("questions.id"))
    instructor_id = Column(Integer, ForeignKey("users.id"))
    active = Column(Boolean, default=True)

    question = relationship("Question", back_populates="answer")
    instructor = relationship("User", back_populates="answer")