import { combineReducers } from "redux";
import authenticationReducer from "./authenticationSlice";
import suratReducer from "./suratSlice";
import dashboardReducer from "./";

const appReducer = combineReducers({
  authenticationReducer,
  dashboardReducer,
  suratReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
