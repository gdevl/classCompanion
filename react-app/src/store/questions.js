export const GET_CLASSROOM_QUESTIONS = 'GET_CLASSROOM_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const getClassroomQuestions = (questions) => {
    return { type: GET_CLASSROOM_QUESTIONS, questions };
};

export const answerQuestion = (answer, question) => {
    const newQuestionWithAnswer = {
        ...question,
        answer,
    };
    return {
        type: ANSWER_QUESTION,
        newQuestionWithAnswer,
    };
};

export const patchAnswer = async (classId, questionId, answer) => {
    const body = {
        classId,
        questionId,
        answer,
    };

    const request = await fetch(
        `/api/classes/${classId}/question/${questionId}/answer`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    );
    const response = await request.json();
    return response;
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
        case ANSWER_QUESTION: {
            let newState = [...state];
            for (let question of newState) {
                if (question.id === action.newQuestionWithAnswer.id) {
                    question.answer = action.newQuestionWithAnswer.answer;
                }
            }
            return newState;
        }
        default:
            return state;
    }
}
