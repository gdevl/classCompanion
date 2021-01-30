import os
from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit, send
from flask_socketio import join_room, leave_room
import json
import eventlet

from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User, Classroom
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.class_routes import class_routes
from .api.question_routes import question_routes
from .api.student_routes import student_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(class_routes, url_prefix='/api/classes')
app.register_blueprint(question_routes, url_prefix='/api/questions')
app.register_blueprint(student_routes, url_prefix='/api/students')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


# socket code
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(
    app,
    cors_allowed_origins='*',
    # logger=True,
    # engineio_logger=True,
    async_mode='eventlet'
)


@socketio.on('connect')
def test_connect():
    print('Client connected')


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socketio.on('join')
def on_join(id):
    print("id: ")
    print(id)
    # try:
    Classroom.query.get(id)
    room = f"classroom{id}"
    join_room(room)

    print(f'client joined classroom {id}')
    send('has entered the room.', room=room)


@socketio.on('leave')
def on_leave(data):
    # username = data['username']
    classroom = data['classroom']
    room = f'classroom{id}'
    leave_room(room)
    print(f'leaving room {room}')


@socketio.event
def question(data):
    print(f'data: {data}')
    print("asked a question")
    classroomId = data['class_id']
    emit('question_response', data, room=f'classroom{classroomId}')


@socketio.event
def answer(data):
    print(f'data: {data}')
    print("answered a question")
    classroomId = data['class_id']
    emit('answer_response', data, room=f'classroom{classroomId}')


@socketio.event
def dismiss(data):
    print("dismissed a question")
    classroom = data['classroom']
    emit('response', room=f'classroom{classroom}')


@socketio.event
def checkin(data):
    print("checked in")
    classroom = data['classroomId']
    emit('checkin_response', data, room=f'classroom{classroom}')


@socketio.event
def meeting_link_update(data):
    print("meeting link changed")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('meeting_link_update_response', data, room=f'classroom{classroom}')


@socketio.event
def meeting_pw_update(data):
    print("meeting link password changed")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('meeting_link_pw_response', data, room=f'classroom{classroom}')


@socketio.event
def daily_objective_update(data):
    print("daily objective changed")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('daily_objective_update_response', data, room=f'classroom{classroom}')


@socketio.event
def description_update(data):
    print("class description changed")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('description_update_response', data, room=f'classroom{classroom}')


@socketio.event
def group_status_changed(data):
    print("group status changed")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('group_status_changed_response', data, room=f'classroom{classroom}')


@socketio.event
def ungroup_students(data):
    print("students ungrouped")
    print("data:")
    print(data)
    classroom = data['classroomId']
    emit('ungroup_response', data, room=f'classroom{classroom}')
