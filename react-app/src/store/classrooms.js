// export const SET_CURRENT_CLASSROOM = "SET_CURRENT_CLASSROOM";
export const GET_USER_CLASSROOMS = "GET_USER_CLASSROOMS";
// export const GET_CLASSROOM_GROUPS = "GET_CLASSROOM_GROUPS";

export const getUserClassrooms = (classrooms) => {
  return {
    type: GET_USER_CLASSROOMS,
    classrooms,
  };
};

export const fetchClassDisplay = async (userId) => {
  const request = await fetch(`/api/users/${userId}/rooms`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await request.json();
  console.log("response:");
  console.log(response);
  return response;
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_CLASSROOMS: {
      return {
        ...state,
        ...action.classrooms,
      };
    }
    default:
      return state;
  }
}
