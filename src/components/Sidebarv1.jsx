import React from "react";
import LogoImage from "./../assets/logo-hd.png";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveSidebarMenu } from "../redux/slices/dashboardSlice.js";
import {
  CalendarDaysIcon,
  CircleStackIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const activeClass =
    "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white";
  const inActiveClass =
    "cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-200 hover:text-slate-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300";

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
  };

  return (
    <>
      {/* <!-- Sidebar Toggle --> */}
      <div className="sticky top-[59px] inset-x-0 z-20 bg-white border-y px-4 sm:px-6 sm:top-[71px] md:px-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center py-4">
          {/* <!-- Navigation Toggle --> */}
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600"
            data-hs-overlay="#docs-sidebar"
            aria-controls="docs-sidebar"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="w-5 h-5"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
          {/* <!-- End Navigation Toggle --> */}

          {/* <!-- Breadcrumb --> */}
          <ol
            className="ml-3 flex items-center whitespace-nowrap min-w-0"
            aria-label="Breadcrumb"
          >
            <li
              className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
              aria-current="page"
            >
              Dashboard
            </li>
          </ol>
          {/* <!-- End Breadcrumb --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Toggle --> */}

      {/* <!-- Sidebar --> */}
      <div
        id="docs-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-blue-700 border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y 
         lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-6 flex flex-col justify-center">
          <img
            src={LogoImage}
            className="w-auto h-10 text-center mx-auto"
            alt="logo"
          />
          <a
            className="flex text-center text-base font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          ></a>
        </div>

        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            <li>
              <label htmlFor="icon" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  className="py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  placeholder="Search"
                />
              </div>
            </li>
            <li>
              <div
                className={isActive.dashboard ? activeClass : inActiveClass}
                onClick={() => menuAction["dashboard"]()}
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Dashboard
              </div>
            </li>

            <li className="hs-accordion" id="users-accordion">
              <div
                className={isActive.jadwal ? activeClass : inActiveClass}
                onClick={() => menuAction["jadwal"]()}
              >
                <CalendarDaysIcon className="h-5 w-5" />
                Jadwal Kedatangan
              </div>
            </li>

            <li className="hs-accordion" id="account-accordion">
              <div
                className={isActive.ppkb ? activeClass : inActiveClass}
                onClick={() => menuAction["ppkb"]()}
              >
                <CircleStackIcon className="h-5 w-5" />
                PPKB
              </div>
            </li>

            <li className="hs-accordion" id="projects-accordion">
              <div
                className={isActive.realisasi ? activeClass : inActiveClass}
                onClick={() => menuAction["realisasi"]()}
              >
                <MegaphoneIcon className="h-5 w-5" />
                Realisasi Pemanduan
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {/* <!-- End Sidebar --> */}

      <div
        id="sidebar-backdrop"
        className="hidden transition duration fixed inset-0 z-[47] bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      ></div>
    </>
  );
};

export default Sidebar;
