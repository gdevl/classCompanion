export const GET_CLASSROOM_QUESTIONS = 'GET_CLASSROOM_QUESTIONS';

export const getClassroomQuestions = (questions) => {
    return { type: GET_CLASSROOM_QUESTIONS, questions };
};

export const fetchClassroomQuestions = async (classId) => {
    const request = await fetch(`/api/classes/${classId}/questions`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const questions = await request.json();
    return questions;
};

export default function reducer(state = [], action) {
    switch (action.type) {
        case GET_CLASSROOM_QUESTIONS: {
            return [...action.questions];
        }
        default:
            return state;
    }
}
