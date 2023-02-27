import { all, call, put, takeEvery } from "redux-saga/effects";
import { URL } from "./../constants";
import { isEmptyNullOrUndefined } from "../../functions/index";
import { POST } from "./../middleware/index";
import {
  postLoginFailure,
  postLoginSuccess,
  postCaptchaSuccess,
  postCaptchaFailure,
  postChangePasswordFailure,
  postChangePasswordSuccess,
} from "../slices/authenticationSlice";
import { history } from "../../helpers/history";

export function* postLogin(action) {
  try {
    const data = action.payload;
    
    const res = yield call(POST, URL.LOGIN, data);

    if (isEmptyNullOrUndefined(res.token)) {
      yield put(
        postLoginFailure({
          error: "Email atau Password anda tidak sesuai, mohon cek kembali.",
        })
      );
    }
    // else if (res.message !== "User Found") {
    //   yield put(postLoginFailure({ error: res.message }));
    // }
    else {
      let user = res.user[0];
      user.token = res.token;
      localStorage.setItem("expires_in", res.expires_in);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(user));

      yield put(postLoginSuccess({ data: user }));
      const { from } = history.location.state || { from: { pathname: "/" } };
    }
  } catch (error) {
    yield put(postLoginFailure({ isError: 1, message: error }));
  }
}

export function* postCapcay(action) {
  try {
    const data = action.payload;
    const res = yield call(POST, URL.CAPTCHA, data);

    if (!res && res.ErrorCode > 0) {
      yield put(
        postCaptchaFailure({
          isError: 1,
          message: res.message ? res.message : res.statusText,
        })
      );
    } else {
      yield put(postCaptchaSuccess({ data: res.Data }));
    }
  } catch (error) {
    yield put(postCaptchaFailure({ isError: 1, message: error }));
  }
}

export function* postChangePassword(action) {
  try {
    const res = yield call(POST, URL.CHANGE_PASSWORD, action.payload);

    if (res.message.toLowerCase().indexOf("success") === -1) {
      yield put(
        postChangePasswordFailure({
          isError: 1,
          message: res.message,
        })
      );
    } else {
      yield put(postChangePasswordSuccess({ res }));
    }
  } catch (error) {
    yield put(postChangePasswordFailure({ isError: 1, error: error }));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery("Authentication/postLogin", postLogin),
    takeEvery("Authentication/postChangePassword", postChangePassword),
    takeEvery("Authentication/postCaptcha", postCapcay),
  ]);
}
