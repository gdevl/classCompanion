from .db import db

"""
Defines the join table between users and classes
"""


class_user = db.Table(
    'class_user',
    db.Column('class_id', db.Integer, db.ForeignKey('classes.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)


