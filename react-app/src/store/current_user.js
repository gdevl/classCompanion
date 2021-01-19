export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

export const setCurrentUser = (user) => {
    return { type: SET_CURRENT_USER, user };
};

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER,
    };
};

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {
                ...state,
                ...action.user,
            };
        }
        case CLEAR_CURRENT_USER: {
            return {};
        }
        default:
            return state;
    }
}
