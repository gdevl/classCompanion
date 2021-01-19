export const GET_ENROLLED_STUDENTS = 'GET_ENROLLED_STUDENTS';

export const getEnrolledStudents = (students) => {
    return {
        type: GET_ENROLLED_STUDENTS,
        students,
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
