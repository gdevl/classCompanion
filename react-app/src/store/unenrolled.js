export const GET_UNENROLLED_STUDENTS = 'GET_UNENROLLED_STUDENTS';
export const UNENROLL_STUDENT = 'UNENROLL_STUDENT';
export const CLEAR_UNENROLLED_STUDENTS = 'CLEAR_UNENROLLED_STUDENTS';

export const getUnenrolledStudents = (students) => {
    return {
        type: GET_UNENROLLED_STUDENTS,
        students,
    };
};

export const unenrollStudent = (student) => {
    return {
        type: UNENROLL_STUDENT,
        student,
    };
};

export const clearUnenrolledStudents = () => {
    return {
        type: CLEAR_UNENROLLED_STUDENTS,
    };
};

export const fetchUnenrolled = async (classroomId) => {
    const request = await fetch(`/api/classes/${classroomId}/unenrolled`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    return response;
};

export const removeStudentFromClassroom = async (enrollmentData) => {
    const { userId, classroomId } = enrollmentData;
    const body = {
        userId,
        classroomId,
    };
    const request = await fetch(`/api/classes/${classroomId}/unenroll`, {
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
        case GET_UNENROLLED_STUDENTS: {
            return {
                ...state,
                ...action.students,
            };
        }
        case UNENROLL_STUDENT: {
            return {
                ...state,
                ...action.student,
            };
        }
        case CLEAR_UNENROLLED_STUDENTS: {
            return {};
        }
        default:
            return state;
    }
}
