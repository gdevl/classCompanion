from .db import db
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship


class Question(db.Model):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    image_url = Column(Text, nullable=True)
    student_id = Column(Integer, ForeignKey("users.id"))
    instructor_id = Column(Integer, ForeignKey("users.id"))
    class_id = Column(Integer, ForeignKey("classes.id"))
    resolved = Column(Boolean, default=False)

    student = relationship("User", back_populates='question')
    instructor = relationship("User", back_populates='question')
    classroom = relationship("Classroom", back_populates="question")
