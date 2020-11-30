from werkzeug.security import generate_password_hash
from app.models import db, User, Instructor, Student

# Adds a demo user, you can add other users here if you want


def seed_users():

    # demo = Instructor(
    #     username='Demo',
    #     first_name="de",
    #     last_name="mo",
    #     email='demo@aa.io',
    #     password='password',
    # )

    demo_student = Student(
        username='Student',
        first_name="Stu",
        last_name="Dent",
        email='student@aa.io',
        password='password',
    )

    demo_student2 = Student(
        username='Student2',
        first_name="Stu2",
        last_name="Dent2",
        email='student2@aa.io',
        password='password',
    )

    demo_student3 = Student(
        username='Student3',
        first_name="Stu3",
        last_name="Dent3",
        email='student3@aa.io',
        password='password',
    )

    demo_student4 = Student(
        username='Student4',
        first_name="Stu4",
        last_name="Dent4",
        email='student4@aa.io',
        password='password',
    )

    demo_student5 = Student(
        username='Student5',
        first_name="Stu5",
        last_name="Dent5",
        email='student5@aa.io',
        password='password',
    )

    demo_student6 = Student(
        username='Student6',
        first_name="Stu6",
        last_name="Dent6",
        email='student6@aa.io',
        password='password',
    )

    db.session.add_all([demo_student2, demo_student3, demo_student4, demo_student5, demo_student6])

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
