import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataLaporan } from "../../redux/slices/realisasiSlice";
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../../functions/index.js";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "../../components/Filter";
import Detail from "../../components/Detail";
import { sliceHour } from "../../functions/index.js";

const RealisasiPemanduan = () => {
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("startDateRealisasiPemanduan")
      ? new Date(sessionStorage.getItem("startDateRealisasiPemanduan"))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("endDateRealisasiPemanduan")
      ? new Date(sessionStorage.getItem("endDateRealisasiPemanduan"))
      : new Date()
  );

  const dariPihak = UserData.UserType;
  const UserLogin = UserData.UserId;
  const [MMCode, setMMCode] = useState(
    sessionStorage.getItem("cabangRealisasiPemanduan") ?? ""
  );
  const [Outstanding, setOutstanding] = useState("");
  const [Code, setCode] = useState(
    sessionStorage.getItem("codeColumnSearchRealisasiPemanduan") ?? ""
  );
  const [ValueSearch, setValueSearch] = useState("");
  // const [isShowModal, setIsShowModal] = useState(true);
  const [ViewBy, setViewBy] = useState(dariPihak);
  const [ViewValue, setViewValue] = useState(UserData.UserName);
  const tanggalHariini = handleDateAPI(new Date());
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [FilterDate, setFilterDate] = useState("1");
  const [Status_Order, setStatus_Order] = useState("");
  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === "AGEN" ? UserLogin : ""
  );
  const [Kapal, setKapal] = useState("");
  const [Pemandu, setPemandu] = useState("");
  const [detail, setDetail] = useState({});

  var oldindex = "";
  const fetchData = () => {
    const url =
      ValueSearch == null
        ? `?ReportName=LAPORAN KEGIATAN PEMANDUAN DAN PENUNDAAN&CompanyName=PT WORLD TERMINALINDO&FromDate=${handleDateAPI(
            startDate
          )}&ToDate=${handleDateAPI(
            ToDate
          )}&Cabang=${MMCode}&Agen&Kapal&Pemandu`
        : `?ReportName=LAPORAN KEGIATAN PEMANDUAN DAN PENUNDAAN&CompanyName=PT WORLD TERMINALINDO&FromDate=${handleDateAPI(
            startDate
          )}&ToDate=${handleDateAPI(
            ToDate
          )}&Cabang=${MMCode}&Agen=&Kapal=${Kapal}&Pemandu=${Pemandu}`;
    // ${AgentUserLogin}
    dispatch(getDataLaporan(url));
  };

  useEffect(() => {
    const dariTanggal = sessionStorage.getItem("dariTanggalRealisasiPemanduan");
    const sampaiTanggal = sessionStorage.getItem(
      "sampaiTanggalRealisasiPemanduan"
    );
    const columnSearch = sessionStorage.getItem(
      "codeColumnSearchRealisasiPemanduan"
    );
    const valueSearch = sessionStorage.getItem(
      "valueColumnSearchRealisasiPemanduan"
    );
    const cabang = sessionStorage.getItem("cabangRealisasiPemanduan");
    const startDates = sessionStorage.getItem("startDateRealisasiPemanduan");
    const endDates = sessionStorage.getItem("endDateRealisasiPemanduan");

    const kapals = sessionStorage.getItem("kapalRealisasiPemanduan");
    const agens = sessionStorage.getItem("agenRealisasiPemanduan");

    if (dariTanggal) {
      setFromDate(dariTanggal);
    }
    if (sampaiTanggal) {
      setToDate(sampaiTanggal);
    }
    if (columnSearch) {
      setCode(columnSearch);
    }
    if (valueSearch) {
      setValueSearch(valueSearch);
    }
    if (cabang) {
      setMMCode(cabang);
    }
    if (startDates) {
      setStartDate(new Date(startDates));
    }
    if (endDates) {
      setEndDate(new Date(endDates));
    }

    if (kapals) {
      setKapal(kapals);
    }
    if (agens) {
      setAgentUserLogin(agens);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("dariTanggalRealisasiPemanduan", FromDate);
    sessionStorage.setItem("sampaiTanggalRealisasiPemanduan", ToDate);
    sessionStorage.setItem("codeColumnSearchRealisasiPemanduan", Code);
    sessionStorage.setItem("valueColumnSearchRealisasiPemanduan", ValueSearch);
    sessionStorage.setItem("cabangRealisasiPemanduan", MMCode);
    sessionStorage.setItem("startDateRealisasiPemanduan", startDate);
    sessionStorage.setItem("endDateRealisasiPemanduan", endDate);

    sessionStorage.setItem("kapalRealisasiPemanduan", Kapal);
    sessionStorage.setItem("agenRealisasiPemanduan", AgentUserLogin);

    sessionStorage.setItem("kapalRealisasiPemanduan", Kapal);
    sessionStorage.setItem("agenRealisasiPemanduan", AgentUserLogin);

    setViewValue(localStorage.getItem("username"));
    setViewBy(localStorage.getItem("id"));

    fetchData();
  }, [startDate, endDate, Code, ValueSearch, MMCode, Outstanding]);

  const data = useSelector((state) => state.Realisasi.data);
  const dataCabang = useSelector((state) => state.Dashboard.dataCabang);
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder);

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
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Realisasi Pemanduan
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
                    tipe={"realisasi"}
                  />
                </div>
                {/* <!-- End Accordion --> */}

                {/* <!-- Table --> */}
                <div className="px-3">
                  <table className="text-[10px] min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                      <tr className="text-center">
                        {/* <th rowSpan={3} className="border border-black"></th> */}
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-left border border-black"
                        >
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              no.
                            </span>
                          </div>
                        </th>
                        <th rowSpan={3} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              nama kapal
                            </span>
                          </div>
                        </th>

                        {/* <th rowSpan={3} className="border border-black">
                        <div className="flex justify-center gap-x-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            GERAKAN KAPAL 
                          </span>
                        </div>
                      </th> */}

                        <th colSpan={4} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GERAKAN KAPAL masuk
                            </span>
                          </div>
                        </th>

                        <th colSpan={4} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GERAKAN KAPAL pindah
                            </span>
                          </div>
                        </th>

                        <th colSpan={4} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GERAKAN KAPAL keluar
                            </span>
                          </div>
                        </th>
                      </tr>

                      <tr className="text-center">
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              MASUK
                            </span>
                          </div>
                        </th>
                        <th colSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              WAKTU
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JAM
                            </span>
                          </div>
                        </th>

                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PINDAH
                            </span>
                          </div>
                        </th>
                        <th colSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              WAKTU
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JAM
                            </span>
                          </div>
                        </th>

                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              KELUAR
                            </span>
                          </div>
                        </th>
                        <th colSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              WAKTU
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JAM
                            </span>
                          </div>
                        </th>
                      </tr>

                      <tr className="text-center">
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              MULAI
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              SELESAI
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              MULAI
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              SELESAI
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              MULAI
                            </span>
                          </div>
                        </th>
                        <th rowSpan={2} className="border border-black">
                          <div className="flex justify-center gap-x-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              SELESAI
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y overflow-y-auto divide-gray-200 dark:divide-gray-700">
                      {data?.datadetail?.length > 0 &&
                        data.datadetail.map((item, idx) => {
                          return (
                            <tr
                              key={idx}
                              className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                              onClick={() => setDetail(item)}
                            >
                              <td className="border border-black text-[10px] h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {idx + 1}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.NamaKapal}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TglBPPTMasuk}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.MulaiPanduMasuk &&
                                      new Date(
                                        item.MulaiPanduMasuk
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.MulaiPanduMasuk)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.SelesaiPanduMasuk &&
                                      new Date(
                                        item.SelesaiPanduMasuk
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.SelesaiPanduMasuk)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TotaljamPanduMasuk}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TanggalPindah}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.MulaiPanduPindah &&
                                      new Date(
                                        item.MulaiPanduPindah
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.MulaiPanduPindah)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.SelesaiPanduPindah &&
                                      new Date(
                                        item.SelesaiPanduPindah
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.SelesaiPanduPindah)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TotaljamPanduPindah}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TanggalKeluar}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.MulaiPanduKeluar &&
                                      new Date(
                                        item.MulaiPanduKeluar
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.MulaiPanduKeluar)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.SelesaiPanduKeluar &&
                                      new Date(
                                        item.SelesaiPanduKeluar
                                      ).getFullYear() > 2000
                                        ? sliceHour(item.SelesaiPanduKeluar)
                                        : ""}
                                    </span>
                                  </div>
                                </a>
                              </td>
                              <td className="border border-black h-px w-4 whitespace-nowrap">
                                <a
                                  className="block"
                                  href="#"
                                  data-hs-overlay="#hs-bg-gray-on-hover-cards"
                                >
                                  <div className="px-3 py-0">
                                    <span className="text-[10px] text-gray-600  dark:text-gray-400">
                                      {item.TotalJamPanduKeluar}
                                    </span>
                                  </div>
                                </a>
                              </td>
                            </tr>
                          );
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
                        {data?.datadetail?.length}
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

      <Detail detail={detail} tipe={"realisasi"} />
    </>
  );
};

export default RealisasiPemanduan;
