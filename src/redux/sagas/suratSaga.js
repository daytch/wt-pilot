import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { POST, GET } from "./../middleware/index";
import {
  postSubmitSuratFailure,
  postSubmitSuratSuccess,
  postSelfServiceFailure,
  postSelfServiceSuccess,
  postActionSuratFailure,
  postActionSuratSuccess,
  getInboxFailure,
  getInboxSuccess,
  getOutboxSuccess,
  getOutboxFailure,
  getTrackingSuccess,
  getTrackingFailure,
  getReportSuccess,
  getReportFailure,
} from "../slices/suratSlice";
import { history } from "../../helpers/history";

export function* postSubmitSurat(action) {
  try {
    const data = action.payload;
    const res = yield call(POST, URL.POST_MAIL, data);

    if (res.message.toLowerCase().indexOf("success") === -1) {
      yield put(
        postSubmitSuratFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(postSubmitSuratSuccess({ res }));
    }
  } catch (error) {
    yield put(postSubmitSuratFailure({ isError: 1, message: error }));
  }
}

export function* postSelfService(action) {
  try {
    const data = action.payload;
    const res = yield call(POST, URL.SELFSERVICE, data);

    if (res.message.toLowerCase().indexOf("success") === -1) {
      yield put(
        postSelfServiceFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(postSelfServiceSuccess({ res }));
    }
  } catch (error) {
    yield put(postSelfServiceFailure({ isError: 1, message: error }));
  }
}

export function* postActionSurat(action) {
  try {
    const data = action.payload;
    const res = yield call(POST, URL.ACTION_MAIL, data);
    
    if (!res.isSuccess) {
      yield put(
        postActionSuratFailure({
          isError: 1,
          error: res.message,
        })
      );
    } else {
      yield put(postActionSuratSuccess({ res }));
    }
  } catch (error) {
    yield put(postActionSuratFailure({ isError: 1, message: error }));
  }
}

export function* getInbox() {
  try {
    const res = yield call(GET, URL.GET_INBOX);

    if (!res) {
      yield put(
        getInboxFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getInboxSuccess({ res }));
    }
  } catch (error) {
    yield put(getInboxFailure({ isError: 1, message: error }));
  }
}

export function* getOutbox() {
  try {
    const res = yield call(GET, URL.GET_OUTBOX);

    if (!res) {
      yield put(
        getOutboxFailure({
          isError: 1,
          message: res.message,
        })
      );
    } else {
      yield put(getOutboxSuccess({ res }));
    }
  } catch (error) {
    yield put(getOutboxFailure({ isError: 1, message: error }));
  }
}

export function* getTracking(action) {
  try {
    const res = yield call(GET, URL.TRACKING + "?no_surat=" + action.payload);

    if (!res) {
      yield put(
        getTrackingFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getTrackingSuccess({ res }));
    }
  } catch (error) {
    yield put(getTrackingFailure({ isError: 1, message: error }));
  }
}

export function* getReport() {
  try {
    const res = yield call(GET, URL.LAPORAN);

    if (!res) {
      yield put(
        getReportFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getReportSuccess({ res }));
    }
  } catch (error) {
    yield put(getReportFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("Surat/postSubmitSurat", postSubmitSurat),
    takeEvery("Surat/postSelfService", postSelfService),
    takeEvery("Surat/postActionSurat", postActionSurat),
    takeEvery("Surat/getInbox", getInbox),
    takeEvery("Surat/getOutbox", getOutbox),
    takeEvery("Surat/getTracking", getTracking),
    takeEvery("Surat/getReport", getReport),
  ]);
}
