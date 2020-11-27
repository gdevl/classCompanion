import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import store from "./users";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  store,
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;
