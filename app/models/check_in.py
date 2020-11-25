from .db import db


class CheckIn(db.Model):
    __tablename__ = 'check_ins'

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

    student = db.relationship('Student', back_populates='check_ins')
    classroom = db.relationship('Classroom', back_populates='check_ins')

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "class_id": self.class_id,
            "created_on": self.created_on
        }
