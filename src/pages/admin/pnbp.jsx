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
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          NO.
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          NAMA / KAPAL
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          NAMA TONGKANG
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          NO PKK
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          BENDERA
                        </th>
                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          SPESIFIKASI KAPAL
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PELABUHAN ASAL
                        </th>
                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PELABUHAN TUJUAN
                        </th>

                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GERAKAN KAPAL
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          TUNDA
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PENDAPATAN
                        </th>

                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PNBP
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JUMLAH PNBP
                        </th>

                        <th
                          rowSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          NOMOR INVOICE
                        </th>
                      </tr>

                      <tr>
                        {/* NO PKK */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GT KECIL
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GT BESAR
                        </th>

                        {/* SPESIFIKASI KAPAL */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          DWT
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          GT
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          LOA
                        </th>

                        {/* GERAKAN KAPAL*/}

                        <th
                          colSpan={3}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          TANGGAL
                        </th>

                        {/* TUNDA */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          UNIT
                        </th>

                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JUMLAH JAM
                        </th>

                        {/* TUNDA */}
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          UNIT
                        </th>
                        <th
                          rowSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          JAM
                        </th>

                        {/* PNBP */}
                        <th
                          colSpan={2}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          5 %
                        </th>
                      </tr>

                      <tr>
                        {/* GERAKAN KAPAL TANGGAL */}
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          MASUK
                        </th>
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PINDAH
                        </th>
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          KELUAR
                        </th>

                        {/* PNBP 5% */}
                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PEMANDUAN
                        </th>

                        <th
                          rowSpan={1}
                          scope="col"
                          className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                        >
                          PENUNDAAN
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
                                {item.NamaTongkang}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.NoPKKGTKecil};.
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.NoPKKGTBesar}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.Bendera}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.DWT ? parseFloat(item.DWT) : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.GRT ? parseFloat(item.GRT) : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.LOA ? parseFloat(item.LOA) : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.PelabuhanAsal}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.PelabuhanTujuan}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduMasuk === "" ||
                                item.MulaiPanduMasuk === null
                                  ? item.MulaiPanduMasuk
                                  : sliceHour(item.MulaiPanduMasuk)}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduPindah}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.MulaiPanduKeluar === "" ||
                                item.MulaiPanduKeluar === null
                                  ? item.MulaiPanduKeluar
                                  : sliceHour(item.MulaiPanduKeluar)}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.JumlahUnitTundaKapal}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotalJamTundaKapal
                                  ? parseFloat(item.TotalJamTundaKapal).toFixed(
                                      2
                                    )
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >{/* {item.JumlahUnitTundaKapal} */}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {/* {item.TotalJamTundaKapal} */}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotalNilaiPanduPNBP
                                  ? parseFloat(
                                      item.TotalNilaiPanduPNBP
                                    ).toFixed(2)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.TotalNilaiTundaPNBP
                                  ? parseFloat(
                                      item.TotalNilaiTundaPNBP
                                    ).toFixed(2)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.JumlahPNBP
                                  ? parseFloat(item.JumlahPNBP).toFixed(2)
                                  : ""}
                              </td>
                              <td
                                className="border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                {item.NomorInv}
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
