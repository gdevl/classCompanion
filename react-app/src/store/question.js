export const GET_STUDENT_QUESTION = 'GET_STUDENT_QUESTION';

export const getStudentQuestion = (question) => {
    return {
        type: GET_STUDENT_QUESTION,
        question,
    };
};

export const fetchStudentQuestion = async (classroomId, studentId) => {
    const request = await fetch(
        `/api/classes/${classroomId}/student/${studentId}/question`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const question = await request.json();
    return question;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_STUDENT_QUESTION: {
            return {
                ...state,
                ...action.question,
            };
        }
        default:
            return state;
    }
}
