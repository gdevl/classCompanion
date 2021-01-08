export const GET_ARCHIVED_QUESTIONS = "GET_ARCHIVED_QUESTIONS";

export const getArchivedQuestions = (classroomId) => {
  return { type: GET_ARCHIVED_QUESTIONS, classroomId };
};

export const fetchArchivedQuestions = async (classId) => {
  const request = await fetch(`/api/classes/${classId}/questions/archive`, {
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
    case GET_ARCHIVED_QUESTIONS: {
      return {
        ...state,
        archivedQuestions: action.questions,
      };
    }
    default:
      return state;
  }
}
