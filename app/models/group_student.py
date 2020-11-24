from .db import db

"""
Defines the join table between groups and users
"""


group_student = db.Table(
    'group_students',
    db.Column('group_id', db.Integer, db.ForeignKey('groups.id')),
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'))
)
