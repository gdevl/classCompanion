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
        avatar_url="https://64.media.tumblr.com/avatar_6127abd6f52e_128.pnj",
        username="jwinger",
        first_name="Jeff",
        last_name="Winger",
        email="jwinger@greendale.edu",
        password="password",
    )

    abed = Student(
        avatar_url="https://pbs.twimg.com/profile_images/3122852421/a7f312e3a413b5178a86bec20ce9270d.jpeg",
        username="anadir",
        first_name="Abed",
        last_name="Nadir",
        email="anadir@greendale.edu",
        password="password",
    )

    britta = Student(
        avatar_url="https://64.media.tumblr.com/avatar_fcd03a1bd247_128.pnj",
        username="bperry",
        first_name="Britta",
        last_name="Perry",
        email="bperry@greendale.edu",
        password="password",
    )

    shirley = Student(
        avatar_url="https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters_opt/p-community-yvette-nicole-brown.jpg",
        username="sbennett",
        first_name="Shirley",
        last_name="Bennett",
        email="sbennett@greendale.edu",
        password="password",
    )

    annie = Student(
        avatar_url="https://64.media.tumblr.com/avatar_d257b0d7b06f_128.pnj",
        username="aedison",
        first_name="Annie",
        last_name="Edison",
        email="aedison@greendale.edu",
        password="password",
    )

    troy = Student(
        avatar_url="https://64.media.tumblr.com/d520dd4c9327607864c302e59f4c0a3a/ac5a3330700bd9ce-c5/s128x128u_c1/9aab8f366f1cdd8c40a785e17dad166b87867d09.jpg",
        username="tbarnes",
        first_name="Troy",
        last_name="Barnes",
        email="tbarnes@greendale.edu",
        password="password",
    )

    pierce = Student(
        avatar_url="https://pbs.twimg.com/profile_images/3098256871/2836aacc9ce759900c7a1dc5df43eaa9.jpeg",
        username="phawthorne",
        first_name="Pierce",
        last_name="Hawthorne",
        email="phawthorne@greendale.edu",
        password="password",
    )

    starburns = Student(
        avatar_url="https://pbs.twimg.com/profile_images/2184710310/Screen_shot_2012-05-02_at_11.15.48_AM_400x400.png",
        username="aosbourne",
        first_name="Alex",
        last_name="Osbourne",
        email="aosbourne@greendale.edu",
        password="password",
    )

    leonard = Student(
        avatar_url="https://pbs.twimg.com/profile_images/577903655203946496/-Dpf3jAB.png",
        username="lrodriguez",
        first_name="Leonard",
        last_name="Rodriguez",
        email="lrodriguez@greendale.edu",
        password="password",
    )

    vaughn = Student(
        avatar_url="https://pbs.twimg.com/profile_images/1168039285/Community1x04_0371.jpg",
        username="vmiller",
        first_name="Vaughn",
        last_name="Miller",
        email="vmiller@greendale.edu",
        password="password",
    )

    garrett = Student(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/2/2b/5x3_Promotional_photo_1.jpg",
        username="glambert",
        first_name="Garrett",
        last_name="Lambert",
        email="glambert@greendale.edu",
        password="password",
    )

    rich = Student(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/e/e6/It_should_have_been_you%21.jpg",
        username="rstephenson",
        first_name="Rich",
        last_name="Stephenson",
        email="rstephenson@greendale.edu",
        password="password",
    )

    # faculty

    benChang = Instructor(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/c/c1/Chang_S5_headshot.jpg",
        username="bchang",
        first_name="Ben",
        last_name="Chang",
        email="bchang@greendale.edu",
        password="password",
    )

    ianDuncan = Instructor(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/a/ab/Duncan.jpg",
        username="iduncan",
        first_name="Ian",
        last_name="Duncan",
        email="iduncan@greendale.edu",
        password="password",
    )

    michelleSlater = Instructor(
        avatar_url="https://www.personality-database.com/profile_images/119606.png",
        username="mslater",
        first_name="Michelle",
        last_name="Slater",
        email="mslater@greendale.edu",
        password="password",
    )

    seanGarrity = Instructor(
        avatar_url="https://pbs.twimg.com/profile_images/1959600420/tumblr_lc41hb00RH1qdjvfko1_500_400x400.jpg",
        username="sgarrity",
        first_name="Sean",
        last_name="Garrity",
        email="sgarrity@greendale.edu",
        password="password",
    )

    juneBauer = Instructor(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/4/4b/Betty_White7.jpg",
        username="jbauer",
        first_name="June",
        last_name="Bauer",
        email="jbauer@greendale.edu",
        password="password",
    )

    eusticeWhitman = Instructor(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/7/73/Whitman.jpg",
        username="ewhitman",
        first_name="Eustice",
        last_name="Whitman",
        email="ewhitman@greendale.edu",
        password="password",
    )

    marshallKane = Instructor(
        avatar_url="https://static.wikia.nocookie.net/community-sitcom/images/e/ea/3x01-Marshall_Kane_interrupted.jpg",
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
