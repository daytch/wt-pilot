import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { POST, GET } from "./../middleware/index";
import {
  getDataPKKInaportnetFailure,
  getDataPKKInaportnetSuccess,
} from "../slices/jadwalSlice";
import { history } from "../../helpers/history";

export function* getDataPKKInaportnet(action) {
  try {
    const res = yield call(GET, URL.PKK_INAPORTNET + action.payload);
 
    if (!res) {
      yield put(
        getDataPKKInaportnetFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      let dat = []
      if (res.data.length > 0) {
        dat = res.data.map((item, idx) => {
          let i = { ...item }
          i.isSelected = idx < 1
          i.idx = idx
          return i
        })
      }
      yield put(getDataPKKInaportnetSuccess({ data: dat }));
    }
  } catch (error) {
    yield put(getDataPKKInaportnetFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("Jadwal/getDataPKKInaportnet", getDataPKKInaportnet)]);
}
