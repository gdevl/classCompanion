from .db import db


class Question(db.Model):
    __tablename__ = "questions"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"))
    instructor_id = db.Column(db.Integer, db.ForeignKey("instructors.id"))
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"))
    resolved = db.Column(db.Boolean, default=False)

    student = db.relationship(
        "Student",
        foreign_keys=[student_id],
        back_populates="questions"
    )
    instructor = db.relationship(
        "User",
        foreign_keys=[instructor_id],
        back_populates="answers"
    )
    classroom = db.relationship(
        "Classroom",
        back_populates="question"
    )
    answer = db.relationship(
        "Answer",
        back_populates="question"
    )
