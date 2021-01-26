export const GET_CLASSROOM_META = 'GET_CLASSROOM_META';
export const CLEAR_CLASSROOM_META = 'CLEAR_CLASSROOM_META';
export const ALTER_DESCRIPTION = 'ALTER_DESCRIPTION';
export const ALTER_OBJECTIVE = 'ALTER_OBJECTIVE';

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

export const patchDescription = async (classId, description) => {
    const body = {
        classId,
        description,
    };
    console.log('body: ', body);
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
        default:
            return state;
    }
}
