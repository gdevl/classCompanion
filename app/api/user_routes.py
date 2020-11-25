from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from flask import jsonify

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
