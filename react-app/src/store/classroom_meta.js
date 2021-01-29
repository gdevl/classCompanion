export const GET_CLASSROOM_META = 'GET_CLASSROOM_META';
export const CLEAR_CLASSROOM_META = 'CLEAR_CLASSROOM_META';
export const ALTER_DESCRIPTION = 'ALTER_DESCRIPTION';
export const ALTER_OBJECTIVE = 'ALTER_OBJECTIVE';
export const ALTER_MEETING_LINK = 'ALTER_MEETING_LINK';
export const ALTER_MEETING_PW = 'ALTER_MEETING_PW';
export const CHECK_IN_STUDENT = 'CHECK_IN_STUDENT';
export const SUBMIT_QUESTION = 'SUBMIT_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const DISMISS_QUESTION = 'DISMISS_QUESTION';
export const ACCEPT_ANSWER = 'ACCEPT_ANSWER';

export const getClassroomMeta = (classroom) => {
    return {
        type: GET_CLASSROOM_META,
        classroom,
    };
};

export const clearClassroomMeta = () => {
    return {
        type: CLEAR_CLASSROOM_META,
    };
};

export const alterDescription = (description) => {
    return {
        type: ALTER_DESCRIPTION,
        description,
    };
};

export const alterObjective = (objective) => {
    return {
        type: ALTER_OBJECTIVE,
        objective,
    };
};

export const alterMeetingLink = (meetingLink) => {
    return {
        type: ALTER_MEETING_LINK,
        meetingLink,
    };
};

export const alterMeetingPw = (meetingPw) => {
    return {
        type: ALTER_MEETING_PW,
        meetingPw,
    };
};

export const checkInStudent = (studentId) => {
    return {
        type: CHECK_IN_STUDENT,
        studentId,
    };
};

export const submitQuestion = (question) => {
    return {
        type: SUBMIT_QUESTION,
        question,
    };
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

export const dismissQuestion = (question) => {
    return {
        type: DISMISS_QUESTION,
        question,
    };
};

export const acceptAnswer = (answer) => {
    return {
        type: ACCEPT_ANSWER,
        answer,
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

export const patchQuestionDismissal = async (classId, questionId) => {
    const body = {
        classId,
        questionId,
    };

    const request = await fetch(
        `/api/classes/${classId}/question/${questionId}/dismiss`,
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

export const postStudentCheckIn = async (classId, studentId) => {
    const body = {
        classId,
        studentId,
    };
    const request = await fetch(
        `/api/classes/${classId}/user/${studentId}/checkin`,
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

export const patchDescription = async (classId, description) => {
    const body = {
        classId,
        description,
    };

    const request = await fetch(`/api/classes/${classId}/description`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export const patchDailyObjective = async (classId, daily_objective) => {
    const body = {
        classId,
        daily_objective,
    };
    const request = await fetch(`/api/classes/${classId}/daily_objective`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export const patchMeetingLink = async (classId, meeting_link) => {
    const body = {
        classId,
        meeting_link,
    };
    const request = await fetch(`/api/classes/${classId}/meeting_link`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export const patchMeetingPw = async (classId, meeting_pw) => {
    const body = {
        classId,
        meeting_pw,
    };
    const request = await fetch(`/api/classes/${classId}/meeting_pw`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const response = await request.json();
    return response;
};

export const fetchClassroomData = async (classId) => {
    const request = await fetch(`/api/classes/${classId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await request.json();
    return response;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_CLASSROOM_META: {
            return {
                ...state,
                ...action.classroom,
            };
        }
        case CLEAR_CLASSROOM_META: {
            return {};
        }
        case ALTER_DESCRIPTION: {
            return {
                ...state,
                description: action.description,
            };
        }
        case ALTER_OBJECTIVE: {
            return {
                ...state,
                daily_objective: action.objective,
            };
        }
        case ALTER_MEETING_LINK: {
            return {
                ...state,
                meeting_link: action.meetingLink,
            };
        }
        case ALTER_MEETING_PW: {
            return {
                ...state,
                meeting_pw: action.meetingPw,
            };
        }
        case CHECK_IN_STUDENT: {
            let newState = { ...state };
            newState['attendance'].push(action.studentId);
            return newState;
        }
        case SUBMIT_QUESTION: {
            let newState = { ...state };
            newState['questions'].push(action.question);
            return newState;
        }
        case ANSWER_QUESTION: {
            let newState = { ...state };
            let newQuestions = [];
            for (let question of newState['questions']) {
                if (question.id === action.newQuestionWithAnswer.id) {
                    newQuestions.push(action.newQuestionWithAnswer);
                } else {
                    newQuestions.push(question);
                }
            }
            return newState;
        }
        case DISMISS_QUESTION: {
            return {
                ...state,
            };
        }

        case ACCEPT_ANSWER: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}
