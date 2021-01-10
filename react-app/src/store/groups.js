export const GET_CLASS_GROUPS = "GET_CLASS_GROUPS";

export const getClassGroups = (classroomId) => {
  return { type: GET_CLASS_GROUPS, classroomId };
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
    case GET_CLASS_GROUPS: {
      return {
        ...state,
        groups: action.groups,
      };
    }
    default:
      return state;
  }
}