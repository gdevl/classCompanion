export const GET_ENROLLED_STUDENTS = 'GET_ENROLLED_STUDENTS';
export const ENROLL_STUDENT = 'ENROLL_STUDENT';
export const CLEAR_ENROLLED_STUDENTS = 'CLEAR_ENROLLED_STUDENTS';

export const getEnrolledStudents = (students) => {
    return {
        type: GET_ENROLLED_STUDENTS,
        students,
    };
};

export const enrollStudent = (student) => {
    return {
        type: ENROLL_STUDENT,
        student,
    };
};

export const clearEnrolledStudents = () => {
    return {
        type: CLEAR_ENROLLED_STUDENTS,
    };
};

export const fetchEnrollment = async (classroomId) => {
    const request = await fetch(`/api/classes/${classroomId}/enrolled`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    return response;
};

export const addStudentToClassroom = async (enrollmentData) => {
    const { userId, classroomId } = enrollmentData;
    const body = {
        userId,
        classroomId,
    };
    const request = await fetch(`/api/classes/${classroomId}/enroll`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_ENROLLED_STUDENTS: {
            return {
                ...state,
                ...action.students,
            };
        }
        case ENROLL_STUDENT: {
            return {
                ...state,
                ...action.student,
            };
        }
        case CLEAR_ENROLLED_STUDENTS: {
            return {};
        }
        default:
            return state;
    }
}
