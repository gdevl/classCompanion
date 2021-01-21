export const GET_ROSTER = 'GET_ROSTER';
export const ENROLL_STUDENT = 'ENROLL_STUDENT';
export const UNENROLL_STUDENT = 'UNENROLL_STUDENT';

export const addStudentToStore = (student) => {
    return {
        type: ENROLL_STUDENT,
        student,
    };
};

export const removeStudentFromStore = (student) => {
    return {
        type: UNENROLL_STUDENT,
        student,
    };
};

export const getRoster = (roster) => {
    return {
        type: GET_ROSTER,
        roster,
    };
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

export const fetchRoster = async (classroomId) => {
    const request = await fetch(`/api/classes/${classroomId}/roster`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const response = await request.json();
    return response;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_ROSTER: {
            return {
                ...state,
                ...action.roster,
            };
        }
        case UNENROLL_STUDENT: {
            const oldState = { ...state };
            const enrolled = oldState.enrolled.filter((id) => 
                id !== action.student.id
            )
            return {
                ...state,
                enrolled
            }
        }
        case ENROLL_STUDENT: {
            const newState = { ...state};
            newState["enrolled"].push(action.student.id)
            return newState;
        }
        default:
            return state;
    }
}
