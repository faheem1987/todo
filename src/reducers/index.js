import { combineReducers } from "redux";
import allReducers from "./reducer";

const rootReducer = combineReducers(allReducers);

export default rootReducer;
