import { all, call, put, takeEvery } from "redux-saga/effects"
import { URL } from "./../constants"
import { isEmptyNullOrUndefined } from "../../functions/index"
import { POST } from "./../middleware/index"
import {
  postLoginFailure,
  postLoginSuccess,
  postUserRegistrationSuccess,
  postUserRegistrationFailure,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  resetPasswordFailure,
  resetPasswordSuccess,
} from "../slices/authenticationSlice"
import { history } from "../../helpers/history"

export function* postLogin(action) {
  try {
    const data = action.payload

    const res = yield call(POST, URL.LOGIN, data)

    if (isEmptyNullOrUndefined(res.token)) {
      yield put(
        postLoginFailure({
          error: "Email atau Password anda tidak sesuai, mohon cek kembali.",
        })
      )
    } else {
      let user = res.user[0]
      user.token = res.token
      user.isLogin = true
      
      user.MMCode = user.MMCode.replace(/\s/g, '')
      user.UserId = user.UserId.replace(/\s/g, '')

      localStorage.setItem("expires_in", res.expires_in)
      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(user))

      yield put(postLoginSuccess({ data: user }))
      const { from } = history.location.state || { from: { pathname: "/" } }
    }
  } catch (error) {
    yield put(postLoginFailure({ isError: 1, message: error }))
  }
}

export function* postUserRegistration(action) {
  try {
    const data = action.payload

    const fmData = new FormData()
    fmData.append("UserId", data.UserId)
    const res = yield call(POST, URL.REGISTER, fmData)

    if (!res && res.data.length < 1) {
      yield put(
        postUserRegistrationFailure({
          isError: 1,
          message: "UserId tidak ada",
        })
      );
    } else {
      yield put(forgotPasswordFailure({ message: "Data kosong" }))
    }
  } catch (error) {
    yield put(forgotPasswordFailure({ message: error }))
  }
}

export function* resetPassword(action) {
  try {
    const data = action.payload
    const res = yield call(POST, URL.RESET_PASSWORD, data)

    if (res.data?.length > 0) {
      yield put(resetPasswordSuccess({ message: "Berhasil ganti password" }))
    } else {
      yield put(resetPasswordFailure({ message: "Gagal" }))
    }
  } catch (error) {
    yield put(resetPasswordFailure({ message: error }))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("Authentication/postLogin", postLogin),
    // takeEvery("Authentication/forgotPassword", forgotPassword),
    takeEvery("Authentication/resetPassword", resetPassword),
    takeEvery("Authentication/postUserRegistration", postUserRegistration),
  ])
}
