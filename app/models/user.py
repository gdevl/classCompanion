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
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
    )

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
    answers = db.relationship('Answer', back_populates='instructor')
    classrooms = db.relationship(
        'Classroom',
        secondary=classroom_user,
        back_populates='instructors'
    )
    __mapper_args__ = {
        'polymorphic_identity': 'instructor'
    }


class Student(User):
    check_ins = db.relationship('CheckIn', back_populates='student')
    classrooms = db.relationship(
        'Classroom',
        secondary=classroom_user,
        back_populates='students'
    )
    questions = db.relationship(
        'Question',
        foreign_keys='Question.student_id',
        back_populates="student"
    )
    groups = db.relationship(
        'Group',
        secondary=group_student,
        back_populates="members"
    )
    __mapper_args__ = {
        'polymorphic_identity': 'student'
    }
