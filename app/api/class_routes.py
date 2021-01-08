from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom, Group, Question, Answer, CheckIn
import math
import random

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

@class_routes.route('/<int:id>/update-enrollment', methods=['GET', 'PATCH'])
def update_enrollment(id):
    if request.method == 'PATCH':
        classroom = Classroom.query.get(id)
        classroom.students.clear()
        req_data = request.get_json()
        # print('REQUEST DATA:')
        # print(req_data)
        for user_id in req_data:
            int(user_id)
        enrolled_users = User.query.filter(User.id.in_(req_data))
        for user in enrolled_users:
            student = user.to_dict()
            # print('STUDENT')
            # print(student)
            # print('USER')
            # print(user)
            classroom.students.append(user)
        db.session.add(classroom)
        db.session.commit()
        return jsonify('success')
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
        for group in selected_class.groups:
            if group.active:
                group.active = False
                db.session.add(group)
                db.session.commit()
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



@class_routes.route('/<int:id>/groups')
def get_class_groups(id):
    class_groups = Group.query.filter(Group.class_id == id, Group.active == True).all()
    return {"groups": [class_group.to_dict() for class_group in class_groups]}



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
        return jsonify("Answer submitted.")


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
        return jsonify("Question dismissed.")


# post question
@class_routes.route("/<int:class_id>/user/<int:user_id>/question", methods=["POST"])
# @login_required
def postQuestion(class_id, user_id):
    req_data = request.get_json()
    question = Question(
        content=req_data['question'],
        image_url=None,
        student_id=user_id,
        instructor_id=None,
        class_id=class_id
    )

    db.session.add(question)
    db.session.commit()

    # emit question
    return question.to_dict()



@class_routes.route('/<int:class_id>/user/<int:student_id>/checkin',
                    methods=['GET', 'POST'])
def check_in(class_id, student_id):
    checkin = CheckIn(
        student_id=student_id,
        class_id=class_id,
    )
    db.session.add(checkin)
    db.session.commit()
    return jsonify("CHECKINTEST")


@class_routes.route('/answer/<int:answer_id>/accept',
                    methods=['GET', 'POST'])
def accept_answer(answer_id):
    answer = Answer.query.get(answer_id)
    answer.active = False
    db.session.add(answer)
    db.session.commit()
    return jsonify("ACCEPT ANSWER")
