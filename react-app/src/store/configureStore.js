import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import thunk from "redux-thunk";
import classrooms from './classrooms';
import currentUser from './current_user';
import currentClassroomId from './current_classroom';
import currentClassroomMeta from './classroom_meta';
import enrolled from './enrolled';
import unenrolled from './unenrolled';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    classrooms,
    currentClassroomMeta,
    currentUser,
    currentClassroomId,
    enrolled,
    unenrolled,
});

const configureStore = (initialState) => {
    return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
