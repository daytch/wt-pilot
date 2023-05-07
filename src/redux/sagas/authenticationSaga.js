import { all, call, put, takeEvery } from "redux-saga/effects"
import { URL } from "./../constants"
import { isEmptyNullOrUndefined } from "../../functions/index"
import { POST, POSTRegistrasion } from "./../middleware/index"
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

    var fmData = new FormData()
    fmData.append("UserId", data.UserId)
    const res = yield call(POSTRegistrasion, URL.REGISTER, fmData)

    if (!res && res.data.length < 1) {
      yield put(postUserRegistrationFailure({ error: "UserId tidak ada" }))
    } else {
      // 2
      var fData = new FormData()
      fData.append("UserId", data.UserId)
      fData.append("Email", data.Email)
      const res1 = yield call(
        POSTRegistrasion,
        URL.CHECK_USER_REGISTRASION,
        fData
      )
      if (res1.data.status === "ok") {
        // if (res1.data.data.length === 0) {
          var dataComplete = new FormData()
          dataComplete.append("UserId", data.UserId)
          dataComplete.append("Email", data.Email)
          dataComplete.append("Handphone", data.NoHP)
          dataComplete.append("Password", data.Password ? data.Password : "")
          const responseSave = yield call(
            POSTRegistrasion,
            URL.SAVE_USER_REGISTRASION,
            dataComplete
          )
          if (responseSave.data.status === "ok") {
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
        // } else {
        //   yield put(
        //     postUserRegistrationFailure({
        //       error: "Email sudah digunakan.",
        //     })
        //   )
        // }
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
