import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import thunk from "redux-thunk";
import classrooms from './classrooms';
import currentUser from './current_user';
import currentClassroomId from './current_classroom';
import currentClassroomMeta from './classroom_meta';
import roster from './roster';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    classrooms,
    currentClassroomMeta,
    currentUser,
    currentClassroomId,
    roster,
});

const configureStore = (initialState) => {
    return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
