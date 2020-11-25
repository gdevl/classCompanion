from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User
from werkzeug.security import generate_password_hash
from ..models import db

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


@user_routes.route('/me')
@login_required
def defaultView():
    return current_user.to_dict()


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
