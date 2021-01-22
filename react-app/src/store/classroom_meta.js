export const GET_CLASSROOM_META = 'GET_CLASSROOM_META';
export const CLEAR_CLASSROOM_META = 'CLEAR_CLASSROOM_META';

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
        default:
            return state;
    }
}
