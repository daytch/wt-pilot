import React, { useState, useEffect, useRef } from "react";
import LogoImage from "./../assets/logo-hd.png";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveSidebarMenu,
  changeActiveTabMenu,
} from "../redux/slices/dashboardSlice.js";
import { postLogin } from "./../redux/slices/authenticationSlice.js";
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
import PNBP from "./../pages/admin/pnbp";
import Realisasi from "./../pages/admin/realisasipemanduan";
import { ConfirmationMessage } from "./Notification";

const Sidebar = () => {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const username = userData?.displayUserName;
  const [loading, setLoading] = useState(false);
  
  const loadingD = useSelector((state) => state.Dashboard.loading);
  const loadingJ = useSelector((state) => state.Jadwal.loading);
  const loadingPn = useSelector((state) => state.PNBP.loading);
  const loadingPp = useSelector((state) => state.PPKB.loading);
  const loadingR = useSelector((state) => state.Realisasi.loading);

  const token = useSelector((state) => state.Authentication.token);
  const data = useSelector((state) => state.Authentication.data);
  const loadingA = useSelector((state) => state.Authentication.loading);

  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const isTabMenuActive = useSelector((state) => state.Dashboard.activeTabMenu);
  const activeClass =
    "flex rounded-md my-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 bg-light-white";
  const inActiveClass =
    "flex rounded-md my-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4";
  const activeTabMenuClass =
    "font-semibold px-4 py-3 hover:bg-[#51B1E7] bg-[#51B1E7]";
  const inActiveTabMenuClass = "font-semibold px-4 py-3 hover:bg-[#51B1E7]";

  const backDropActive =
    "hs-overlay backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] open";
  const backDroopNonActive =
    "hs-overlay hidden backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]"; //"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"

  const menuAction = {
    dashboard: (isLeftmenu) => {
      isLeftmenu
        ? dispatch(
            changeActiveSidebarMenu({
              dashboard: true,
              jadwal: false,
              ppkb: false,
              realisasi: false,
              pnbp: false,
            })
          )
        : dispatch(
            changeActiveTabMenu({
              dashboard: true,
              jadwal: false,
              ppkb: false,
              realisasi: false,
              pnbp: false,
            })
          );
    },
    jadwal: (isLeftmenu) => {
      isLeftmenu
        ? dispatch(
            changeActiveSidebarMenu({
              dashboard: false,
              jadwal: true,
              ppkb: false,
              realisasi: false,
              pnbp: false,
            })
          )
        : dispatch(
            changeActiveTabMenu({
              dashboard: false,
              jadwal: true,
              ppkb: false,
              realisasi: false,
              pnbp: false,
            })
          );
    },
    ppkb: (isLeftmenu) => {
      isLeftmenu
        ? dispatch(
            changeActiveSidebarMenu({
              dashboard: false,
              jadwal: false,
              ppkb: true,
              realisasi: false,
              pnbp: false,
            })
          )
        : dispatch(
            changeActiveTabMenu({
              dashboard: false,
              jadwal: false,
              ppkb: true,
              realisasi: false,
              pnbp: false,
            })
          );
    },
    realisasi: (isLeftmenu) => {
      isLeftmenu
        ? dispatch(
            changeActiveSidebarMenu({
              dashboard: false,
              jadwal: false,
              ppkb: false,
              realisasi: true,
              pnbp: false,
            })
          )
        : dispatch(
            changeActiveTabMenu({
              dashboard: false,
              jadwal: false,
              ppkb: false,
              realisasi: true,
              pnbp: false,
            })
          );
    },
    pnbp: (isLeftmenu) => {
      isLeftmenu
        ? dispatch(
            changeActiveSidebarMenu({
              dashboard: false,
              jadwal: false,
              ppkb: false,
              realisasi: false,
              pnbp: true,
            })
          )
        : dispatch(
            changeActiveTabMenu({
              dashboard: false,
              jadwal: false,
              ppkb: false,
              realisasi: false,
              pnbp: true,
            })
          );
    },
    logout: () => {
      localStorage.clear();
      window.location.href = "/";
    },
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      if (token && data) {
        localStorage.setItem("isUserActive", true);
        // btnReloginModalRef.current.click();
        // history.navigate("/");
      }
    }
  }, [loadingA, data]);

  useEffect(() => {
    setLoading(
      loadingD || loadingJ || loadingPn /*|| loadingPp*/ || loadingR || loadingA
    );
  }, [loadingD, loadingJ, loadingPn, /*loadingPp,*/ loadingR, loadingA]);

  const renderMenu = () => {
    return isActive.dashboard ? (
      <Dashboard />
    ) : isActive.ganti ? (
      <ChangePassword />
    ) : isActive.jadwal ? (
      <JadwalKedatangan />
    ) : isActive.ppkb ? (
      <PPKB />
    ) : isActive.pnbp ? (
      <PNBP />
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
    pnbp: () => {
      return <CircleStackIcon className="h-5 w-5" />;
    },
    logout: () => {
      return <ArrowRightOnRectangleIcon className="h-5 w-5" />;
    },
  };
  const cbConfirmation = (e) => {
    if (e.isConfirmed) {
      menuAction[selectedMenu.name](true);
      menuAction[selectedMenu.name](false);
    }
  };
  const [open, setOpen] = useState(true);
  const [tabOpen, setTabOpen] = useState(true);
  const [tabMenu, setTabMenu] = useState(
    localStorage.getItem("listTabMenu")
      ? JSON.parse(localStorage.getItem("listTabMenu"))
      : [{ title: "Dashboard", name: "dashboard" }]
  );

  let selectedMenu = {};
  const Menus =
    userData.UserType === "KSOP"
      ? [
          { title: "Dashboard", name: "dashboard" },
          {
            title: "Jadwal Kedatangan",
            name: "jadwal",
          },
          { title: "PNBP", name: "pnbp" },
          {
            title: "Realisasi Pemanduan ",
            name: "realisasi",
          },
          {
            title: "Logout ",
            name: "logout",
            gap: true,
          },
        ]
      : [
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
              onClick={() => {
                if (tabMenu.map((x) => x.name).indexOf(Menu.name) > -1) {
                  selectedMenu = Menu;
                  ConfirmationMessage(
                    "Confirmation?!",
                    `<div>Menu <b><u>${Menu.title}</u></b> sudah di buka pada tab menu, apakah anda akan mengaktifkan menu <b><u>${Menu.title}</u></b> ?</div>`,
                    cbConfirmation
                  );
                } else {
                  setTabMenu((oldArr) => [...oldArr, Menu]);
                  localStorage.setItem(
                    "listTabMenu",
                    JSON.stringify([...tabMenu, Menu])
                  );
                  menuAction[Menu.name](true);
                  menuAction[Menu.name](false);
                }
              }}
            >
              {renderIcon[Menu.name]()}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-screen flex-1 p-7">
       
        <header className="rounded-xl flex flex-wrap justify-start sm:flex-nowrap z-50 w-full bg-[#B4E7F7] border-b border-white/[.5] text-sm py-3 sm:py-0">
          <nav
            className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" // sm:px-6 lg:px-8"
            aria-label="Global"
          >
            <div
              id="navbar-collapse-with-animation"
              className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
            >
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-start sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                {tabMenu?.map((m, i) => {
                  return (
                    <a
                      key={i}
                      className={
                        isTabMenuActive[m.name]
                          ? activeTabMenuClass
                          : inActiveTabMenuClass
                      }
                      onClick={() => {
                        menuAction[m.name](true);
                        menuAction[m.name](false);
                      }}
                      href="#"
                    >
                      {m.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </header>

        {renderMenu()}
      </div>
    </div>
  );
};

export default Sidebar;
