from .db import db


class Role(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='role')
    

