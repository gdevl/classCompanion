from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom

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
