export const SET_CLASS_GROUPS = "SET_CLASS_GROUPS";

export const setClassGroups = (classroomId) => {
  return { type: SET_CLASS_GROUPS, classroomId };
};

export const fetchClassGroups = async (classId) => {
  const request = await fetch(`/api/classes/${classId}/groups`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const groups = await request.json();
  console.log("groups:");
  console.log(groups);
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
    default:
      return state;
  }
}
