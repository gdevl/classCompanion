from .db import db

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"))
    instructor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    active = db.Column(db.Boolean, default=True)

    question = db.relationship("Question", back_populates="answer")
    instructor = db.relationship("User", back_populates="answer")