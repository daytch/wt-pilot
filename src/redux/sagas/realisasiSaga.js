import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { POST, GET } from "./../middleware/index";
import {
  getDataLaporanFailure,
  getDataLaporanSuccess,
} from "../slices/realisasiSlice";
import { history } from "../../helpers/history";

export function* getDataLaporan(action) {
  try {
    const res = yield call(GET, URL.LAPORAN_KEGIATAN_PANDU + action.payload);
 
    if (!res) {
      yield put(
        getDataLaporanFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataLaporanSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataLaporanFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("Realisasi/getDataLaporan", getDataLaporan)]);
}
