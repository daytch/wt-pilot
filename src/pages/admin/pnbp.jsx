import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportPNBP } from "../../redux/slices/pnbpSlice";
import {
  sliceHour,
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../../functions/index.js";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "../../components/Filter";
import Detail from "../../components/Detail";

const Pnbp = () => {
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem("userData"));
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("startDate")
      ? new Date(sessionStorage.getItem("startDate"))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("endDate")
      ? new Date(sessionStorage.getItem("endDate"))
      : new Date()
  );
  const dariPihak = UserData.UserType;
  const UserLogin = UserData.UserId;
  const [MMCode, setMMCode] = useState(sessionStorage.getItem("cabangPNBP"));
  const [Outstanding, setOutstanding] = useState("");
  const [Code, setCode] = useState(
    sessionStorage.getItem("codeColumnSearchPNBP") ?? ""
  );
  const [ValueSearch, setValueSearch] = useState("");
  const [isShowModal, setIsShowModal] = useState(true);
  const [ViewBy, setViewBy] = useState(dariPihak);
  const [ViewValue, setViewValue] = useState(UserData.UserName);
  const [FilterDate, setFilterDate] = useState("1");
  const [Status_Order, setStatus_Order] = useState("");
  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === "AGEN" ? UserLogin : ""
  );
  const [detail, setDetail] = useState({});
  
  var oldindex = "";
  const fetchData = () => {
    const url = `?ReportName=LAPORAN KEGIATAN PEMANDUAN DAN PENUNDAAN&CompanyName=PT WORLD TERMINALINDO&FromDate=${handleDateAPI(
      startDate
    )}&ToDate=${handleDateAPI(endDate)}&Cabang=${MMCode}&Agen=&Kapal=&Pemandu=`;

    dispatch(getReportPNBP(url));
  };

  const data = useSelector((state) => state.PNBP.data);
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
    sessionStorage.setItem("dariTanggalPNBP", startDate);
    sessionStorage.setItem("sampaiTanggalPNBP", endDate);
    sessionStorage.setItem("codeColumnSearchPNBP", Code);
    sessionStorage.setItem("valueColumnSearchPNBP", ValueSearch);
    sessionStorage.setItem("cabangPNBP", MMCode);
    sessionStorage.setItem("startDate", startDate);
    sessionStorage.setItem("endDate", endDate);

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
                <div className="px-3">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-slate-900">
                      <tr>
                        {/* <th rowSpan={3} ></th> */}
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              NO.
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              NAMA / KAPAL
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              NAMA TONGKANG
                            </span>
                          </div>
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              NO PKK
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              BENDERA
                            </span>
                          </div>
                        </th>
                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              SPESIFIKASI KAPAL
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PELABUHAN ASAL
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PELABUHAN TUJUAN
                            </span>
                          </div>
                        </th>

                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GERAKAN KAPAL
                            </span>
                          </div>
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              TUNDA
                            </span>
                          </div>
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PENDAPATAN
                            </span>
                          </div>
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PNBP
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JUMLAH PNBP
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              NOMOR INVOICE
                            </span>
                          </div>
                        </th>
                      </tr>

                      <tr>
                        {/* NO PKK */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GT KECIL
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GT BESAR
                            </span>
                          </div>
                        </th>

                        {/* SPESIFIKASI KAPAL */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              DWT
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              GT
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              LOA
                            </span>
                          </div>
                        </th>

                        {/* GERAKAN KAPAL*/}

                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              TANGGAL
                            </span>
                          </div>
                        </th>

                        {/* TUNDA */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              UNIT
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JUMLAH JAM
                            </span>
                          </div>
                        </th>

                        {/* TUNDA */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              UNIT
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              JAM
                            </span>
                          </div>
                        </th>

                        {/* PNBP */}
                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              5 %
                            </span>
                          </div>
                        </th>
                      </tr>

                      <tr>
                        {/* GERAKAN KAPAL TANGGAL */}
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              MASUK
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PINDAH
                            </span>
                          </div>
                        </th>
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              KELUAR
                            </span>
                          </div>
                        </th>

                        {/* PNBP 5% */}
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PEMANDUAN
                            </span>
                          </div>
                        </th>

                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-1 text-center border border-black"
                        >
                          <div className="flex items-center gap-x-2 justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                              PENUNDAAN
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
                              className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                              onClick={() => setDetail(item)}
                            >
                              <td className="border border-black h-px w-4 whitespace-nowrap">
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
                                      {item.NamaTongkang}
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
                                      {item.NoPKKGTKecil}
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
                                      {item.NoPKKGTBesar}
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
                                      {item.Bendera}
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
                                      {parseFloat(item.DWT)}
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
                                      {parseFloat(item.GRT)}
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
                                      {parseFloat(item.LOA)}
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
                                      {item.PelabuhanAsal}
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
                                      {item.PelabuhanTujuan}
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
                                      {item.MulaiPanduMasuk === "" ||
                                      item.MulaiPanduMasuk === null
                                        ? item.MulaiPanduMasuk
                                        : sliceHour(item.MulaiPanduMasuk)}
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
                                      {item.MulaiPanduPindah}
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
                                      {item.MulaiPanduKeluar === "" ||
                                      item.MulaiPanduKeluar === null
                                        ? item.MulaiPanduKeluar
                                        : sliceHour(item.MulaiPanduKeluar)}
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
                                      {item.JumlahUnitTundaKapal}
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
                                      {parseFloat(
                                        item.TotalJamTundaKapal
                                      ).toFixed(2)}
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
                                      {/* {item.JumlahUnitTundaKapal} */}
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
                                      {/* {item.TotalJamTundaKapal} */}
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
                                      {parseFloat(
                                        item.TotalNilaiPanduPNBP
                                      ).toFixed(2)}
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
                                      {parseFloat(
                                        item.TotalNilaiTundaPNBP
                                      ).toFixed(2)}
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
                                      {parseFloat(item.JumlahPNBP).toFixed(2)}
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
                                      {item.NomorInv}
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
                        {data.length}
                      </span>
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

        <Detail detail={detail} tipe={"pnbp"} />
      </div>
    </>
  );
};

export default Pnbp;
