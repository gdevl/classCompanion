import { createStore, combineReducers, compose } from 'redux';
import classrooms from './classrooms';
import currentUser from './current_user';
import currentClassroomId from './current_classroom';
import currentClassroomMeta from './classroom_meta';
import groups from './groups';
import roster from './roster';
import questions from './questions';
import question from './question';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    classrooms,
    currentClassroomMeta,
    currentUser,
    currentClassroomId,
    groups,
    question,
    questions,
    roster,
});

const configureStore = (initialState) => {
    return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
