from .db import db


class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.id"))
    instructor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    active = db.Column(db.Boolean, default=True)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

    question = db.relationship("Question", back_populates="answers")
    instructor = db.relationship("Instructor", back_populates="answers")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "question_id": self.question_id,
            "instructor_id": self.instructor_id,
            "active": self.active
        }
