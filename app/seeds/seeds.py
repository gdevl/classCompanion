from werkzeug.security import generate_password_hash
from app.models import db, User, Instructor, Student

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = Instructor(
        username='Demo',
        first_name="de",
        last_name="mo",
        email='demo@aa.io',
        password='password',
    )

    demo_student = Student(
        username='Student',
        first_name="Stu",
        last_name="Dent",
        email='student@aa.io',
        password='password',
    )

    db.session.add_all([demo, demo_student])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def truncate_tables():
    db.session.execute(
        '''TRUNCATE
        users
        , classroom_user
        , questions
        , answers
        , classes
        , check_ins
        , group_students
        , groups;'''
    )
    db.session.commit()

# def undo_users():
#     db.session.execute('TRUNCATE users;')
#     db.session.commit()
