import { combineReducers } from "redux";
import authenticationReducer from "./authenticationSlice";
import jadwalReducer from "./jadwalSlice";
import dashboardReducer from "./";

const appReducer = combineReducers({
  authenticationReducer,
  dashboardReducer,
  jadwalReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
