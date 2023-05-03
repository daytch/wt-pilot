import { createSlice } from "@reduxjs/toolkit";

export const pnbpSlice = createSlice({
  name: "PNBP",
  initialState: {
    data: [],
    loading: false,
    error: "",
    message: "",
    token: "",
    isSuccess: false,
  },
  reducers: {
    getReportPNBP: (state) => {
      state.loading = true;
    },
    getReportPNBPSuccess: (state, action) => {
      state.data = action.payload.res.datadetail;
      state.message = action.payload.message;
      state.loading = false;
    },
    getReportPNBPFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { getReportPNBP, getReportPNBPSuccess, getReportPNBPFailure } =
  pnbpSlice.actions;

export default pnbpSlice.reducer;
