import { createSlice } from "@reduxjs/toolkit";

export const realisasiSlice = createSlice({
  name: "Realisasi",
  initialState: {
    data: [],
    loading: false,
    error: "",
    message: "",
    isSuccess: false,
  },
  reducers: {
    getDataLaporan: (state) => {
      state.loading = true;
    },
    getDataLaporanSuccess: (state, action) => {
      state.data = action.payload.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataLaporanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    selectedRow: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  getDataLaporan,
  getDataLaporanSuccess,
  getDataLaporanFailure,
  selectedRow,
} = realisasiSlice.actions;

export default realisasiSlice.reducer;
