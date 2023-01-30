import React from "react";
import Sidebar from "./../../components/Sidebar";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Dashboard from "../admin/dashboard";

import JadwalKedatangan from "../admin/jadwalkedatangan";
import PPKB from "../admin/ppkb";
import Realisasi from "../admin/realisasipemanduan";

const Admin = () => {
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const loading = useSelector((state) => state.Dashboard.loading);

  const renderMenu = () => {
    return isActive.dashboard ? (
      <Dashboard />
    ) : isActive.jadwal ? (
      <JadwalKedatangan />
    ) : isActive.ppkb ? (
      <PPKB />
    ) : isActive.realisasi ? (
      <Realisasi />
    ) : null;
  };

  return (
    <>
      <Loader isLoading={loading} />

      <Sidebar />
    </>
  );
};

export default Admin;
