import { createSlice } from "@reduxjs/toolkit";
import { isObjectEmpty } from "./../../functions/index";

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const activeMenu = JSON.parse(localStorage.getItem("activeMenu"));
const activeTabMenu = JSON.parse(localStorage.getItem("activeTabMenu"));
export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: {
    activeSidebarMenu: isObjectEmpty(activeMenu)
      ? {
          dashboard: true,
          jadwal: false,
          ppkb: false,
          realisasi: false,
        }
      : activeMenu,
    activeTabMenu: isObjectEmpty(activeTabMenu)
      ? {
          dashboard: true,
          jadwal: false,
          ppkb: false,
          realisasi: false,
        }
      : activeTabMenu,
    loading: false,
    data: {
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    },
    dt: {
      suratmasuk: { detail: [], total: 0 },
      suratproses: { detail: [], total: 0 },
      suratselesai: { detail: [], total: 0 },
    },
    dataCabang: [],
    dataSalesOrder: [],
    dataRealisasiPandu: [],
  },
  reducers: {
    changeActiveSidebarMenu: (state, action) => {
      state.activeSidebarMenu = action.payload;
      localStorage.setItem("activeMenu", JSON.stringify(action.payload));
    },

    changeActiveTabMenu: (state, action) => {
      state.activeTabMenu = action.payload;
      localStorage.setItem("activeTabMenu", JSON.stringify(action.payload));
    },

    toogleLoading: (state, action) => {
      state.loading = action.payload;
    },

    getData: (state) => {
      state.loading = true;
    },
    getDataSuccess: (state, action) => {
      let dt = action.payload.res;
      let lbl = dt.suratmasuk.detail.map((x) => x.periode);
      let dtMasuk = dt.suratmasuk.detail.map((x) => x.total);
      let dtProses = dt.suratproses.detail.map((x) => x.total);
      let dtSelesai = dt.suratselesai.detail.map((x) => x.total);
      let dtFix = {
        labels: lbl,
        datasets: [
          {
            label: "Surat Masuk",
            data: dtMasuk,
            backgroundColor: "rgba(13, 238, 46, 0.2)",
            borderColor: "rgba(13, 238, 46, 1)",
            borderWidth: 1,
          },
          {
            label: "Surat di Proses",
            data: dtProses,
            backgroundColor: "rgba(18, 13, 238, 0.2)",
            borderColor: "rgba(18, 13, 238, 1)",
            borderWidth: 1,
          },
          {
            label: "Surat di Balas",
            data: dtSelesai,
            backgroundColor: "rgba(245, 12, 41, 0.3)",
            borderColor: "rgba(245, 12, 41, 1)",
            borderWidth: 1,
          },
        ],
      };
      state.data = dtFix;
      state.dt = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getDataCabang: (state) => {
      state.loading = true;
    },
    getDataCabangSuccess: (state, action) => {
      let dt = action.payload.res;
      state.dataCabang = dt.data;
      state.dt = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataCabangFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getDataSalesOrder: (state) => {
      state.loading = true;
    },
    getDataSalesOrderSuccess: (state, action) => {
      let dt = action.payload.res;
      state.dataSalesOrder = dt.data;
      state.dt = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataSalesOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    getDataRealisasiPandu: (state) => {
      state.loading = true;
    },
    getDataRealisasiPanduSuccess: (state, action) => {
      let dt = action.payload.res;
      state.dataRealisasiPandu = dt.data;
      state.dt = action.payload.res;
      state.message = action.payload.message;
      state.loading = false;
    },
    getDataRealisasiPanduFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  changeActiveSidebarMenu,
  changeActiveTabMenu,
  toogleLoading,
  getData,
  getDataSuccess,
  getDataFailure,
  getDataCabang,
  getDataCabangFailure,
  getDataCabangSuccess,

  getDataCabangWeb,
  getDataCabangWebFailure,
  getDataCabangWebSuccess,

  getDataSalesOrder,
  getDataSalesOrderFailure,
  getDataSalesOrderSuccess,
  getDataRealisasiPandu,
  getDataRealisasiPanduFailure,
  getDataRealisasiPanduSuccess,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
