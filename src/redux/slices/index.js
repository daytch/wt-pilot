import { combineReducers } from "redux";
import authenticationReducer from "./authenticationSlice";
import jadwalReducer from "./jadwalSlice";
import realisasiReducer from "./realisasiSlice";
import ppkbReducer from "./ppkbSlice";
import pnbpReducer from "./pnbpSlice";
import dashboardReducer from "./";

const appReducer = combineReducers({
  authenticationReducer,
  dashboardReducer,
  jadwalReducer,
  realisasiReducer,
  ppkbReducer,
  pnbpReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
