import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  getDataCabang,
  getDataSalesOrder,
  getDataRealisasiPandu,
} from "../redux/slices/dashboardSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "../functions/index.js";
import DatePicker from "react-datepicker";
import { isEmptyNullOrUndefined } from "../functions/index.js";

const Filter = (props) => {
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const dariPihak = UserData.UserType;
  // console.log("props:", props);
  const {
    MMCode,
    setMMCode,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    Code,
    setCode,
    tipe,
  } = props;

  useEffectOnce(() => {
    dispatch(getDataCabang());
    dispatch(getDataSalesOrder(dariPihak));
    dispatch(getDataRealisasiPandu(dariPihak));
  });

  const dataCabang = useSelector((state) => state.Dashboard.dataCabang);
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder);
  const dataRealisasiPandu = useSelector(
    (state) => state.Dashboard.dataRealisasiPandu
  );

  useEffect(() => {
    if (
      isEmptyNullOrUndefined(MMCode) &&
      tipe === "jadwal" &&
      dataSalesOrder.length > 0
    ) {
      setMMCode(dataSalesOrder[0].Code);
    }
    if (
      isEmptyNullOrUndefined(MMCode) &&
      tipe === "realisasi" &&
      dataRealisasiPandu.length > 0
    ) {
      setMMCode(dataRealisasiPandu[0].Code);
    }
  }, [MMCode]);

  return (
    <div>
      <div className="p-3 inline-flex align-middle gap-x-2">
        <select
          value={MMCode ?? dataCabang[0]?.MMCode}
          onChange={(e) => setMMCode(e.target.value)}
          className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        >
          {dataCabang &&
            dataCabang.map((x, idx) => (
              <option key={idx} value={x.MMCode}>
                {x.FullName}
              </option>
            ))}
        </select>
        <span className="inline-block align-middle mt-1.5 text-sm">Dari: </span>
        <DatePicker
          className="py-2 px-3 pr-9 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <span className="inline-block align-middle mt-1.5 text-sm">
          {" "}
          Sampai:{" "}
        </span>
        <DatePicker
          className="py-2 px-3 pr-9 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
        {tipe === "jadwal" ? (
          <select
            value={Code ?? dataSalesOrder[0]?.Code}
            onChange={(e) => setCode(e.target.value)}
            className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          >
            {dataSalesOrder &&
              dataSalesOrder.map((x, idx) => (
                <option key={idx} value={x.Code}>
                  {x.Name}
                </option>
              ))}
          </select>
        ) : (
          <select
            value={Code ?? dataRealisasiPandu[0]?.Code}
            onChange={(e) => setCode(e.target.value)}
            className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          >
            {dataRealisasiPandu &&
              dataRealisasiPandu.map((x, idx) => (
                <option key={idx} value={x.Code}>
                  {x.Name}
                </option>
              ))}
          </select>
        )}

        <input className="py-2 px-3 pr-9 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" />
        <button className="h-8 py-3 px-2 min-h-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-xs dark:focus:ring-offset-gray-800">
          Search
        </button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  MMCode: PropTypes.string,
  setMMCode: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  setStartDate: PropTypes.func,
  endDate: PropTypes.instanceOf(Date),
  setEndDate: PropTypes.func,
  Code: PropTypes.string,
  setCode: PropTypes.func,
  tipe: PropTypes.string,
};

export default Filter;
