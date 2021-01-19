export const GET_UNENROLLED_STUDENTS = 'GET_UNENROLLED_STUDENTS';

export const getUnenrolledStudents = (students) => {
    return {
        type: GET_UNENROLLED_STUDENTS,
        students,
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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_UNENROLLED_STUDENTS: {
            return {
                ...state,
                ...action.students,
            };
        }
        default:
            return state;
    }
}
