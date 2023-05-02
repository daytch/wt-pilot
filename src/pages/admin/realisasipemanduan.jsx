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
  const [MMCode, setMMCode] = useState(UserData.MMCode)
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
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          no.
                        </th>
                        <th
                          rowSpan={3}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          nama kapal
                        </th>

                        {/* <th rowSpan={3} className="border border-black">
                        <div className="flex justify-center gap-x-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            GERAKAN KAPAL 
                          </span>
                        </div>
                      </th> */}

                        <th
                          colSpan={4}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GERAKAN KAPAL masuk
                        </th>

                        <th
                          colSpan={4}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GERAKAN KAPAL pindah
                        </th>

                        <th
                          colSpan={4}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GERAKAN KAPAL keluar
                        </th>
                      </tr>

                      <tr className="text-center">
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          MASUK
                        </th>
                        <th
                          colSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          WAKTU
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JAM
                        </th>

                        <th
                          rowSpan={2}
                          c
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PINDAH
                        </th>
                        <th
                          colSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          WAKTU
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JAM
                        </th>

                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          KELUAR
                        </th>
                        <th
                          colSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          WAKTU
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JAM
                        </th>
                      </tr>

                      <tr className="text-center">
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          MULAI
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          SELESAI
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          MULAI
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          SELESAI
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          MULAI
                        </th>
                        <th
                          rowSpan={2}
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          SELESAI
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
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {idx + 1}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.NamaKapal}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TglBPPTMasuk}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduMasuk &&
                                new Date(item.MulaiPanduMasuk).getFullYear() >
                                  2000
                                  ? sliceHour(item.MulaiPanduMasuk)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.SelesaiPanduMasuk &&
                                new Date(item.SelesaiPanduMasuk).getFullYear() >
                                  2000
                                  ? sliceHour(item.SelesaiPanduMasuk)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotaljamPanduMasuk}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TanggalPindah}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduPindah &&
                                new Date(item.MulaiPanduPindah).getFullYear() >
                                  2000
                                  ? sliceHour(item.MulaiPanduPindah)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.SelesaiPanduPindah &&
                                new Date(
                                  item.SelesaiPanduPindah
                                ).getFullYear() > 2000
                                  ? sliceHour(item.SelesaiPanduPindah)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotaljamPanduPindah}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TanggalKeluar}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduKeluar &&
                                new Date(item.MulaiPanduKeluar).getFullYear() >
                                  2000
                                  ? sliceHour(item.MulaiPanduKeluar)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.SelesaiPanduKeluar &&
                                new Date(
                                  item.SelesaiPanduKeluar
                                ).getFullYear() > 2000
                                  ? sliceHour(item.SelesaiPanduKeluar)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotalJamPanduKeluar}
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
                      </span>
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
      </div>

      <Detail detail={detail} tipe={"realisasi"} />
    </>
  );
};

export default RealisasiPemanduan;
