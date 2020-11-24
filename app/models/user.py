from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from .classroom_user import classroom_user
# from .group_student import group_student


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    avatar_url = db.Column(db.Text, nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {
        'polymorphic_on': role,
        'polymorphic_identity': 'user'
    }

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


class Instructor(User):
    __tablename__ = 'instructors'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    __mapper_args__ = {
        'polymorphic_identity': 'instructor'
    }


class Student(User):
    __tablename__ = 'students'
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    # check_in = db.relationship('CheckIn', back_populates='student')
    # classroom = db.relationship(
    #     'Classroom',
    #     secondary=classroom_user,
    #     back_populates='members'
    # )
    # questions = db.relationship(
    #     'Question',
    #     foreign_keys='Question.student_id',
    #     back_populates="student"
    # )
    # group = db.relationship(
    #     'Group',
    #     secondary=group_student,
    #     back_populates="members"
    # )
    __mapper_args__ = {
        'polymorphic_identity': 'student'
    }
