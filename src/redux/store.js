import createSagaMiddleware from "redux-saga";
import authenticationSlice from "./slices/authenticationSlice";
import dashboardSlice from "./slices/dashboardSlice";
import jadwalSlice from "./slices/jadwalSlice";
import realisasiSlice from "./slices/realisasiSlice";
import ppkbSlice from "./slices/ppkbSlice";
import pnbpSlice from "./slices/pnbpSlice";
import rootSaga from "../redux/sagas/index";
import { configureStore } from "@reduxjs/toolkit";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    Authentication: authenticationSlice,
    Dashboard: dashboardSlice,
    Jadwal: jadwalSlice,
    Realisasi: realisasiSlice,
    PPKB: ppkbSlice,
    PNBP: pnbpSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export default store;
