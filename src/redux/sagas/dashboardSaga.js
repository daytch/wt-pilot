import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";

import { GET } from "./../middleware/index";
import {
  getDataSuccess,
  getDataFailure,
  getDataCabangFailure,
  getDataCabangSuccess,

  // getDataCabangWebFailure,
  // getDataCabangWebSuccess,

  getDataSalesOrderFailure,
  getDataSalesOrderSuccess,
  getDataRealisasiPanduFailure,
  getDataRealisasiPanduSuccess,
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
      // yield put(getDataCabangSuccess({ res }));

      // const UserData = JSON.parse(localStorage.getItem("userData"))
      // if (UserData.MMCode === "PST") {
      //   var listCabang = res.data
      //   listCabang.unshift({ FullName: "Please Select", MMCode: "" })
      //   yield put(getDataCabangSuccess({ res: { data: listCabang } }))
      // } else {
        yield put(getDataCabangSuccess({ res }))
      // }
    }

    // }
  } catch (error) {
    yield put(getDataCabangFailure({ isError: 1, message: error }));
  }
}

export function* getDataCabangWeb() {
  try {
    const res = yield call(GET, URL.GET_CABANG_WEB);

    if (!res) {
      yield put(
        getDataCabangwebFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataCabangwebSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataCabangwebFailure({ isError: 1, message: error }));
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

export function* getDataRealisasiPandu(action) {
  try {
    const res = yield call(
      GET,
      URL.REALISASI_PANDU + "?DariPihak=" + action.payload
    );

    if (!res) {
      yield put(
        getDataRealisasiPanduFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      );
    } else {
      yield put(getDataRealisasiPanduSuccess({ res }));
    }
  } catch (error) {
    yield put(getDataRealisasiPanduFailure({ isError: 1, message: error }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery("Dashboard/getData", getData)]);
  yield all([takeEvery("Dashboard/getDataCabang", getDataCabang)]);
  yield all([takeEvery("Dashboard/getDataSalesOrder", getDataSalesOrder)]);
  yield all([
    takeEvery("Dashboard/getDataRealisasiPandu", getDataRealisasiPandu),
  ]);
}
