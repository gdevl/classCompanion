export const SET_CURRENT_USER = "classCorral/users/user";
export const SET_CURRENT_CLASSROOM = "classCorral/users/classroom";

export const setCurrentUser = (user) => {
  return { type: SET_CURRENT_USER, user };
};

export const setActiveClassRoom = (classroom) => {
  return {
    type: SET_CURRENT_CLASSROOM,
    classroom,
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        current_user: action.user,
      };
    }
    case SET_CURRENT_CLASSROOM: {
      return {
        ...state,
        active_class: action.classroom,
      };
    }
    default:
      return state;
  }
}
