from .db import db


class CheckIn(db.Model):
    __tablename__ = 'check_ins'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))

    student = db.relationship('Student', back_populates='check_in')
    classroom = db.relationship('Classroom', back_populates='check_in')
