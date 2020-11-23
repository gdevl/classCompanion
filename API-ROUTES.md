# API ROUTES
----
## User Routes
### GET
/api/users/unassigned-students
- Grabs all students who are not assigned to a class

/api/users/:user-id
- Grabs a user by id and returns one user's information

### POST
/api/users
- Creates a user with apporopriate information and signs them in

/api/users/create-student
- allows a teacher to create a student account
----
## Question Routes
### GET
/api/classroom/:class-id/questions
- Grabs all the questions based off of a specific classroom id

### POST
/api/classroom/:class-id/students/:student-id/questions
- Posts a question related to a class and student to display to a teacher

### PUT
/api/classroom/:class-id/questions/:question-id
- Allows a question to be resolved

----
## Answer Routes
### GET
/api/students/:student-id/answers
- Grabs all the answers a student has through their questions

/api/questions/:question-id/answers
- Grabs a specific answer for a question

### POST
/api/questions/:question-id/answers
- Allows a post for answering a question

### PUT
/api/questions/:question-id/answers
- Marks an answer as received

----
## Classroom Routes
### GET
/api/classroom/:class-id
- Grabs all the information from a classroom table

/api/users/:user-id/classes
- Returns a list of classes the user is a part of

### POST
/api/classroom
- Creates a new class to be managed by a teacher

----
## Group Routes
### GET
/api/classroom/:class-id/groups
- Gets all groups currently in a classroom

### POST
/api/classroom/:class-id/groups
- Sends a list of groups to be created in the backend and stored

### PUT
/api/classroom/:class-id/groups
- flags all active groups as inactive

----
## Check-In routes
### GET
/api/students/:student-id/attendance
- determines if a specific student has checked in

/api/classroom/:class-id/attendance
- grabs the attendance values of all members of current class

### POST
/api/students/:user-id/attendance
- allows a single user to check in by creating a check-in table entry
