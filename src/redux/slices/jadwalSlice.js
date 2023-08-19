import { createSlice } from "@reduxjs/toolkit";

export const jadwalSlice = createSlice({
  name: "Jadwal",
  initialState: {
    data: [],
    loading: false,
    error: "",
    message: "",
    token: "",
    isSuccess: false,
  },
  reducers: {
    getDataPKKInaportnet: (state) => {
      state.loading = true;
    },
    getDataPKKInaportnetSuccess: (state, action) => {
      state.data = action.payload.res.data.length > 0
        ? action.payload.res.data
        : state.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataPKKInaportnetFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  getDataPKKInaportnet,
  getDataPKKInaportnetSuccess,
  getDataPKKInaportnetFailure,
} = jadwalSlice.actions;

export default jadwalSlice.reducer;
