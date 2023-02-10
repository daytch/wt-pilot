import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { POST, GET } from "./../middleware/index";
import {
  getHeaderPPKBSuccess,
  getHeaderPPKBFailure,
  getDetailPPKBSuccess,
  getDetailPPKBFailure,
  getHeaderPKKSuccess,
  getHeaderPKKFailure,
  getDetailPKKSuccess,
  getDetailPKKFailure,
} from "../slices/ppkbSlice";
import { history } from "../../helpers/history";

export function* getHeaderPPKB(action) {
  try {
    const res = yield call(GET, URL.GET_HEADER_PKKB + action.payload);
    
    if (!res) {
      yield put(
        getHeaderPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getHeaderPPKBSuccess({ res }));
    }
  } catch (error) {
    yield put(getHeaderPPKBFailure({ isError: 1, message: error }));
  }
}

export function* getDetailPPKB(action) {
  try {
    const res = yield call(GET, URL.GET_DETAIL_RKBM + action.payload);

    if (!res) {
      yield put(
        getDetailPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDetailPPKBSuccess({ res }));
    }
  } catch (error) {
    yield put(getDetailPPKBFailure({ isError: 1, message: error }));
  }
}

export function* getHeaderPKK(action) {
  try {
    const res = yield call(GET, URL.GET_HEADER_PKKB + action.payload);

    if (!res) {
      yield put(
        getDetailPKKFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getHeaderPKKSuccess({ res }));
    }
  } catch (error) {
    yield put(getDetailPKKFailure({ isError: 1, message: error }));
  }
}

export function* getDetailPKK(action) {
  try {
    const res = yield call(GET, URL.GET_DETAIL_RKBM + action.payload);

    if (!res) {
      yield put(
        getDetailPKKFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDetailPKKSuccess({ res }));
    }
  } catch (error) {
    yield put(getDetailPKKFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("PPKB/getHeaderPPKB", getHeaderPPKB),
    takeEvery("PPKB/getDetailPPKB", getDetailPPKB),
    takeEvery("PPKB/getHeaderPKK", getHeaderPKK),
    takeEvery("PPKB/getDetailPKK", getDetailPKK),
  ]);
}
