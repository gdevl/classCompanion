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

@user_routes.route('/<int:user_id>/rooms')
def get_classes(user_id):
    user = User.query.get(user_id)
    return jsonify([classroom.truncated() for classroom in user.classrooms])


@user_routes.route('/<int:user_id>/classes/create', methods=['POST'])
def create_class(user_id):
    if request.method == 'POST':
        req_data = request.get_json()
        print(f'req_data {req_data}')
        classroom = Classroom(
            name=req_data['className'],
            description=req_data['classDescription'],
        )

        instructor = User.query.get(user_id)
        db.session.add(classroom)
        classroom.instructors.append(instructor)
        db.session.commit()
        return jsonify(classroom.truncated())


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
