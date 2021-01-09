export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_CLASSROOM = "SET_CURRENT_CLASSROOM";
export const SET_CURRENT_CLASSROOMS = "SET_CURRENT_CLASSROOMS";

export const setCurrentUser = (user) => {
  return { type: SET_CURRENT_USER, user };
};

export const setCurrentClassRoom = (classroom) => {
  // console.log(classroom)
  return {
    type: SET_CURRENT_CLASSROOM,
    classroom,
  };
};

export const fetchClassrooms = async (userId) => {
  const response = await fetch(`/api/users/${userId}/classrooms`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  const classrooms = {};
  result.classes.classrooms.forEach((classroom) => {
    if (classroom.active !== false) {
      classrooms[classroom.id] = classroom;
    }
  });
  return classrooms;
};

export const setUserClasses = (classrooms) => {
  return {
    type: SET_CURRENT_CLASSROOMS,
    classrooms,
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
        current_class: action.classroom,
      };
    }
    case SET_CURRENT_CLASSROOMS: {
      return {
        ...state,
        classrooms: action.classrooms,
      };
    }
    default:
      return state;
  }
}
