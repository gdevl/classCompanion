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
