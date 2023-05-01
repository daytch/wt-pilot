import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  getDataCabang,
  getDataSalesOrder,
  getDataRealisasiPandu,
} from "../redux/slices/dashboardSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffectOnce } from "../functions/index.js"
import DatePicker from "react-datepicker"
import { isEmptyNullOrUndefined } from "../functions/index.js"
import { ErrorMessage } from "./Notification"

const Filter = (props) => {
  const dispatch = useDispatch()
  const UserData = JSON.parse(localStorage.getItem("userData"))
  const dariPihak = UserData.UserType
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
    notApproved,
    setNotApproved,
    setIsCreatedNew,
    isCreatedNew,
  } = props

  useEffectOnce(() => {
    dispatch(getDataCabang())
    dispatch(getDataSalesOrder(dariPihak))
    dispatch(getDataRealisasiPandu(dariPihak))
  })

  const dataCabang = useSelector((state) => state.Dashboard.dataCabang)
  
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder)
  const dataRealisasiPandu = useSelector(
    (state) => state.Dashboard.dataRealisasiPandu
  )
  const [listSalesOrder, setListSalesOrder] = useState([
    { Code: "0", Name: "Cari" },
  ])
  const [listPandu, setListPandu] = useState([{ Code: "0", Name: "Cari" }])
  useEffect(() => {
    if (dataSalesOrder?.length > 0 && listSalesOrder.length < 2) {
      let arrSales = [...listSalesOrder]
      dataSalesOrder.forEach((element) => {
        arrSales.push(element)
      })
      setListSalesOrder(arrSales)
    }
    if (dataRealisasiPandu?.length > 0 && listPandu.length < 2) {
      let arrPandu = [...listPandu]
      dataRealisasiPandu.forEach((element) => {
        arrPandu.push(element)
      })
      setListPandu(arrPandu)
    }
  }, [dataSalesOrder, dataRealisasiPandu])

  useEffect(() => {
    if (
      isEmptyNullOrUndefined(MMCode) &&
      tipe === "jadwal" &&
      dataSalesOrder.length > 0
    ) {
      setMMCode(dataSalesOrder[0].Code)
    }
    if (
      isEmptyNullOrUndefined(MMCode) &&
      tipe === "realisasi" &&
      dataRealisasiPandu.length > 0
    ) {
      setMMCode(dataRealisasiPandu[0].Code)
    }
  }, [MMCode])

  const onchangeStartDate = (e) => {
    if (new Date(e) && new Date(e).setHours(0,0,0,0) > new Date(endDate).setHours(0,0,0,0)) {
      ErrorMessage("", "Start Date must less than or equals End Date")
    } else {
      setStartDate(new Date(e))
    }
  }

  const onchangeEndDate = (e) => {
    if (startDate) {
      if (new Date(e).setHours(0,0,0,0) < new Date(startDate).setHours(0,0,0,0)) {
        ErrorMessage("", "End Date must greater than or equals Start Date")
      } else {
        setEndDate(e)
      }
    } else {
      ErrorMessage(
        "",
        "Please select start date first before you select end date"
      )
    }
  }

  return (
    <div>
      <div className="p-3 inline-flex align-middle gap-x-2">
        <select
          value={MMCode ?? dataCabang[0]?.MMCode}
          onChange={(e) => setMMCode(e.target.value)}
          disabled={UserData.MMCode ? true : false}
          className="py-1 px-3 pr-6 block w-full disabled:bg-gray-300 bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
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
          dateFormat="dd-MM-yyyy"
          onChange={(date) => onchangeStartDate(date)} //setStartDate(date)}
        />
        <span className="inline-block align-middle mt-1.5 text-sm">
          Sampai:
        </span>
        <DatePicker
          className="py-2 px-3 pr-9 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          selected={endDate}
          dateFormat="dd-MM-yyyy"
          onChange={(date) => onchangeEndDate(date)} // setEndDate(date)}
        />
        {tipe === "jadwal" ? (
          <select
            value={Code ?? dataSalesOrder[0]?.Code}
            onChange={(e) => setCode(e.target.value)}
            className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          >
            {listSalesOrder &&
              listSalesOrder.map((x, idx) => (
                <option key={idx} value={x.Code}>
                  {x.Name}
                </option>
              ))}
          </select>
        ) : tipe === "ppkb" ? (
          <>
            <select
              value={Code ?? dataRealisasiPandu[0]?.Code}
              onChange={(e) => setCode(e.target.value)}
              className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              {listPandu &&
                listPandu.map((x, idx) => (
                  <option key={idx} value={x.Code}>
                    {x.Name}
                  </option>
                ))}
            </select>
            {/* <input type="checkbox" title="Test" /> */}
          </>
        ) : (
          <select
            value={Code ?? dataRealisasiPandu[0]?.Code}
            onChange={(e) => setCode(e.target.value)}
            className="py-1 px-3 pr-6 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
          >
            {listPandu &&
              listPandu.map((x, idx) => (
                <option key={idx} value={x.Code}>
                  {x.Name}
                </option>
              ))}
          </select>
        )}

        <input className="py-2 px-3 pr-9 block w-full bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" />
        {/* {notApproved && (
          <button
            className="h-8 py-3 px-2 min-h-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-xs dark:focus:ring-offset-gray-800"
            data-hs-overlay="#hs-bg-gray-on-hover-cards1"
            onClick={() => setIsCreatedNew(!isCreatedNew)}
          >
            input
          </button>
        )} */}
        <button className="h-8 py-3 px-2 min-h-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-xs dark:focus:ring-offset-gray-800">
          Search
        </button>

        {tipe === "ppkb" && (
          <>
            <div className="md:flex md:items-center w-full">
              <div className="md:w-1/5 flex justify-center">
                <input
                  // className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  onChange={(e) => setNotApproved(e.currentTarget.checked)}
                  checked={notApproved}
                />
              </div>
              <div className="md:w-4/5">
                <label
                  className="form-check-label inline-block text-xs text-gray-800 mb-2"
                  htmlFor="flexCheckChecked"
                >
                  Belum Approved
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

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
  notApproved: PropTypes.bool,
  setNotApproved: PropTypes.func,
}

export default Filter
