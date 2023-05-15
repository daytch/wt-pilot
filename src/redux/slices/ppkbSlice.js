import { createSlice } from "@reduxjs/toolkit"

export const ppkbSlice = createSlice({
  name: "PPKB",
  initialState: {
    dataHeaderPPKB: [],
    dataDetailPPKB: [],
    dataHeaderPKK: [],
    dataDetailPKK: [],
    fillcombokegiatan: [],
    fillComboAreaPandu: [],
    fillComboNomorPKKTongkang: [],
    loading: false,
    error: "",
    message: "",
    isSuccess: false,
  },
  reducers: {
    selectedRowHeaderPPKB: (state, action) => {
      state.dataHeaderPPKB = action.payload
    },
    selectedRowHeaderPPK: (state, action) => {
      state.dataHeaderPKK = action.payload
    },
    resetDataDetailPPK: (state) => {
      state.dataDetailPKK = []
    },
    resetDataDetailPPKB: (state) => {
      state.dataDetailPPKB = []
    },

    getHeaderPPKB: (state) => {
      state.loading = true
    },
    getHeaderPPKBSuccess: (state, action) => {
      state.dataHeaderPPKB = action.payload.data
      state.message = action.payload.message
      state.loading = false
      // state.isSuccess = true
    },
    getHeaderPPKBFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      // state.isSuccess = false
    },

    getHeaderPPKBWeb: (state) => {
      state.loading = true
    },
    getHeaderPPKBWebSuccess: (state, action) => {
      state.dataHeaderPPKB = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      // state.isSuccess = true
    },
    getHeaderPPKBWebFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      // state.isSuccess = false
    },

    getDetailPPKB: (state) => {
      state.loading = true
    },
    getDetailPPKBSuccess: (state, action) => {
      state.dataDetailPPKB = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      // state.isSuccess = true
    },
    getDetailPPKBFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      // state.isSuccess = false
    },

    postDataPPKB: (state) => {
      state.loading = true
    },
    postDataPPKBSuccess: (state, action) => {
      // state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    postDataPPKBFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.error
      state.isSuccess = false
    },

    deleteDataPPKB: (state) => {
      state.loading = true
    },
    deleteDataPPKBSuccess: (state, action) => {
      // state.dataHeaderPPKB = action.payload.res.data;
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    deleteDataPPKBFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    deleteDetailPPKB: (state) => {
      state.loading = true
    },
    deleteDetailPPKBSuccess: (state, action) => {
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    deleteDetailPPKBFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    getHeaderPKK: (state) => {
      state.loading = true
    },
    getHeaderPKKSuccess: (state, action) => {
      state.dataHeaderPKK = action.payload.data
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    getHeaderPKKFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    getDetailPKK: (state) => {
      state.loading = true
    },
    getDetailPKKSuccess: (state, action) => {
      state.dataDetailPKK = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    getDetailPKKFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    fillComboKegiatan: (state) => {
      state.loading = true
    },
    fillComboKegiatanSuccess: (state, action) => {
      
      state.fillComboKegiatan = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    fillComboKegiatanFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    fillComboAreaPandu: (state) => {
      state.loading = true
    },
    fillComboAreaPanduSuccess: (state, action) => {
      
      state.fillComboAreaPandu = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    fillComboAreaPanduFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

    fillComboNomorPKKTongkang: (state) => {
      state.loading = true
    },
    fillComboNomorPKKTongkangSuccess: (state, action) => {
      
      state.fillComboNomorPKKTongkang = action.payload.res.data
      state.message = action.payload.message
      state.loading = false
      state.isSuccess = true
    },
    fillComboNomorPKKTongkangFailure: (state, action) => {
      state.loading = false
      state.error = action.payload.message
      state.isSuccess = false
    },

  },
})

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

  selectedRowHeaderPPKB,
  selectedRowHeaderPPK,
  resetDataDetailPPKB,
  resetDataDetailPPK,

  fillComboKegiatan,
  fillComboKegiatanSuccess,
  fillComboKegiatanFailure,

  fillComboAreaPandu,
  fillComboAreaPanduSuccess,
  fillComboAreaPanduFailure,

  fillComboNomorPKKTongkang,
  fillComboNomorPKKTongkangSuccess,
  fillComboNomorPKKTongkangFailure,

} = ppkbSlice.actions

export default ppkbSlice.reducer
