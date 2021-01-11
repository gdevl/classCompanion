from .db import db
from .group_student import group_student


class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('classes.id'))
    active = db.Column(db.Boolean, default=True)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

    members = db.relationship(
        'Student', secondary=group_student, back_populates="groups")

    classroom = db.relationship(
        "Classroom",
        back_populates="groups"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "active": self.active,
            "members": [member.to_dict() for member in self.members],
        }
    
    def less_to_dict(self):
        return {
            "id": self.id,
            "class_id": self.class_id,
            "active": self.active,
            "members": [member.id for member in self.members]
        }