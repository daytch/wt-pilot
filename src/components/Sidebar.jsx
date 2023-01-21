import React from "react";
import LogoImage from "./../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveSidebarMenu } from "../redux/slices/dashboardSlice.js";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const activeClass =
    "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white";
  const inActiveClass =
    "cursor-pointer flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300";

  const menuAction = {
    dashboard: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: true,
          input: false,
          masuk: false,
          keluar: false,
          laporan: false,
          ganti: false,
        })
      );
    },
    input: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          input: true,
          masuk: false,
          keluar: false,
          laporan: false,
          ganti: false,
        })
      );
    },
    masuk: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          input: false,
          masuk: true,
          keluar: false,
          laporan: false,
          ganti: false,
        })
      );
    },
    keluar: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          input: false,
          masuk: false,
          keluar: true,
          laporan: false,
          ganti: false,
        })
      );
    },
    laporan: () => {
      dispatch(
        changeActiveSidebarMenu({
          dashboard: false,
          input: false,
          masuk: false,
          keluar: false,
          laporan: true,
          ganti: false,
        })
      );
    },
  };

  return (
    <>
      {/* <!-- Sidebar Toggle --> */}
      <div className="sticky top-[59px] inset-x-0 z-20 bg-white border-y px-4 sm:px-6 sm:top-[71px] md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
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
            {/* <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
              Application Layout
              <svg
                className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </li> */}
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
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="px-6 flex flex-col justify-center">
          <img src={LogoImage} className="w-10 h-10 text-center mx-auto" alt="logo" />
          <a
            className="flex text-center text-base font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            WT Pilot
          </a>
        </div>

        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
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
                className={isActive.input ? activeClass : inActiveClass}
                onClick={() => menuAction["input"]()}
              >
                <svg
                  className="w-[16px] h-[16px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                Input Surat
              </div>
            </li>

            <li className="hs-accordion" id="account-accordion">
              <div
                className={isActive.masuk ? activeClass : inActiveClass}
                onClick={() => menuAction["masuk"]()}
              >
                <svg
                  className="w-[16px] h-[16px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Surat Masuk
              </div>
            </li>

            <li className="hs-accordion" id="projects-accordion">
              <div
                className={isActive.keluar ? activeClass : inActiveClass}
                onClick={() => menuAction["keluar"]()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[16px] h-[16px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Surat Keluar
              </div>
            </li>

            <li>
              <div
                className={isActive.laporan ? activeClass : inActiveClass}
                onClick={() => menuAction["laporan"]()}
              >
                <svg
                  className="w-[16px] h-[16px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                  />
                </svg>
                Laporan
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
