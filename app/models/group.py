from .db import db
from .group_student import group_student


class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    active = db.Column(db.Boolean, default=True)

    members = db.relationship(
        'Student', secondary=group_student, back_populates="group")
