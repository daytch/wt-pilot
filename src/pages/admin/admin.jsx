import React from "react";
import Header from "./../../components/Header";
import Sidebar from "./../../components/Sidebar";
import { useSelector } from "react-redux";
import ChangePassword from "./changepassword";
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
    ) : isActive.ganti ? (
      <ChangePassword />
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
      {/* <Header /> */}

      <Sidebar />

      {/* <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
        {renderMenu()}
      </div> */}
    </>
  );
};

export default Admin;
