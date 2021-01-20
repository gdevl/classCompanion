export const GET_ENROLLED_STUDENTS = 'GET_ENROLLED_STUDENTS';
export const ENROLL_STUDENT = 'ENROLL_STUDENT';

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

export const fetchEnrollment = async (classroomId) => {
    const request = await fetch(`/api/classes/${classroomId}/enrolled`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    return response;
};

export const enrollNewStudent = async (enrollmentData) => {
    const { userId, classroomId } = enrollmentData;
    const body = {
        userId,
        classroomId,
    };
    const request = await fetch(`/api/classes/${classroomId}/enroll`, {
        method: 'POST',
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
        default:
            return state;
    }
}
