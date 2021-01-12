export const SET_CURRENT_CLASSROOM = "SET_CURRENT_CLASSROOM";
export const CLEAR_CURRENT_CLASSROOM = "CLEAR_CURRENT_CLASSROOM";

export const setCurrentClassroom = (classroom) => {
  return {
    type: SET_CURRENT_CLASSROOM,
    classroom,
  };
};

export const clearCurrentClassroom = () => {
  return {
    type: CLEAR_CURRENT_CLASSROOM,
  };
};

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_CLASSROOM: {
      const newState = Number(action.classroom);
      return newState;
    }
    case CLEAR_CURRENT_CLASSROOM: {
      return null;
    }
    default:
      return state;
  }
}
