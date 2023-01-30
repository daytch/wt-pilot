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
import Detail from "../../components/Detail";

const JadwalKedatangan = () => {
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
  const [detail, setDetail] = useState({});

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
    console.log("detail:", detail);
  }, [detail]);

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
                      Jadwal Kedatangan Kapal
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
                    tipe={"jadwal"}
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
                            onClick={() => setDetail(item)}
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

        <Detail detail={detail} tipe={"jadwal"} />
      </div>
    </>
  );
};

export default JadwalKedatangan;
