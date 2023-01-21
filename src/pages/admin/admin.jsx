import React from "react";
import Header from "./../../components/Header";
import Sidebar from "./../../components/Sidebar";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import ChangePassword from "./changepassword";
import Loader from "../../components/Loader";

const Admin = () => {
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const loading = useSelector((state) => state.Dashboard.loading);

  const renderMenu = () => {
    return isActive.dashboard ? (
      <Dashboard />
    ) : isActive.ganti ? (
      <ChangePassword />
    ) : null;
  };

  return (
    <>
      <Loader isLoading={loading} />
      <Header />
      {/* <!-- ========== MAIN CONTENT ========== --> */}
      <Sidebar />
      {/* <!-- Content --> */}
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
        {renderMenu()}
      </div>
    </>
  );
};

export default Admin;
