from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user

from ..models import db
from app.models import User, Classroom, Question

student_routes = Blueprint('students', __name__)

@student_routes.route('/')
def get_students():
    students = User.query.filter(User.role.ilike("student%")).all()
    # return {"students": [student.less_to_dict() for student in students]}
    return jsonify([student.less_to_dict() for student in students])