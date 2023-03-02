import { createSlice } from "@reduxjs/toolkit"

export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    data: {},
    dataRegistration: {},
    isPostRegistrationSuccess: false,
    isCheckUserSuccess: false,
    isSaveUserSuccess: false,
    loading: false,
    error: "",
    reloginError: "",
    reloginMessage: "",
    message: "",
    token: "",
  },
  reducers: {
    postUserRegistration: (state) => {
      state.loading = true
    },
    postUserRegistrationSuccess: (state, action) => {
      state.dataRegistration = action.payload.data
      state.message = action.payload.message
      state.loading = false
      state.isPostRegistrationSuccess = true
    },
    postUserRegistrationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isPostRegistrationSuccess = false
    },

    checkUserRegistration: (state) => {
      state.loading = true
    },
    checkUserRegistrationSuccess: (state, action) => {
      state.dataRegistration = action.payload.data
      state.loading = false
      state.isCheckUserSuccess = true
    },
    checkUserRegistrationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isCheckUserSuccess = false
    },

    saveUserRegistration: (state) => {
      state.loading = true
    },
    saveUserRegistrationSuccess: (state, action) => {
      state.dataRegistration = action.payload.data
      state.loading = false
      state.isSaveUserSuccess = true
    },
    saveUserRegistrationFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isCheckUserSuccess = false
    },

    postLogin: (state) => {
      state.loading = true
    },
    postLoginSuccess: (state, action) => {
      state.data = action.payload.data
      state.token = action.payload.data.token
      state.error = ""
      state.message = ""
      state.reloginMessage = !action.payload.data.isLogin
        ? `Welcome back ${action.payload.data.displayUserName}`
        : ""
      state.loading = false
    },
    postLoginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.error
      state.reloginError =
        "You input wrong password, please type a correct password.."
      state.message = ""
    },

    forgotPassword: (state) => {
      state.loading = true
    },
    forgotPasswordSuccess: (state, action) => {
      state.data = action.payload.data
      state.loading = false
      state.message = "Password Berhasil diganti."
      state.error = ""
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.error
      state.message = ""
    },
  },
})

export const {
  postLogin,
  postLoginSuccess,
  postLoginFailure,
  postUserRegistration,
  postUserRegistrationFailure,
  postUserRegistrationSuccess,
  checkUserRegistration,
  checkUserRegistrationFailure,
  checkUserRegistrationSuccess,
  saveUserRegistration,
  saveUserRegistrationFailure,
  saveUserRegistrationSuccess,
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
} = authenticationSlice.actions

export default authenticationSlice.reducer
