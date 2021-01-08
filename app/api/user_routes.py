from flask import Blueprint, jsonify, request, make_response
from flask_login import login_required, current_user
from werkzeug.security import generate_password_hash
from ..models import db
from app.models import User, Classroom, Question


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
            active=True
        )

        user = User.query.get(id)
        db.session.add(classroom)
        classroom.instructors.append(user)
        db.session.commit()
        return jsonify('hello')


@user_routes.route('/me')
@login_required
def defaultView():
    return current_user.id.to_dict()


# update user info route example
@user_routes.route("/<int:id>/update", methods=["PUT"])
# @login_required
def updateUser(id):
    if request.method == 'PUT':
        user = User.query.get(id)
        req_data = request.get_json()
        # return f"{req_data}"
        user.username = req_data['username']
        user.email = req_data['email']
        user.avatar_url = req_data['avatarUrl']
        # user.hashed_password = generate_password_hash(req_data['password'])
        db.session.add(user)
        db.session.commit()
        return user.to_dict()

# @user_routes.route("/<int:id>/update", methods=["GET", "PUT"])
# # @login_required
# def updateUser(id):
#     if request.method == 'GET':
#         user = User.query.get(id)
#         req_data = request.get_json()
#         username = req_data['username']
#         email = req_data['email']
#         avatar_url = req_data['email']
#         response = make_response(
#             jsonify(
#                 {username, email, avatar_url}
#             )
#         )
#         response.headers["Content-Type"] = "application/json"
#         return response
#     # return f"{req_data}"
#     if request.method == 'POST':
#         user = User.query.get(id)
#         req_data = request.get_json()
#         user.username = req_data['username']
#         user.email = req_data['email']
#         user.avatar_url = req_data['avatarUrl']
#         user.hashed_password = generate_password_hash(req_data['password'])
#         db.session.add(user)
#         db.session.commit()
#         return user.to_dict()
