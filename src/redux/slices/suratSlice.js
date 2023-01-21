import { createSlice } from "@reduxjs/toolkit";

export const suratSlice = createSlice({
  name: "Surat",
  initialState: {
    data: {},
    inbox: [],
    outbox: [],
    tracking: {},
    laporan: [],
    loading: false,
    error: "",
    message: "",
    token: "",
    isSuccess: false,
  },
  reducers: {
    postSubmitSurat: (state) => {
      state.loading = true;
      state.message = "";
    },
    postSubmitSuratSuccess: (state, action) => {
      state.data = action.payload.data;
      state.message = "Data berhasil di save";
      state.error = "";
      state.loading = false;
    },
    postSubmitSuratFailure: (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = "Data gagal disimpan.";
      state.message = "";
    },

    postSelfService: (state) => {
      state.loading = true;
      state.message = "";
    },
    postSelfServiceSuccess: (state, action) => {
      let data = action.payload.res.data;
      state.data = data;
      state.message =
        "Data berhasil di save. Silahkan simpan no surat anda: " +
        data.no_surat;
      state.error = "";
      state.loading = false;
    },
    postSelfServiceFailure: (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = "Data gagal di simpan.";
      state.message = "";
    },

    postActionSurat: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    postActionSuratSuccess: (state, action) => {
      state.data = action.payload.data;
      state.message = "Data berhasil di save";
      state.error = "";
      state.loading = false;
      state.isSuccess = true;
    },
    postActionSuratFailure: (state, action) => {
      state.loading = false;
      state.message = "";
      state.error = "Data gagal di save";
      state.isSuccess = false;
    },

    getTracking: (state) => {
      state.loading = true;
    },
    getTrackingSuccess: (state, action) => {
      state.tracking = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getTrackingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getInbox: (state) => {
      state.loading = true;
    },
    getInboxSuccess: (state, action) => {
      state.inbox = action.payload.res;
      // state.message = action.payload.message;
      state.loading = false;
    },
    getInboxFailure: (state, action) => {
      state.loading = false;
      // state.error = action.payload.message;
    },

    getOutbox: (state) => {
      state.loading = true;
    },
    getOutboxSuccess: (state, action) => {
      state.outbox = action.payload.res;
      state.message = action.payload.res.message;
      state.loading = false;
    },
    getOutboxFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getReport: (state) => {
      state.loading = true;
    },
    getReportSuccess: (state, action) => {
      state.inbox = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  postSubmitSurat,
  postSubmitSuratFailure,
  postSubmitSuratSuccess,
  postSelfService,
  postSelfServiceFailure,
  postSelfServiceSuccess,
  postActionSurat,
  postActionSuratFailure,
  postActionSuratSuccess,
  getInbox,
  getInboxSuccess,
  getInboxFailure,
  getOutbox,
  getOutboxSuccess,
  getOutboxFailure,
  getTracking,
  getTrackingSuccess,
  getTrackingFailure,
  getReport,
  getReportSuccess,
  getReportFailure,
} = suratSlice.actions;

export default suratSlice.reducer;
