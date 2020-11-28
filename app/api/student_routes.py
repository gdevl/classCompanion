from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Student

student_routes = Blueprint('students', __name__)
