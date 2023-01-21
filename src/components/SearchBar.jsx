import React, { useRef, useEffect, useCallback } from "react";
import { OS } from "../functions/index.js";
import Datepicker from "react-vite-range-datepicker";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";

const SearchBox = (props) => {
  const {
    filteringData,
    withDateFilter,
    handleValueChange,
    value,
    handleStatusChange,
    valueStatus,
    isReport,
  } = props;
  const searchRef = useRef();
  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode } = event;
    if (keyCode === 191) {
      searchRef.current.focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className="py-3 flex flex-row justify-between">
      <div className="relative max-w-xs">
        <label htmlFor="hs-table-search" className="sr-only">
          Search
        </label>
        <input
          ref={searchRef}
          onChange={filteringData}
          type="text"
          name="hs-table-search"
          id="hs-table-search"
          className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          placeholder="Search for items"
        />
        <div className="hidden sm:block absolute inset-y-0 right-0 p-2">
          <span className="p-1 text-xs font-medium text-gray-400 rounded-md dark:text-gray-500 border border-gray-200 border-spacing-1">
            /
          </span>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
          <svg
            className="h-3.5 w-3.5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
      {isReport ? (
        <div className="lg:w-[33rem] inline-flex align-middle mr-4">
          <div className="w-36">
            <label className="text-xs font-light">Status</label>
            <select
              value={valueStatus}
              onChange={handleStatusChange}
              className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="on progress">On Progress</option>
            </select>
          </div>

          <div className="mx-4">
            <label className="text-xs font-light">Tanggal Pegiriman</label>
            <Datepicker value={value} onChange={handleValueChange} />
          </div>

          <div>
            <button
              data-hs-overlay="#hs-medium-modal"
              className="lg:mt-6 py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              <ArrowDownOnSquareIcon className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
