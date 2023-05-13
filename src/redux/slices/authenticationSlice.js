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
    errorCount: 0,
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
      state.errorCount = state.errorCount + 1
    },

    forgotPassword: (state) => {
      state.loading = true
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload.resForgot.message
      state.error = ""
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.message = ""
    },

    resetPassword: (state) => {
      state.loading = true
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false
      state.message = action.payload.message
      state.error = ""
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
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
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
} = authenticationSlice.actions

export default authenticationSlice.reducer
