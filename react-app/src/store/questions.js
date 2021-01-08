export const GET_UNRESOLVED_QUESTIONS = "GET_UNRESOLVED_QUESTIONS";

export const getUnresolvedQuestions = (classroomId) => {
  return { type: GET_UNRESOLVED_QUESTIONS, classroomId };
};

export const fetchUnresolvedQuestions = async (classId) => {
  const request = await fetch(`/api/classes/${classId}/questions`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const questions = await request.json();
  console.log("Questions:");
  console.log(questions);
  return questions;
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_UNRESOLVED_QUESTIONS: {
      return {
        ...state,
        questions: action.questions,
      };
    }
    default:
      return state;
  }
}
