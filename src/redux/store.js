import createSagaMiddleware from "redux-saga";
import authenticationSlice from "./slices/authenticationSlice";
import dashboardSlice from "./slices/dashboardSlice";
import suratSlice from "./slices/suratSlice";
import rootSaga from "../redux/sagas/index";
import { configureStore } from "@reduxjs/toolkit";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    Authentication: authenticationSlice,
    Dashboard: dashboardSlice,
    Surat: suratSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
