import { createSlice } from "@reduxjs/toolkit";
import { isObjectEmpty } from "./../../functions/index";

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const activeMenu = JSON.parse(localStorage.getItem("activeMenu"));
export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: {
    activeSidebarMenu: isObjectEmpty(activeMenu)
      ? {
          dashboard: true,
          input: false,
          masuk: false,
          keluar: false,
          laporan: false,
        }
      : activeMenu,
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
  },
  reducers: {
    changeActiveSidebarMenu: (state, action) => {
      state.activeSidebarMenu = action.payload;
      localStorage.setItem("activeMenu", JSON.stringify(action.payload));
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
  },
});

export const {
  changeActiveSidebarMenu,
  toogleLoading,
  getData,
  getDataSuccess,
  getDataFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
