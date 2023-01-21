import { all } from "redux-saga/effects";
import Authentication from "./authenticationSaga";
import Dashboard from "./dashboardSaga";
import Surat from "./suratSaga";

export default function* rootSaga() {
  yield all([Authentication(), Dashboard(), Surat()]);
}
