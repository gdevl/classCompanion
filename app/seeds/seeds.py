from werkzeug.security import generate_password_hash
from app.models import db, Instructor

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = Instructor(
        username='Demo',
        first_name="de",
        last_name="mo",
        email='demo@aa.io',
        password='password',
        role='instructor'
    )

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def truncate_tables():
    db.session.execute(
        '''TRUNCATE
        users
        , instructors
        , students
        , classroom_user
        , questions
        , answers
        , classes
        , checkins
        , group_students
        , groups;'''
    )
    db.session.commit()

# def undo_users():
#     db.session.execute('TRUNCATE users;')
#     db.session.commit()
