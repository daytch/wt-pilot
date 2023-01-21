import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { GET } from "./../middleware/index";
import { getDataSuccess, getDataFailure } from "../slices/dashboardSlice";

export function* getData() {
  try {
    const res = yield call(GET, URL.DASHBOARD);
    
    if (!res) {
      yield put(
        getDataFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("Dashboard/getData", getData)]);
}
