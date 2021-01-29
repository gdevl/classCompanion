from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user

from ..models import db
from app.models import User, Student, Classroom, Question

student_routes = Blueprint('students', __name__)


@student_routes.route('/')
def get_students():
    students = User.query.filter(User.role == 'student').all()
    # return {"students": [student.less_to_dict() for student in students]}
    return jsonify([student.to_dict() for student in students])


@student_routes.route('/<int:student_id>/questions')
def get_student_question(student_id):
    student = Student.query.get(student_id)
    unresolved = [
        question.to_dict()
        for question in student.questions
        if not question.resolved
    ]

    return jsonify(unresolved)
