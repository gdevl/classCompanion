from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom, Group, Question, Answer
import math, random

class_routes = Blueprint('classes', __name__)


@class_routes.route('/<int:id>/delete', methods=['GET', 'PATCH'])
def delete_class(id):
    if request.method == 'PATCH':
        selected_class = Classroom.query.get(id)
        #  print(selected_class.active)
        selected_class.active = False
        db.session.add(selected_class)
        db.session.commit()
        return jsonify('success')


@class_routes.route('/<int:id>/update', methods=['GET', 'PUT'])
def update_class(id):
    if request.method == 'PUT':
        selected_class = Classroom.query.get(id)
        req_data = request.get_json()
        selected_class.description = req_data['description']
        selected_class.daily_objective = req_data['message']
        selected_class.meeting_link = req_data['link']
        selected_class.meeting_pw = req_data['password']
        db.session.add(selected_class)
        db.session.commit()
        return selected_class.to_dict()
    return jsonify({"Error"})

@class_routes.route('/<int:id>/group/<int:size>', methods=['GET', 'POST', 'PUT'])
def group_class(id, size):
    if request.method == 'POST':
        selected_class = Classroom.query.get(id)
        students = selected_class.students.copy()
        random.shuffle(students)
        numGroups = math.ceil(len(students) / size)
        print('student length: ', len(students))
        print('size: ', size)
        print('numGroups: ', numGroups)
        for i in range(numGroups):
            members = []
            for j in range(size):
                if len(students) > 0:
                    member = students.pop()
                    members.append(member)
            group = Group(
                class_id=id,
                members=members,
            )
            db.session.add(group)
            db.session.commit()
        return jsonify("Test")

    if request.method == 'PUT':
        selected_class = Classroom.query.get(id)
        for group in selected_class.groups:
            if group.active:
                group.active = False
                db.session.add(group)
                db.session.commit()
        return jsonify("TEST")


@class_routes.route('/<int:class_id>/question/<int:question_id>/answer', methods=['GET', 'POST'])
def answer_question(class_id, question_id):
    if request.method == 'POST':
        req_data = request.get_json()
        selected_question = Question.query.get(question_id)
        answer = Answer(
            content=req_data['answer'],
            instructor_id=req_data['instructor_id'],
            question_id=question_id,
        )
        db.session.add(answer)
        selected_question.resolved = True
        db.session.add(selected_question)
        db.session.commit()
        return jsonify("QUESITON ANSWER TEST")


@class_routes.route('/<int:class_id>/question/<int:question_id>/dismiss', methods=['GET', 'POST'])
def dismiss_question(class_id, question_id):
    if request.method == 'POST':
        req_data = request.get_json()
        selected_question = Question.query.get(question_id)
        answer = Answer(
            content=req_data['answer'],
            instructor_id=req_data['instructor_id'],
            question_id=question_id,
            active=False
        )
        db.session.add(answer)
        selected_question.resolved = True
        db.session.add(selected_question)
        db.session.commit()
        return jsonify("QUESITON DISMISS TEST")
