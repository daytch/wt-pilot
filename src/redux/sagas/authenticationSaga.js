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

      user.MMCode = user.MMCode.replace(/\s/g, "")
      user.UserId = user.UserId.replace(/\s/g, "")

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

// 1
export function* postUserRegistration(action) {
  try {
    const data = action.payload

    const fmData = new FormData()
    fmData.append("UserId", data.UserId)
    const res = yield call(POST, URL.REGISTER, fmData)

    if (!res && res.data.length < 1) {
      yield put(postUserRegistrationFailure({ error: "UserId tidak ada" }))
    } else {
      // 2
      const fData = new FormData()
      fData.append("UserId", data.UserId)
      fData.append("Email", data.Email)
      const res1 = yield call(POST, URL.CHECK_USER_REGISTRASION, fData)
      if (res1.data.status === "ok") {
        const data3 = new FormData()
        data3.append("UserId", data.UserId)
        data3.append("Email", data.Email)
        data3.append("Handphone", data.NoHP)
        data3.append("Password", data.Password ? data.Password : "")
        const res2 = call(POST, URL.SAVE_USER_REGISTRASION, data3)
        if (res2.data.status === "ok") {
          yield put(
            postUserRegistrationSuccess({
              message: "Link sudah terkirim ke email",
            })
          )
        } else {
          yield put(
            postUserRegistrationFailure({
              error: "Gagal submit data registrasi.",
            })
          )
        }
      } else {
        yield put(
          postUserRegistrationFailure({
            error: "Gagal check data user registrasi.",
          })
        )
      }
    }
  } catch (error) {
    yield put(postUserRegistrationFailure({ error: error }))
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
