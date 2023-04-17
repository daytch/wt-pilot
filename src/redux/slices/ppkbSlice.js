import { createSlice } from "@reduxjs/toolkit";

export const ppkbSlice = createSlice({
  name: "PPKB",
  initialState: {
    dataHeaderPPKB: [],
    dataDetailPPKB: [],
    dataHeaderPKK: [],
    dataDetailPKK: [],
    loading: false,
    error: "",
    message: "",
    isSuccess: false,
  },
  reducers: {
    getHeaderPPKB: (state) => {
      state.loading = true;
    },
    getHeaderPPKBSuccess: (state, action) => {
      state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getHeaderPPKBFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getHeaderPPKBWeb: (state) => {
      state.loading = true;
    },
    getHeaderPPKBWebSuccess: (state, action) => {
      state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getHeaderPPKBWebFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getDetailPPKB: (state) => {
      state.loading = true;
    },
    getDetailPPKBSuccess: (state, action) => {
      state.dataDetailPPKB = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDetailPPKBFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    postDataPPKB: (state) => {
      state.loading = true;
    },
    postDataPPKBSuccess: (state, action) => {
      // state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    postDataPPKBFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    deleteDataPPKB: (state) => {
      state.loading = true;
    },
    deleteDataPPKBSuccess: (state, action) => {
      // state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    deleteDataPPKBFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    deleteDetailPPKB: (state) => {
      state.loading = true;
    },
    deleteDetailPPKBSuccess: (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    },
    deleteDetailPPKBFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getHeaderPKK: (state) => {
      state.loading = true;
    },
    getHeaderPKKSuccess: (state, action) => {
      state.dataHeaderPKK = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getHeaderPKKFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getDetailPKK: (state) => {
      state.loading = true;
    },
    getDetailPKKSuccess: (state, action) => {
      state.dataDetailPKK = action.payload.res.data;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDetailPKKFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  getHeaderPPKB,
  getHeaderPPKBSuccess,
  getHeaderPPKBFailure,
  getHeaderPPKBWeb,
  getHeaderPPKBWebSuccess,
  getHeaderPPKBWebFailure,
  getDetailPPKB,
  getDetailPPKBSuccess,
  getDetailPPKBFailure,
  postDataPPKB,
  postDataPPKBFailure,
  postDataPPKBSuccess,
  deleteDataPPKB,
  deleteDataPPKBFailure,
  deleteDataPPKBSuccess,
  deleteDetailPPKB,
  deleteDetailPPKBFailure,
  deleteDetailPPKBSuccess,
  getHeaderPKK,
  getHeaderPKKSuccess,
  getHeaderPKKFailure,
  getDetailPKK,
  getDetailPKKSuccess,
  getDetailPKKFailure,
} = ppkbSlice.actions;

export default ppkbSlice.reducer;
