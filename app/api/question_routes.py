from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import db
from app.models import User, Classroom, Question

question_routes = Blueprint('questions', __name__)

@question_routes.route('/<int:class_id>')
def get_unresolved_questions(class_id):
    questions = Question.query.filter(
        Question.class_id == class_id,
        Question.resolved == False
    ).all()
    return {"questions": [question.to_dict() for question in questions]}

@question_routes.route('/<int:class_id>/archive')
def get_resolved_questions(class_id):
    questions = Question.query.filter(
        Question.class_id == class_id,
        Question.resolved == True
    ).all()
    return {"questions": [question.to_dict() for question in questions]}
