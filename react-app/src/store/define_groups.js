export const SET_GROUPS_DEFINED = "SET_GROUPS_DEFINED";

export const setGroupsDefined = (groups_defined) => {
    return {
        type: SET_GROUPS_DEFINED,
        groups_defined,
    };
};

const initialState = false;

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_GROUPS_DEFINED: {
            return action.groups_defined;
        }
        default:
            return state;
    }
}
