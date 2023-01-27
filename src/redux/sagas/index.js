import { all } from "redux-saga/effects";
import Authentication from "./authenticationSaga";
import Dashboard from "./dashboardSaga";
import Jadwal from "./jadwalSaga";
export default function* rootSaga() {
  yield all([Authentication(), Dashboard(), Jadwal()]);
}
