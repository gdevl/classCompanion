import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
// import store from "./users";
import questions from "./questions";
import classrooms from "./classrooms";
import groups from "./groups";
import currentUser from "./current_user";
import currentClassroom from "./current_classroom";
// import archivedQuestions from "./archived_questions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  //   archivedQuestions,
  classrooms,
  currentUser,
  currentClassroom,
  groups,
  questions,
  //   store,
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
