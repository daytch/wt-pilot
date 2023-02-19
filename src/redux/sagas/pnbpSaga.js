import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { POST, GET } from "./../middleware/index";
import {
  getReportPNBPFailure,
  getReportPNBPSuccess,
} from "../slices/pnbpSlice";
import { history } from "../../helpers/history";

export function* getReportPNBP(action) {
  try {
    const res = yield call(GET, URL.GET_PNBP_REPORT + action.payload);
 
    if (!res) {
      yield put(
        getReportPNBPFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getReportPNBPSuccess({ res }));
    }
  } catch (error) {
    yield put(getReportPNBPFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("PNBP/getReportPNBP", getReportPNBP)]);
}
