import { all, call, put, takeEvery } from "redux-saga/effects"
import { URL } from "./../constants"

import { POST, GET } from "./../middleware/index"
import {
  getHeaderPPKBSuccess,
  getHeaderPPKBFailure,
  getHeaderPPKBWebSuccess,
  getHeaderPPKBWebFailure,
  getDetailPPKBSuccess,
  getDetailPPKBFailure,
  getHeaderPKKSuccess,
  getHeaderPKKFailure,
  getDetailPKKSuccess,
  getDetailPKKFailure,
  postDataPPKBFailure,
  postDataPPKBSuccess,
  deleteDataPPKBFailure,
  deleteDataPPKBSuccess,
  deleteDetailPPKBFailure,
  deleteDetailPPKBSuccess,
  fillComboKegiatanFailure,
  fillComboKegiatanSuccess,
  fillComboAreaPanduSuccess,
  fillComboAreaPanduFailure,
  fillComboNomorPKKTongkangSuccess,
  fillComboNomorPKKTongkangFailure,
} from "../slices/ppkbSlice"
import { isEmptyNullOrUndefined } from "../../functions"
import { history } from "../../helpers/history"

export function* getHeaderPPKB(action) {
  try {
    const res = yield call(GET, URL.GET_HEADER_PKKB + action.payload)
    if (!res) {
      yield put(
        getHeaderPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
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
      yield put(getHeaderPPKBSuccess({ data: dat }))
    }
  } catch (error) {
    yield put(getHeaderPPKBFailure({ isError: 1, message: error }))
  }
}

export function* getHeaderPPKBWeb(action) {
  try {
    const res = yield call(GET, URL.GET_HEADER_PKKB_WEB + action.payload)

    if (action.payload.indexOf("Outstanding=0") < 0) {
      if (!res || res.status !== "ok") {
        yield put(
          getHeaderPKKFailure({
            isError: 1,
            message: res.ErrorMessage,
          })
        )
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
        yield put(getHeaderPKKSuccess({ data: dat }))
      }
    } else {
      if (!res || res.status !== "ok") {
        yield put(
          getHeaderPPKBFailure({
            isError: 1,
            message: res.ErrorMessage,
          })
        )
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
        yield put(getHeaderPPKBSuccess({ data: dat }))
        // yield put(getHeaderPPKBSuccess({ res }))
      }
    }
  } catch (error) {
    yield put(getHeaderPPKBFailure({ isError: 1, message: error }))
  }
}

export function* getDetailPPKB(action) {
  try {
    const res = yield call(GET, URL.GET_DETAIL_PPKB + action.payload)

    if (!res) {
      yield put(
        getDetailPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(getDetailPPKBSuccess({ res }))
    }
  } catch (error) {
    yield put(getDetailPPKBFailure({ isError: 1, message: error }))
  }
}

export function* postDataPPKB(action) {
  try {
    const res = yield call(POST, URL.POST_PPKB_WEB + action.payload)

    if (res.status !== "ok") {
      yield put(postDataPPKBFailure({ error: "Failed when save data" }))
    } else {
      yield put(postDataPPKBSuccess({ message: "Data has been saved." }))
    }
  } catch (error) {
    yield put(postDataPPKBFailure({ isError: 1, error: error }))
  }
}

export function* deleteDataPPKB(action) {
  try {
    const res = yield call(POST, URL.DELETE_PPKB + action.payload)

    if (!res) {
      yield put(
        deleteDataPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(deleteDataPPKBSuccess({ res }))
    }
  } catch (error) {
    yield put(deleteDataPPKBFailure({ isError: 1, message: error }))
  }
}

export function* deleteDetailPPKB(action) {
  try {
    const res = yield call(POST, URL.DELETE_PPKB + action.payload)

    if (!res) {
      yield put(
        deleteDetailPPKBFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(deleteDetailPPKBSuccess({ res }))
    }
  } catch (error) {
    yield put(deleteDetailPPKBFailure({ isError: 1, message: error }))
  }
}

export function* getHeaderPKK(action) {
  try {
    const res = yield call(GET, URL.GET_HEADER_PKKB + action.payload)

    if (!res) {
      yield put(
        getDetailPKKFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(getHeaderPKKSuccess({ res }))
    }
  } catch (error) {
    yield put(getDetailPKKFailure({ isError: 1, message: error }))
  }
}

export function* getDetailPKK(action) {
  try {
    const res = yield call(GET, URL.GET_DETAIL_RKBM + action.payload)

    if (!res) {
      yield put(
        getDetailPKKFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(getDetailPKKSuccess({ res }))
    }
  } catch (error) {
    yield put(getDetailPKKFailure({ isError: 1, message: error }))
  }
}

export function* fillComboKegiatan() {
  try {
    const res = yield call(GET, URL.FILL_COMBO_KEGIATAN)

    if (!res) {
      yield put(
        fillComboKegiatanFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(fillComboKegiatanSuccess({ res }))
    }
  } catch (error) {
    yield put(fillComboKegiatanFailure({ isError: 1, message: error }))
  }
}

export function* fillComboAreaPandu(action) {
  //(strMMode, strValueSearch) {
  try {
    // debugger
    const res = yield call(
      GET,
      URL.FILL_COMBO_AREA_PANDU +
        "?MMCode=" +
        action.payload.MMCode +
        "&ValueSearch = " +
        action.payload.ValueSearch
    )

    if (!res) {
      yield put(
        fillComboAreaPanduFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      yield put(fillComboAreaPanduSuccess({ res }))
    }
  } catch (error) {
    yield put(fillComboAreaPanduFailure({ isError: 1, message: error }))
  }
}

export function* fillComboNomorPKKTongkang(action) {
  try {
    // debugger
    // console.log(action)
    const res = yield call(
      GET,
      URL.FILL_COMBO_PKK_TONGKANG +
        "?MMCode=" +
        action.payload.MMCode +
        "&NomorPKKSelected=" +
        action.payload.NomorPKKSelected +
        "&ValueSearch=" +
        action.payload.ValueSearch
    )

    if (!res) {
      yield put(
        fillComboNomorPKKTongkangFailure({
          isError: 1,
          message: res.ErrorMessage,
        })
      )
    } else {
      let r = res
      r.data = r.data.filter(
        (x) =>
          !isEmptyNullOrUndefined(x.DisplayValue) &&
          !isEmptyNullOrUndefined(x.MemberValue)
      )
      r.data.unshift({
        DisplayValue: "-Please select- ",
        MemberValue: "",
        NomorPKKSelected: "",
        TglPKK: "",
        jenis_kapal: "",
        nama_kapal_tongkang: "",
        nama_perusahaan: "",
        no_rkbm_bongkar: "",
        no_rkbm_muat: "",
      })
      yield put(fillComboNomorPKKTongkangSuccess({ res: r }))
    }
  } catch (error) {
    yield put(fillComboNomorPKKTongkangFailure({ isError: 1, message: error }))
  }
}

export default function* rootSaga() {
  yield all([
    // takeEvery("PPKB/getHeaderPPKB", getHeaderPPKB),
    takeEvery("PPKB/getHeaderPPKBWeb", getHeaderPPKBWeb),
    takeEvery("PPKB/getDetailPPKB", getDetailPPKB),
    takeEvery("PPKB/getHeaderPKK", getHeaderPKK),
    takeEvery("PPKB/getDetailPKK", getDetailPKK),
    takeEvery("PPKB/postDataPPKB", postDataPPKB),
    takeEvery("PPKB/deleteDataPPKB", deleteDataPPKB),
    takeEvery("PPKB/deleteDetailPPKB", deleteDetailPPKB),
    takeEvery("PPKB/fillComboKegiatan", fillComboKegiatan),
    takeEvery("PPKB/fillComboAreaPandu", fillComboAreaPandu),
    takeEvery("PPKB/fillComboNomorPKKTongkang", fillComboNomorPKKTongkang),
  ])
}
