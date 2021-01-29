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

    # define some instance methods for getting the stuff we want

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
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "avatar_url": self.avatar_url,
            "role": self.role,
        }

    def less_to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }

    def truncated(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": f'{self.first_name} {self.last_name}',
        }

    def less_to_dict_checkins(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": f'{self.first_name} {self.last_name}',
            "checkins": [check_in.to_dict() for check_in in self.check_ins],
            "questions": [question.to_dict() for question in self.questions],
        }
    
    def get_name(self):
        return {
            "id": self.id,
            "name": f'{self.first_name} {self.last_name}',
        }

    def get_fullname(self):
        return f'{self.first_name} {self.last_name}'

    def get_transfer_list(self):
        return {
            "id": self.id,
            "name": f'{self.first_name} {self.last_name}',
            "avatar_url": self.avatar_url,
        }
    
    def removed(self):
        return {
            "id": self.id,
            "name": f'{self.first_name} {self.last_name}',
            "operation": "removed",
        }

    def added(self):
        return {
            "id": self.id,
            "name": f'{self.first_name} {self.last_name}',
            "operation": "added",
        }

    def get_user_classrooms(self):
        return {
            "classrooms": [
                classroom.to_dict() for classroom in self.classrooms],
        }

    def get_user_questions(self):
        return {
            "questions": [question.to_dict() for question in self.questions]
        }


class Instructor(User):
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
