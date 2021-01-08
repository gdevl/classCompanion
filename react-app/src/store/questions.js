export const GET_CLASS_QUESTIONS = "GET_CLASS_QUESTIONS";

export const getClassQuestions = (classroomId) => {
  return { type: SET_CURRENT_USER, user };
};

export const fetchQuestions = async (classId) => {
  const response = await fetch(`/api/questions/${classId}/classrooms`, {
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

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_CLASS_QUESTIONS: {
      return {
        ...state,
        questions: action.questions,
      };
    }
    default:
      return state;
  }
}
