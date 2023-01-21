import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    data: {},
    loading: false,
    error: "",
    message: "",
    token: "",
  },
  reducers: {
    postCaptcha: (state) => {
      state.loading = true;
    },
    postCaptchaSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    postCaptchaFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    postLogin: (state) => {
      state.loading = true;
    },
    postLoginSuccess: (state, action) => {
      state.data = action.payload.data;
      state.token = action.payload.data.token;
      state.error = "";
      state.message = "berhasil login";
      state.loading = false;
    },
    postLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = "";
    },

    postChangePassword: (state) => {
      state.loading = true;
    },
    postChangePasswordSuccess: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
      state.message = "Password Berhasil diganti.";
      state.error = "";
    },
    postChangePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
      state.message = "";
    },
  },
});

export const {
  postLogin,
  postLoginSuccess,
  postLoginFailure,
  postCaptcha,
  postCaptchaFailure,
  postCaptchaSuccess,
  postChangePassword,
  postChangePasswordFailure,
  postChangePasswordSuccess,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
