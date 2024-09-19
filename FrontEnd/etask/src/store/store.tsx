// store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import gitReducer from "../reducers/gitReducer";

const rootReducer = combineReducers({
git:gitReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;