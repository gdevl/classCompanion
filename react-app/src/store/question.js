export const GET_STUDENT_QUESTION = 'GET_STUDENT_QUESTION';
export const ACCEPT_ANSWER = 'ACCEPT_ANSWER';
export const CLEAR_QUESTION = 'CLEAR_QUESTION';
export const SUBMIT_QUESTION = 'SUBMIT_QUESTION';

export const getStudentQuestion = (question) => {
    return {
        type: GET_STUDENT_QUESTION,
        question,
    };
};

export const submitQuestion = (question) => {
    return {
        type: SUBMIT_QUESTION,
        question,
    };
};

export const acceptAnswer = (question) => {
    return {
        type: ACCEPT_ANSWER,
        question,
    };
};

export const clearQuestion = () => {
    return {
        type: CLEAR_QUESTION,
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

export const patchQuestionAcceptance = async (classId, questionId) => {
    console.log('classId', classId);
    console.log('questionId', questionId);
    const body = {
        classId,
        questionId,
    };

    const request = await fetch(
        `/api/classes/${classId}/question/${questionId}/accept`,
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

export const postQuestion = async (classId, studentId, question) => {
    console.log('question: ', question);
    const body = {
        classId,
        studentId,
        question,
    };

    const request = await fetch(
        `/api/classes/${classId}/user/${studentId}/question`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    );
    const response = await request.json();
    return response;
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
        case CLEAR_QUESTION: {
            return {};
        }
        case ACCEPT_ANSWER: {
            let newState = { ...state };
            newState.resolved = true;
            return newState;
        }
        case SUBMIT_QUESTION: {
            return {
                ...state,
                ...action.question,
            };
        }

        default:
            return state;
    }
}
