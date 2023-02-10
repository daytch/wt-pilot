import { all } from "redux-saga/effects";
import Authentication from "./authenticationSaga";
import Dashboard from "./dashboardSaga";
import Jadwal from "./jadwalSaga";
import Realisasi from "./realisasiSaga";
import PPKB from "./ppkbSaga";
export default function* rootSaga() {
  yield all([Authentication(), Dashboard(), Jadwal(), Realisasi(), PPKB()]);
}
