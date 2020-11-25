from .db import db


class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    student_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    instructor_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"))
    resolved = db.Column(db.Boolean, default=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

    student = db.relationship(
        "Student",
        foreign_keys=[student_id],
        back_populates="questions"
    )
    classroom = db.relationship(
        "Classroom",
        back_populates="questions"
    )
    answers = db.relationship(
        "Answer",
        back_populates="question"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "student_id": self.student_id,
            "class_id": self.class_id,
            "resolved": self.resolved,
            "student": self.student,
            "classroom": self.classroom,
            "answers": self.answers
        }
