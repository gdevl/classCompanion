from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


class_table = {
    'instructor': {
        'class1': {
            'className': 'Math',
            'ClassSize': '20',
            'ClassTime': '10:00 - 11:30'
        },
        'class2': {
            'className': 'Math',
            'ClassSize': '25',
            'ClassTime': '11:30 - 1:00'
        },
        'class3': {
            'className': 'Math',
            'ClassSize': '22',
            'ClassTime': '1:00- 2:30'
        },
    },
    'student': {
        'class1': {
            'className': 'Chemistry',
            'ClassSize': '20',
            'ClassTime': '10:00 - 11:30'
        }
    }
}


@user_routes.route("/<int:id>/classes")
def get_classes(id):
    keys = []
    if id == 1:
        for key in class_table:
            if key == 'instructor':
                instructor = class_table[key]
                for subKey in instructor:
                    keys.append(instructor[subKey])
        return jsonify(keys)
    else:
        for key in class_table:
            if key == 'student':
                instructor = class_table[key]
                for subKey in instructor:
                    keys.append(instructor[subKey])
        return jsonify(keys)

    #  return jsonify('hello')


@user_routes.route('/<int:id>/classrooms')
def classes(id):
    user = User.query.get(id)
    classrooms = user.get_user_classrooms()

    return {"classes": classrooms}


@user_routes.route('/<int:id>/classes/create', methods=['GET', 'POST'])
def create_class(id):
    if request.method == 'POST':
        req_data = request.get_json()
        classroom = Classroom(
            name=req_data['className'],
            class_image_url=None,
            description=req_data['classDescription'],
            daily_objective=None,
            meeting_link=None,
            meeting_pw=None,
            active=False
        )
        # class_user_relation = ClassUser(
        #     user_id = id

        # )
        user = User.query.get(id)

        db.session.add(classroom)
        classroom.instructors.append(user)
        db.session.commit()
        print(classroom.to_dict)
        # print(req_data['className'])
        # return jsonify('hello')
        return jsonify("hello")


# name, class_image_url, description, daily_objective, meeting_link, meeting_pw, active


@user_routes.route('/me')
@login_required
def defaultView():
    return current_user.id.to_dict()


# update user info route example
@user_routes.route("/<int:id>/update", methods=["GET", "PUT"])
# @login_required
def updateUser(id):
    user = User.query.get(id)
    req_data = request.get_json()
    # return f"{req_data}"
    user.username = req_data['username']
    user.email = req_data['email']
    user.avatar_url = req_data['avatarUrl']
    user.hashed_password = generate_password_hash(req_data['password'])
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
