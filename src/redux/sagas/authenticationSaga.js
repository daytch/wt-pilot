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
      )
    } else {
      const resData = res.data[0]
      let text = resData.Email
      let result = text ? text.replace(/^\s+|\s+$/gm, "") : ""

      if (isEmptyNullOrUndefined(result)) {
        const dataPayload = new FormData()
        dataPayload.append("UserId", data.UserId)
        dataPayload.append("Email", data.Email)

        const resCheck = yield call(
          POST,
          URL.CHECK_USER_REGISTRASION,
          dataPayload
        )

        if (resCheck.data?.length < 1) {
          const data3 = new FormData()
          data3.append("UserId", data.UserId)
          data3.append("Email", data.Email)
          data3.append("Handphone", data.NoHP)
          data3.append("Password", "")

          const resSave = yield call(POST, URL.SAVE_USER_REGISTRASION, data3)

          if (!resSave && resSave.data.length < 1) {
            yield put(
              postUserRegistrationFailure({
                isError: 1,
                message: "Gagal Registrasi",
              })
            )
          } else {
            yield put(
              postUserRegistrationSuccess({
                message: "Link sudah terkirim ke email " + resSave.data[0].Info,
              })
            )
          }
        } else {
          yield put(
            postUserRegistrationFailure({
              isError: 1,
              message: "Email sudah digunakan",
            })
          )
        }
      } else {
        yield put(
          postUserRegistrationFailure({
            isError: 1,
            message: "Akun sudah terdaftar",
          })
        )
      }
    }
  } catch (error) {
    yield put(postUserRegistrationFailure({ isError: 1, message: error }))
  }
}

export function* forgotPassword(action) {
  try {
    const data = action.payload
debugger
    const fmData = new FormData()
    fmData.append("UserId", data.userId)
    fmData.append("Email", data.email)
    const res = yield call(POST, URL.REGISTER, fmData)

    if (res.data?.length > 0) {
      const resData = res.data[0]
      let text = resData.Email
      let result = text ? text.replace(/^\s+|\s+$/gm, "") : ""

      if (!isEmptyNullOrUndefined(result)) {
        const resForgot = yield call(
          GET,
          URL.FORGOT + `?userid=${data.UserId}&email=${text}`
        )

        yield put(forgotPasswordSuccess({ resForgot }))
      } else {
        yield put(forgotPasswordFailure({ message: "Email kosong" }))
      }
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
    takeEvery("Authentication/forgotPassword", forgotPassword),
    takeEvery("Authentication/resetPassword", resetPassword),
    takeEvery("Authentication/postUserRegistration", postUserRegistration),
  ])
}
