from flask import Blueprint, jsonify
from flask_login import login_required, current_user
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


@user_routes.route('/<int:id>/classrooms')
def classes(id):
    user = User.query.get(id)
    classrooms = user.get_user_classrooms()

    # data = {
    #     "classes": [classroom.to_dict() for classroom in classrooms],
    #     "students": {},
    #     "groups": {}
    # }
    return {"classes": classrooms}


@user_routes.route('/me')
@login_required
def defaultView():
    return current_user.id.to_dict()


# @user_routes.route('/me', methods=["PUT"])
# @login_required
# def update_user(id):
