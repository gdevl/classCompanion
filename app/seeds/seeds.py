from werkzeug.security import generate_password_hash
from app.models import db, User, Instructor, Student, Classroom

# Adds a demo user, you can add other users here if you want


def seed_users():

    deanPelton = Instructor(
        username="cpelton",
        first_name="Craig",
        last_name="Pelton",
        email="cpelton@greendale.edu",
        password="password",
    )

    # students

    jeff = Student(
        username="jwinger",
        first_name="Jeff",
        last_name="Winger",
        email="jwinger@greendale.edu",
        password="password",
    )

    abed = Student(
        username="anadir",
        first_name="Abed",
        last_name="Nadir",
        email="anadir@greendale.edu",
        password="password",
    )

    britta = Student(
        username="bperry",
        first_name="Britta",
        last_name="Perry",
        email="bperry@greendale.edu",
        password="password",
    )

    shirley = Student(
        username="sbennett",
        first_name="Shirley",
        last_name="Bennett",
        email="sbennett@greendale.edu",
        password="password",
    )

    annie = Student(
        username="aedison",
        first_name="Annie",
        last_name="Edison",
        email="aedison@greendale.edu",
        password="password",
    )

    troy = Student(
        username="tbarnes",
        first_name="Troy",
        last_name="Barnes",
        email="tbarnes@greendale.edu",
        password="password",
    )

    pierce = Student(
        username="phawthorne",
        first_name="Pierce",
        last_name="Hawthorne",
        email="phawthorne@greendale.edu",
        password="password",
    )

    starburns = Student(
        username="aosbourne",
        first_name="Alex",
        last_name="Osbourne",
        email="aosbourne@greendale.edu",
        password="password",
    )

    leonard = Student(
        username="lrodriguez",
        first_name="Leonard",
        last_name="Rodriguez",
        email="lrodriguez@greendale.edu",
        password="password",
    )

    vaughn = Student(
        username="vmiller",
        first_name="Vaughn",
        last_name="Miller",
        email="vmiller@greendale.edu",
        password="password",
    )

    garrett = Student(
        username="glambert",
        first_name="Garrett",
        last_name="Lambert",
        email="glambert@greendale.edu",
        password="password",
    )

    rich = Student(
        username="rstephenson",
        first_name="Rich",
        last_name="Stephenson",
        email="rstephenson@greendale.edu",
        password="password",
    )

    # faculty

    benChang = Instructor(
        username="bchang",
        first_name="Ben",
        last_name="Chang",
        email="bchang@greendale.edu",
        password="password",
    )

    ianDuncan = Instructor(
        username="iduncan",
        first_name="Ian",
        last_name="Duncan",
        email="iduncan@greendale.edu",
        password="password",
    )

    michelleSlater = Instructor(
        username="mslater",
        first_name="Michelle",
        last_name="Slater",
        email="mslater@greendale.edu",
        password="password",
    )

    seanGarrity = Instructor(
        username="sgarrity",
        first_name="Sean",
        last_name="Garrity",
        email="sgarrity@greendale.edu",
        password="password",
    )

    juneBauer = Instructor(
        username="jbauer",
        first_name="June",
        last_name="Bauer",
        email="jbauer@greendale.edu",
        password="password",
    )

    eusticeWhitman = Instructor(
        username="ewhitman",
        first_name="Eustice",
        last_name="Whitman",
        email="ewhitman@greendale.edu",
        password="password",
    )

    marshallKane = Instructor(
        username="mkane",
        first_name="Marshall",
        last_name="Kane",
        email="mkane@greendale.edu",
        password="password",
    )


    # classes

    spanish101 = Classroom(
        name="Spanish 101",
        description="Intro to Spanish",
    )
    spanish101.instructors.append(benChang)
    spanish101roster = [
        jeff,
        abed,
        britta,
        shirley,
        annie,
        troy,
        pierce,
        starburns,
        leonard
    ]
    spanish101.students.extend(spanish101roster)

    psychology101 = Classroom(
        name="Psychology 101",
        description="Intro to Psychology",
    )
    psychology101.instructors.append(ianDuncan)
    psychology101roster = [
        abed,
        annie,
        troy,
        starburns,
        garrett,
        rich,
        vaughn
    ]
    psychology101.students.extend(psychology101roster)

    statistics101 = Classroom(
        name="Statistics 101",
        description="Intro to Statistics",
    )
    statistics101.instructors.append(michelleSlater)
    statistics101roster = [
        jeff,
        abed,
        troy,
        pierce,
        starburns,
        leonard,
        rich
    ]
    statistics101.students.extend(statistics101roster)

    accounting101 = Classroom(
        name="Accounting 101",
        description="Intro to Accounting",
    )
    accounting101.instructors.append(eusticeWhitman)
    accounting101roster = [
        jeff,
        shirley,
        annie,
        pierce,
        starburns,
        leonard,
        rich
    ]
    accounting101.students.extend(accounting101roster)

    anthropology101 = Classroom(
        name="Anthropology 101",
        description="Intro to Anthropology",
    )
    anthropology101.instructors.append(juneBauer)
    anthropology101roster = [
        jeff,
        abed,
        britta,
        shirley,
        annie,
        troy,
        pierce,
        starburns,
        leonard,
        rich,
        vaughn
    ]
    anthropology101.students.extend(anthropology101roster)

    conspiracyTheories101 = Classroom(
        name="Conspiracy Theories 101",
        description="Intro to Conspiracy Theories",
    )
    conspiracyTheories101.instructors.append(seanGarrity)
    conspiracyTheories101roster = [
        jeff,
        annie
    ]
    conspiracyTheories101.students.extend(conspiracyTheories101roster)

    biology101 = Classroom(
        name="Biology 101",
        description="Intro to Biology",
    )
    biology101.instructors.append(marshallKane)
    biology101roster = [
        jeff,
        abed,
        britta,
        shirley,
        annie,
        troy,
        pierce,
        starburns,
        leonard,
        rich,
        vaughn
    ]
    biology101.students.extend(biology101roster)


    db.session.add_all(
        [
            deanPelton,
            jeff,
            abed,
            britta,
            shirley,
            annie,
            troy,
            pierce,
            starburns,
            leonard,
            vaughn,
            garrett,
            rich,
            benChang,
            ianDuncan,
            michelleSlater,
            seanGarrity,
            juneBauer,
            eusticeWhitman,
            marshallKane,
            spanish101,
            psychology101,
            statistics101,
            accounting101,
            anthropology101,
            conspiracyTheories101,
            biology101
        ]
    )


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
