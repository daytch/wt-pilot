import React, { useState } from "react";
import LogoImage from "./../assets/logo-hd.png";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveSidebarMenu } from "../redux/slices/dashboardSlice.js";
import {
  CalendarDaysIcon,
  CircleStackIcon,
  MegaphoneIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  UserCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import Loader from "./Loader";

import Dashboard from "./../pages/admin/dashboard";

import JadwalKedatangan from "./../pages/admin/jadwalkedatangan";
import PPKB from "./../pages/admin/ppkb";
import Realisasi from "./../pages/admin/realisasipemanduan";

const Sidebar = () => {
  const dispatch = useDispatch();
  const username = JSON.parse(localStorage.getItem("userData")).displayUserName;
  const loading = useSelector((state) => state.Dashboard.loading);
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const activeClass =
    "flex rounded-md my-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 bg-light-white";
  const inActiveClass =
    "flex rounded-md my-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4";

  const menuAction = {
    dashboard: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: true,
          jadwal: false,
          ppkb: false,
          realisasi: false,
        })
      );
    },
    jadwal: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          jadwal: true,
          ppkb: false,
          realisasi: false,
        })
      );
    },
    ppkb: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          jadwal: false,
          ppkb: true,
          realisasi: false,
        })
      );
    },
    realisasi: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          jadwal: false,
          ppkb: false,
          realisasi: true,
        })
      );
    },
    logout: () => {
      localStorage.clear();
      window.location.href = "/";
    },
  };

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

  const renderIcon = {
    dashboard: () => {
      return <HomeIcon className="h-5 w-5" />;
    },
    jadwal: () => {
      return <CalendarDaysIcon className="h-5 w-5" />;
    },
    ppkb: () => {
      return <CircleStackIcon className="h-5 w-5" />;
    },
    realisasi: () => {
      return <MegaphoneIcon className="h-5 w-5" />;
    },
    logout: () => {
      return <ArrowRightOnRectangleIcon className="h-5 w-5" />;
    },
  };

  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard", name: "dashboard" },
    {
      title: "Jadwal Kedatangan",
      name: "jadwal",
    },
    { title: "PPKB", name: "ppkb" },
    {
      title: "Realisasi Pemanduan ",
      name: "realisasi",
    },
    {
      title: "Logout ",
      name: "logout",
      gap: true,
    },
  ];

  return (
    <div className="flex">
      <Loader isLoading={loading} />
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 w-[40px] h-auto ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-base duration-200 ${
              !open && "scale-0"
            }`}
          >
            Hi, {username}
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={isActive[Menu.name] ? activeClass : inActiveClass}
              onClick={() => menuAction[Menu.name]()}
            >
              {renderIcon[Menu.name]()}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-screen flex-1 p-7">{renderMenu()}</div>
    </div>
  );
};

export default Sidebar;
