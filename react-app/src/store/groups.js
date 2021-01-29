export const SET_CLASS_GROUPS = "SET_CLASS_GROUPS";
export const CLEAR_CLASS_GROUPS = "CLEAR_CLASS_GROUPS";

export const setClassGroups = (groups) => {
    return { type: SET_CLASS_GROUPS, groups };
};

export const clearClassGroups = () => {
    return { type: CLEAR_CLASS_GROUPS };
};

export const fetchClassGroups = async (classId) => {
    const request = await fetch(`/api/classes/${classId}/groups`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const groups = await request.json();
    return groups;
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_CLASS_GROUPS: {
            return {
                ...state,
                ...action.groups,
            };
        }

        case CLEAR_CLASS_GROUPS: {
            return {};
        }
        default:
            return state;
    }
}
