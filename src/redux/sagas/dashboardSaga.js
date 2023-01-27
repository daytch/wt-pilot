import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { GET } from "./../middleware/index";
import {
  getDataSuccess,
  getDataFailure,
  getDataCabangFailure,
  getDataCabangSuccess,
  getDataSalesOrderFailure,
  getDataSalesOrderSuccess,
} from "../slices/dashboardSlice";

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

export function* getDataCabang() {
  try {
    const res = yield call(GET, URL.GET_CABANG);

    if (!res) {
      yield put(
        getDataCabangFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataCabangSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataCabangaFailure({ isError: 1, message: error }));
  }
}

export function* getDataSalesOrder(action) {
  try {
    const res = yield call(
      GET,
      URL.SALESORDER + "?DariPihak=" + action.payload
    );

    if (!res) {
      yield put(
        getDataSalesOrderFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataSalesOrderSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataSalesOrderFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("Dashboard/getData", getData)]);
  yield all([takeEvery("Dashboard/getDataCabang", getDataCabang)]);
  yield all([takeEvery("Dashboard/getDataSalesOrder", getDataSalesOrder)]);
}
