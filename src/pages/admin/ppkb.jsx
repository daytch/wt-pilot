import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataPKKInaportnet } from "../../redux/slices/jadwalSlice";
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../../functions/index.js";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "../../components/Filter";

const Ppkb = () => {
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dariPihak = UserData.UserType;
  const UserLogin = UserData.UserId;
  const [MMCode, setMMCode] = useState(localStorage.getItem("MMCode"));
  const [Outstanding, setOutstanding] = useState("");
  const [Code, setCode] = useState("");
  const [ValueSearch, setValueSearch] = useState("");
  const [isShowModal, setIsShowModal] = useState(true);
  const [ViewBy, setViewBy] = useState(dariPihak);
  const [ViewValue, setViewValue] = useState(UserData.UserName);
  const tanggalHariini = handleDateAPI(new Date());
  const [FromDate, setFromDate] = useState(tanggalHariini);
  const [ToDate, setToDate] = useState(tanggalHariini);
  const [FilterDate, setFilterDate] = useState("1");
  const [Status_Order, setStatus_Order] = useState("");
  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === "AGEN" ? UserLogin : ""
  );

  var oldindex = "";
  const fetchData = () => {
    const url =
      ValueSearch == null
        ? `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${handleDateAPI(
            startDate
          )}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`
        : `?ViewBy=${dariPihak}&ViewValue=${
            UserData.UserName
          }&FromDate=${handleDateAPI(
            startDate
          )}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch=${ValueSearch}&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`;

    dispatch(getDataPKKInaportnet(url));
  };

  const data = useSelector((state) => state.Jadwal.data);
  const dataCabang = useSelector((state) => state.Dashboard.dataCabang);
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder);

  useEffect(() => {
    if (dataCabang?.length > 0 && isEmptyNullOrUndefined(MMCode)) {
      setMMCode(dataCabang[0].MMCode);
    }
    if (dataSalesOrder?.length > 0 && isEmptyNullOrUndefined(Code)) {
      setCode(dataSalesOrder[0].Code);
    }
  }, [dataCabang, dataSalesOrder]);

  useEffect(() => {
    sessionStorage.setItem("dariTanggalJadwalKedatangan", startDate);
    sessionStorage.setItem("sampaiTanggalJadwalKedatangan", endDate);
    sessionStorage.setItem("codeColumnSearchJadwalKedatangan", Code);
    sessionStorage.setItem("valueColumnSearchJadwalKedatangan", ValueSearch);
    sessionStorage.setItem("cabangJadwalKedatangan", MMCode);
    sessionStorage.setItem("startDate", startDate.getTime());
    sessionStorage.setItem("endDate", endDate.getTime());

    setViewValue(localStorage.getItem("username"));
    setViewBy(localStorage.getItem("id"));

    const deleteSelected = () => {
      var table = document.getElementById("table");
      oldindex = "";

      for (var i = 1; i < table?.rows?.length; i++) {
        table.rows[i].classList.remove("selected");
        table.rows[i].cells[0].classList.remove("arrowright");
      }
    };

    deleteSelected();
    fetchData();
  }, [startDate, endDate, Code, ValueSearch, MMCode, Outstanding]);

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border overflow-y-auto h-[50rem] border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {/* <!-- Header --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      PPKB
                    </h2>
                  </div>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Accordion --> */}
                <div className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-gray-700">
                  <Filter
                    MMCode={MMCode}
                    setMMCode={setMMCode}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    Code={Code}
                    setCode={setCode}
                  />
                </div>
                {/* <!-- End Accordion --> */}

                {/* <!-- Table --> */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            no
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            nomor pkk
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            nama perusahaan
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            nama kapal
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            grt
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            loa
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            draft max
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            bendera
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            tanggal eta
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            tanggal etd
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            pelabuhan asal
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            pelabuhan tujuan
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            pelabuhan tujuan akhir
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y overflow-y-auto divide-gray-200 dark:divide-gray-700">
                    {data &&
                      data.map((item, idx) => {
                        return (
                          <tr
                            key={idx}
                            className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                          >
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {idx + 1}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.nomor_pkk}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.nama_perusahaan}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.nama_kapal}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {parseFloat(item.grt)}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {parseFloat(item.loa)}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {parseFloat(item.draft_max)}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.bendera}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(item.tanggal_eta).getFullYear() <
                                    2000
                                      ? ""
                                      : datetimeToString(item.tanggal_eta)}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(item.tanggal_etd).getFullYear() <
                                    2000
                                      ? ""
                                      : datetimeToString(item.tanggal_etd)}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.pelabuhan_asal}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.pelabuhan_tujuan}
                                  </span>
                                </div>
                              </a>
                            </td>
                            <td className="h-px w-4 whitespace-nowrap">
                              <a
                                className="block"
                                href="#"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                <div className="px-6 py-2">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.pelabuhan_tujuan_akhir}
                                  </span>
                                </div>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* <!-- End Table --> */}
                {/* <!-- Footer --> */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {data.length}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        <svg
                          className="w-3 h-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.506 1.64001L4.85953 7.28646C4.66427 7.48172 4.66427 7.79831 4.85953 7.99357L10.506 13.64"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      >
                        Next
                        <svg
                          className="w-3 h-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.50598 2L10.1524 7.64645C10.3477 7.84171 10.3477 8.15829 10.1524 8.35355L4.50598 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>

      <div
        id="hs-bg-gray-on-hover-cards"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-200">
                Detail Data
              </h3>
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-bg-gray-on-hover-cards"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3.5 h-3.5"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-3 sm:py-6">
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nomor PKK
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              NPWP
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nama Perusahaan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nomor Trayek
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="py-3 sm:py-6">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Data Kapal
                  </h4>

                  {/* <!-- Data Kapal --> */}
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nama Kapal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              DRT
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              GRT
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              LOA
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Lebar Kapal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Draft Max
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Draft Depan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Jenis Trayek
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nahkoda
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Tanda Pendaftaran Kapal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Tahun Pembuatan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Bendera
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Jenis Kapal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Draft Belakang
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Draft Tengah
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Call Sign
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <!-- End Data Kapal --> */}
                </div>

                <div className="py-3 sm:py-6">
                  <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                    Pelabuhan
                  </h4>

                  {/* <!-- Grid --> */}
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Kode Pelabuhan Asal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Kode Pelabuhan Tujuan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Kode Tujuan Akhir Pelabuhan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Pelabuhan Asal
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Pelabuhan Tujuan
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Pelabuhan Tujuan Akhir
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Nama Dermaga
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Jenis Barang
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Port Code
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Tanggal ETA
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Status BM
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Jumlah Muat
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Status
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Tanggal ETD
                            </span>
                          </td>
                          <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              test
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* <!-- End Grid --> */}

                  <p className="mt-4 text-xs text-gray-500">
                    Completely unstyled, fully accessible UI{" "}
                    <a
                      className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                      href="../plugins.html"
                    >
                      plugins
                    </a>{" "}
                    for popular features that for one reason or another don't
                    belong in core.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <a
                className="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
                href="../docs/index.html"
              >
                Installation Guide
                <svg
                  className="w-2.5 h-2.5"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ppkb;
