from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom, Group, Question, CheckIn, Student
import math
import random

class_routes = Blueprint('classes', __name__)


@class_routes.route('/<int:class_id>')
def get_class_data(class_id):
    class_data = Classroom.query.get(class_id)
    return class_data.to_dict()


@class_routes.route('/<int:class_id>/delete', methods=['GET', 'PATCH'])
def delete_class(class_id):
    if request.method == 'PATCH':
        selected_class = Classroom.query.get(class_id)
        selected_class.active = False
        db.session.add(selected_class)
        db.session.commit()
        return jsonify(selected_class.id)


@class_routes.route('/<int:id>/students')
def get_students(id):
    all_students = User.query.filter(User.role.ilike("student%"))
    students_arr = []
    for student in all_students:
        student_dict = student.to_dict()
        # print(student_dict['first_name'])
        first_name = student_dict['first_name']
        last_name = student_dict['last_name']
        student_id = student_dict['id']
        students_arr.append({
            'id': student_id,
            'first_name': first_name,
            'last_name': last_name
        })
    print(students_arr)
    # print(all_students)
    return jsonify(students_arr)
    # return jsonify(classroom.students)


@class_routes.route('/<int:id>/update-enrollment', methods=['GET', 'PATCH'])
def update_enrollment(id):
    if request.method == 'PATCH':
        classroom = Classroom.query.get(id)
        classroom.students.clear()
        req_data = request.get_json()
        for user_id in req_data:
            int(user_id)
        enrolled_users = User.query.filter(User.id.in_(req_data))
        for user in enrolled_users:
            student = user.to_dict()
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


@class_routes.route('/<int:class_id>/bulk_enroll', methods=['PATCH'])
def bulk_enroll(class_id):
    data = request.get_json()
    to_add = data["add"]
    to_remove = data["remove"]

    # get classroom by id
    classroom = Classroom.query.get(class_id)

    # get all students in the database
    all_students = User.query.filter(User.role == 'student').all()

    # create list of students to add (if any)
    students_to_add = [
        student for student in all_students if student.id in to_add
    ]

    # add new students to classroom (if any)
    classroom.students.extend(students_to_add)

    # remove students from classroom (if any)
    classroom.students = [
        student for student in classroom.students
        if student.id not in to_remove
    ]

    db.session.commit()

    return jsonify('Operation complete.')


# add student to classroom
@class_routes.route('/<int:class_id>/enroll', methods=['PATCH'])
def enroll(class_id):
    data = request.get_json()
    user_id = data["userId"]
    classroom_id = data["classroomId"]

    classroom = Classroom.query.get(classroom_id)
    student_to_add = User.query.get(user_id)

    classroom.students.append(student_to_add)

    new_student = student_to_add.get_transfer_list()
    db.session.commit()

    return jsonify(new_student)


# remove student from classroom
@class_routes.route('/<int:class_id>/unenroll', methods=['PATCH'])
def unenroll(class_id):
    # destructure request data
    data = request.get_json()
    user_id = data["userId"]
    classroom_id = data["classroomId"]

    # query classroom
    classroom = Classroom.query.get(classroom_id)
    # query student
    student_to_remove = User.query.get(user_id)

    # remove student from classroom
    classroom.students.remove(student_to_remove)

    # prepare student dict to return
    removed_student = student_to_remove.get_transfer_list()
    db.session.commit()

    return jsonify(removed_student)


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


@class_routes.route('/<int:class_id>/description', methods=['PATCH'])
def update_description(class_id):
    classroom = Classroom.query.get(class_id)
    description_data = request.get_json()
    new_description = description_data['description']

    classroom.description = new_description

    db.session.commit()

    return {
        "description": new_description,
        "success": "yes!"
    }


@class_routes.route('/<int:class_id>/daily_objective', methods=['PATCH'])
def update_daily_objective(class_id):
    classroom = Classroom.query.get(class_id)
    daily_objective_data = request.get_json()
    daily_objective = daily_objective_data['daily_objective']

    classroom.daily_objective = daily_objective

    db.session.commit()

    return {
        "daily_objective": daily_objective,
        "success": "yes!"
    }


@class_routes.route('/<int:class_id>/meeting_link', methods=['PATCH'])
def update_meeting_link(class_id):
    classroom = Classroom.query.get(class_id)
    meeting_link_data = request.get_json()
    meeting_link = meeting_link_data['meeting_link']

    classroom.meeting_link = meeting_link

    db.session.commit()

    return {
        "meeting_link": meeting_link,
        "success": "yes!"
    }


@class_routes.route('/<int:class_id>/meeting_pw', methods=['PATCH'])
def update_meeting_pw(class_id):
    classroom = Classroom.query.get(class_id)
    meeting_pw_data = request.get_json()
    meeting_pw = meeting_pw_data['meeting_pw']

    classroom.meeting_pw = meeting_pw

    db.session.commit()

    return {
        "meeting_pw": meeting_pw,
        "success": "yes!"
    }


@class_routes.route('/<int:class_id>/ungroup', methods=['PATCH'])
def ungroup(class_id):
    selected_class = Classroom.query.get(class_id)
    for group in selected_class.groups:
        if group.active:
            group.active = False
    db.session.commit()
    return jsonify(selected_class.get_active_groups())


@class_routes.route('/<int:class_id>/groups/<int:size>', methods=['POST'])
def make_groups(class_id, size):
    selected_class = Classroom.query.get(class_id)
    for group in selected_class.groups:
        if group.active:
            group.active = False
            db.session.add(group)
            db.session.commit()
    students = selected_class.students.copy()
    random.shuffle(students)
    numGroups = math.ceil(len(students) / size)

    for i in range(numGroups):
        members = []
        for j in range(size):
            if len(students) > 0:
                member = students.pop()
                members.append(member)
        group = Group(
            class_id=class_id,
            members=members,
        )
        db.session.add(group)
        db.session.commit()
    return jsonify(selected_class.get_active_groups())


# Fetch enrolled students by class_id
@class_routes.route('/<int:class_id>/enrolled')
def get_enrolled(class_id):
    classroom = Classroom.query.get(class_id)
    students = classroom.students
    return jsonify([student.get_transfer_list() for student in students])


# Fetch unenrolled students by class_id
@class_routes.route('/<int:class_id>/unenrolled')
def get_unenrolled(class_id):
    students = User.query.filter(User.role == 'student').all()
    return jsonify([
            student.get_transfer_list() for student in students
            if class_id not in
            [classroom.id for classroom in student.classrooms]
        ]
    )


@class_routes.route('/<int:class_id>/roster')
def get_enrollment(class_id):
    students = User.query.filter(User.role == 'student').all()
    classroom = Classroom.query.get(class_id)

    enrolled = [student.id for student in classroom.students]
    all = [student.get_transfer_list() for student in students]

    roster = {
        "all": all,
        "enrolled": enrolled,
    }

    return roster


# Fetch groups by class_id
@class_routes.route('/<int:class_id>/groups')
def get_groups(class_id):
    class_groups = Group.query.filter(
        Group.class_id == class_id, Group.active).all()
    return jsonify([class_group.get_members() for class_group in class_groups])


# Answer Question
@class_routes.route(
    '/<int:class_id>/question/<int:question_id>/answer',
    methods=['PATCH'])
def answer_question(class_id, question_id):
    selected_question = Question.query.get(question_id)
    req_data = request.get_json()
    answer = req_data['answer']
    selected_question.answer = answer

    db.session.commit()
    return jsonify("Answer submitted.")


# Dismiss Question
@class_routes.route(
    '/<int:class_id>/question/<int:question_id>/dismiss',
    methods=['PATCH'])
def dismiss_question(class_id, question_id):
    selected_question = Question.query.get(question_id)
    selected_question.resolved = True
    db.session.commit()
    return jsonify("Question dismissed.")


# Accept Answer
@class_routes.route(
    '/<int:class_id>/question/<int:question_id>/accept',
    methods=['PATCH'])
def accept_answer(class_id, question_id):
    selected_question = Question.query.get(question_id)
    selected_question.resolved = True
    db.session.commit()
    return jsonify("Answer accepted.")


# Post Question
@class_routes.route(
    "/<int:class_id>/user/<int:user_id>/question",
    methods=["POST"])
# @login_required
def postQuestion(class_id, user_id):
    req_data = request.get_json()
    question = Question(
        content=req_data['question'],
        student_id=user_id,
        class_id=class_id
    )

    db.session.add(question)
    db.session.commit()

    # emit question
    return question.to_dict()


# Post CheckIn
@class_routes.route(
    '/<int:class_id>/user/<int:student_id>/checkin',
    methods=['POST'])
def check_in(class_id, student_id):
    checkin = CheckIn(
        student_id=student_id,
        class_id=class_id,
    )
    db.session.add(checkin)
    db.session.commit()

    return checkin.to_dict()


# fetch unresolved questions by user and classroom
@class_routes.route('/<int:c_id>/student/<int:s_id>/question')
def get_student_question(c_id, s_id):
    classroom = Classroom.query.get(c_id)
    student = Student.query.get(s_id)

    question = Question.query.filter(
        Question.resolved == False,
        Question.student_id == student.id,
        Question.class_id == classroom.id
    ).first()

    if question:
        return question.to_dict()
    else:
        return {}


@class_routes.route('/<int:class_id>/questions')
def get_unresolved_questions(class_id):
    classroom = Classroom.query.get(class_id)
    unresolved = [
        question.to_dict()
        for question in classroom.questions
        if not question.resolved
    ]
    return jsonify(unresolved)


# Fetch archived questions by class_id

@class_routes.route('/<int:id>/questions/archive')
def get_resolved_questions(id):
    archived_questions = Question.query.filter(
        Question.class_id == id,
        Question.resolved
    ).all()
    return {
        [
            archived_question.to_dict()
            for archived_question
            in archived_questions
        ]
    }
