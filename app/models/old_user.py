from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .classroom_user import classroom_user
from .group_student import group_student


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar_url = db.Column(db.Text, nullable=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    role = db.relationship(
        'Role',
        back_populates='user'
    )
    classroom = db.relationship(
        'Classroom',
        secondary=classroom_user,
        back_populates='member'
    )
    questions = db.relationship(
        'Question',
        foreign_keys='Question.student_id',
        back_populates="student"
    )
    answers = db.relationship('Q', back_populates="instructor")
    group = db.relationship(
        'Group',
        secondary=group_student,
        back_populates="member"
    )
    check_in = db.relationship('Checkin', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }
