import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDataPKKInaportnet } from "../../redux/slices/jadwalSlice"
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../../functions/index.js"
import "react-datepicker/dist/react-datepicker.css"
import Filter from "../../components/Filter"
import Detail from "../../components/Detail"

const JadwalKedatangan = () => {
  const dispatch = useDispatch()
  const UserData = JSON.parse(localStorage.getItem("userData"))
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("dariTanggalJadwalKedatangan")
      ? new Date(sessionStorage.getItem("dariTanggalJadwalKedatangan"))
      : new Date()
  )
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("sampaiTanggalJadwalKedatangan")
      ? new Date(sessionStorage.getItem("sampaiTanggalJadwalKedatangan"))
      : new Date()
  )
  const dariPihak = UserData.UserType
  const UserType = UserData.UserType
  const UserLogin = UserData.UserId;
  const [MMCode, setMMCode] = useState(
    UserData.MMCode !== "PST"
      ? UserData.MMCode
      : sessionStorage.getItem("MMCode")
      ? sessionStorage.getItem("MMCode")
      : ""
  );
  const [Outstanding, setOutstanding] = useState("");
  const [Code, setCode] = useState(
    sessionStorage.getItem("codeColumnSearchJadwalKedatangan") ?? ""
  )
  const [ValueSearch, setValueSearch] = useState("")
  const [isShowModal, setIsShowModal] = useState(true)
  const [ViewBy, setViewBy] = useState(dariPihak)
  const [ViewValue, setViewValue] = useState(UserData.UserName)
  const [FilterDate, setFilterDate] = useState("1")
  const [Status_Order, setStatus_Order] = useState("")
  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === "AGEN" ? UserLogin : ""
  )
  const [detail, setDetail] = useState({})

  var oldindex = ""
  const fetchData = async () => {
    const url = `?MMCode=${
      !isEmptyNullOrUndefined(MMCode) ? MMCode : ""
    }&FromDate=${handleDateAPI(startDate)}&ToDate=${handleDateAPI(
      endDate
    )}&FilterDate=${
      !isEmptyNullOrUndefined(FilterDate) ? FilterDate : ""
    }&ColumnSearch=${!isEmptyNullOrUndefined(Code) ? Code : ""}&ValueSearch=${
      !isEmptyNullOrUndefined(ValueSearch) ? ValueSearch : ""
    }&Outstanding=${
      !isEmptyNullOrUndefined(Outstanding) ? Outstanding : ""
    }&UserType=${!isEmptyNullOrUndefined(UserType) ? UserType : ""} 
      &LoginUserId=${!isEmptyNullOrUndefined(UserLogin) ? UserLogin : ""}`

    dispatch(getDataPKKInaportnet(url))
  }

  const data = useSelector((state) => state.Jadwal.data)
  const dataCabang = useSelector((state) => state.Dashboard.dataCabang)
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder)

  useEffect(() => {
    if (dataCabang?.length > 0 && isEmptyNullOrUndefined(MMCode)) {
      setMMCode(dataCabang[0].MMCode)
    }
    if (dataSalesOrder?.length > 0 && isEmptyNullOrUndefined(Code)) {
      setCode(dataSalesOrder[0].Code)
    }
  }, [dataCabang, dataSalesOrder])

  useEffect(() => {
    sessionStorage.setItem("dariTanggalJadwalKedatangan", startDate)
    sessionStorage.setItem("sampaiTanggalJadwalKedatangan", endDate)
    sessionStorage.setItem("codeColumnSearchJadwalKedatangan", Code)
    sessionStorage.setItem("valueColumnSearchJadwalKedatangan", ValueSearch)
    sessionStorage.setItem("cabangJadwalKedatangan", MMCode)
    sessionStorage.setItem("startDate", startDate)
    sessionStorage.setItem("endDate", endDate)

    setViewValue(localStorage.getItem("username"))
    setViewBy(localStorage.getItem("id"))

    const deleteSelected = () => {
      var table = document.getElementById("table")
      oldindex = ""

      for (var i = 1; i < table?.rows?.length; i++) {
        table.rows[i].classList.remove("selected")
        table.rows[i].cells[0].classList.remove("arrowright")
      }
    }

    deleteSelected()
   
    if (startDate && endDate && Code && MMCode && !isEmptyNullOrUndefined(Outstanding)) {
      fetchData();
    }
  }, [startDate, endDate, Code, ValueSearch, MMCode, Outstanding])

  return (
    <>
      <div className="max-w-[85rem] py-3 mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border overflow-y-auto h-[50rem] border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-1000 dark:text-gray-200">
                      Jadwal Kedatangan dan Keberangkatan Kapal
                    </h2>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Accordion --> */}
                <div className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-gray-700">
                  <Filter
                    search={fetchData}
                    MMCode={MMCode}
                    setMMCode={setMMCode}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    Code={Code}
                    setCode={setCode}
                    tipe={"jadwal"}
                  />
                </div>
                {/* <!-- End Accordion --> */}

                {/* <!-- Table --> */}
                <div
                  className="px-3"
                  style={{
                    maxWidth: "100%",
                    overflow: "auto",
                    maxHeight: "30vh",
                  }}
                >
                  <table className="divide-gray-200 dark:divide-gray-700">
                    <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          no
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          nomor pkk
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          nama perusahaan
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          nama kapal
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          grt
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          loa
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          draft max
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          bendera
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          tanggal eta
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          tanggal etd
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          pelabuhan asal
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          pelabuhan tujuan
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          pelabuhan tujuan akhir
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y overflow-y-auto divide-gray-200 dark:divide-gray-700">
                      {data &&
                        data.map((item, idx) => {
                          return (
                            <tr
                              key={"jdwl" + idx}
                              className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                              onClick={() => setDetail(item)}
                            >
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {idx + 1}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.nomor_pkk}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.nama_perusahaan}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.nama_kapal}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.grt ? parseFloat(item.grt) : ""}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.loa ? parseFloat(item.loa) : ""}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.draft_max
                                  ? parseFloat(item.draft_max)
                                  : ""}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.bendera}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {new Date(item.tanggal_eta).getFullYear() < 2000
                                  ? ""
                                  : datetimeToString(item.tanggal_eta)}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {new Date(item.tanggal_etd).getFullYear() < 2000
                                  ? ""
                                  : datetimeToString(item.tanggal_etd)}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.pelabuhan_asal}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.pelabuhan_tujuan}
                              </td>
                              <td
                                className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.pelabuhan_tujuan_akhir}
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
                {/* <!-- End Table --> */}
                {/* <!-- Footer --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-[10px] text-gray-600  dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {data?.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        <Detail detail={detail} tipe={"jadwal"} />
      </div>
    </>
  )
}

export default JadwalKedatangan
