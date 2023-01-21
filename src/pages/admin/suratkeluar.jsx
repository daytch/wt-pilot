import React, { useState, useMemo, useEffect, useRef } from "react";
import SearchBox from "../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce, convertDate } from "../../functions/index.js";
import { getOutbox, postActionSurat } from "../../redux/slices/suratSlice.js";
import { toogleLoading } from "../../redux/slices/dashboardSlice.js";
import Pagination from "./../../components/Pagination";
import wording from "../../assets/wording.json";
import FileSaver from "file-saver";
import {
  DocumentTextIcon,
  PrinterIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import {
  PDFViewer,
  Page,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

let PageSize = 10;

const SuratKeluar = () => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [receipt, setReceipt] = useState(wording.tracking);
  const role = JSON.parse(localStorage.getItem("userData")).role;
  const userData = JSON.parse(localStorage.getItem("userData"));

  const kepadaRef = useRef();
  const keteranganRef = useRef();

  useEffectOnce(() => {
    dispatch(getOutbox());
  });

  const outbox = useSelector((state) => state.Surat.outbox);
  const master = useSelector((state) => state.Surat.outbox);
  const loading = useSelector((state) => state.Surat.loading);

  useEffect(() => {
    dispatch(toogleLoading(loading));
  }, [loading]);

  useEffect(() => {
    setFilteredData(outbox);
  }, [outbox]);

  const currentTableData = useMemo(() => {
    let dt = [...outbox];
    if (keywords) {
      dt = dt.filter((x) => {
        if (
          x.nama.toLowerCase().indexOf(keywords) > -1 ||
          x.judul.toLowerCase().indexOf(keywords) > -1 ||
          x.tujuan.toLowerCase().indexOf(keywords) > -1 ||
          x.nik.indexOf(keywords) > -1
        ) {
          return x;
        }
      });
    }
    if (role !== "A") {
      dt = dt.filter((x) => {
        if (
          x.suratLog.length > 0 &&
          x.suratLog.map((a) => a.status).indexOf(role) > -1
        ) {
          return x;
        }
      });
    }
    if (dt.length > 1) {
      dt.sort(function (x, y) {
        return y.id - x.id;
      });
    }
    setTotalData(dt.length);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dt.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, outbox, keywords]);

  const filteringData = (e) => {
    let keyword = e.currentTarget.value.toLowerCase();
    setKeywords(keyword);
  };

  const downloadFile = (url) => {
    var filename = url.split("/").pop();
    FileSaver.saveAs(url, filename);
  };

  const renderModal = () => {
    return (
      <div
        id="hs-vertically-centered-scrollable-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Detail Surat
              </h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-vertically-centered-scrollable-modal"
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
              <div className="space-y-4">
                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      value={detail.nama}
                      id="nama"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Nama"
                      aria-describedby="nama"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="nik"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      NIK
                    </label>
                    <input
                      type="number"
                      value={detail.nik}
                      id="nik"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="NIK"
                      aria-describedby="nik"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      No HP (WA)
                    </label>
                    <input
                      type="number"
                      value={detail.no_hp}
                      id="phone"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Phone"
                      aria-describedby="phone"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={detail.email}
                      id="email"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Email"
                      aria-describedby="email"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="tujuan"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Tujuan
                    </label>
                    <input
                      type="text"
                      value={detail.tujuan}
                      id="tujuan"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Tujuan"
                      aria-describedby="tujuan"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="judul"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Judul
                    </label>
                    <input
                      type="text"
                      value={detail.judul}
                      id="judul"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Judul"
                      aria-describedby="judul"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="lampiran"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Lampiran
                    </label>
                    <button
                      type="button"
                      onClick={() => downloadFile(detail.lampiran)}
                      className="lg:w-[31rem] py-2 px-3 block w-full justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(detail.lampiran, "_blank").focus()
                      }
                      className="lg:w-[31rem] py-2 px-3 block w-full justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="keterangan"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Keterangan
                    </label>
                    <textarea
                      disabled
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      rows="3"
                      value={
                        detail?.suratLog?.length > 0
                          ? detail.suratLog[detail.suratLog.length - 1]
                              .keterangan
                          : ""
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-vertically-centered-scrollable-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    header: {
      display: "flex",
      flexDirection: "column",
    },
  });

  const renderModalReceipt = () => {
    return (
      <div
        id="hs-scroll-inside-body-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] lg:max-w-[50vw]">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Modal title
              </h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-scroll-inside-body-modal"
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
              <PDFViewer width="700px" height="500px">
                <Document>
                  <Page style={styles.body}>
                    <View>
                      <Text>{receipt}</Text>
                    </View>
                  </Page>
                </Document>
              </PDFViewer>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-scroll-inside-body-modal"
              >
                Close
              </button>
              {/* <a
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                href="#"
              >
                Save changes
              </a> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlePostAction = () => {
    dispatch(toogleLoading(true));

    let payload = {
      id: Number(detail.id), // id surat
      destination: kepadaRef.current.value, // Admin Walikota
      keterangan: keteranganRef.current.value,
    };
    dispatch(postActionSurat(payload));
    dispatch(toogleLoading(false));
  };

  const mapStatus = {
    A: "Sedang diproses oleh Admin Umum",
    B1: "Sedang diproses oleh Admin Walikota",
    B2: "Sedang diproses oleh Admin Wakil Walikota",
    B3: "Sedang diproses oleh Admin Sekretaris Kota",
    F: "Sudah selesai di proses oleh pihak terkait",
  };

  const handleSendTandaTerima = (item) => {
    let payload = {
      id: Number(item.id), // id surat
      destination:
        role !== "A"
          ? "F"
          : item.tujuan.indexOf("sekot") > -1
          ? "B3"
          : item.tujuan.indexOf("wakil") > -1
          ? "B2"
          : "B1", // kepadaRef.current.value, // Admin Walikota
      keterangan: "", // keteranganRef.current.value,
      lampiran: item.lampiran,
    };

    let notif = "";

    if (role === "A") {
      notif = `*TANDA TERIMA ELEKTRONIK %0a
      WT Pilot PEMERINTAHAN KOTA BITUNG %0a
      HOTLINE WA : 0812333333333* %0a
      %0a
      %0a
      Nomor Registrasi 		: ${item.no_surat} %0a
      Tujuan 				: ${item.tujuan} %0a
      Tanggal Penerimaan ULA 	${convertDate(item.createdAt)} %0a
      ====================== %0a
      JENIS PELAYANAN ULA 		: SURAT UNDANGAN/PERTEMUAN/DATA/REKOMENDASI %0a
      ====================== %0a
      Operator  	: ${userData.email} %0a
      SCAN BARCODE %0a
      ====================== %0a
      %0a
      Silahkan cek secara berkala  pada tautan di bawah ini untuk mengetahui proses dokumen anda : https://ula-bitung.vercel.app/tracking?no=${
        item.no_surat
      } %0a
      #PemerintahanKotaBitung    #BitungMajudanSejahtera %0a
      `;
    } else {
      notif = `*TANDA TERIMA ELEKTRONIK PENERIMAAN DOKUMEN %0a 
        PEMERINTAHAN KOTA BITUNG*   %0a
        %0a
        Nomer Surat : %0a
        ${item.no_surat} %0a
        NIK : %0a
        ${item.nik} %0a
        %0a
        Tujuan : %0a
        ${item.tujuan} %0a
        %0a
        Terima : ${convertDate(item.createdAt)} %0a
        Selesai : ${item.tgl_selesai ? convertDate(item.tgl_selesai) : "-"} %0a
        %0a
        ====================== %0a
        JENIS SURAT : R/UR %0a
        %0a
        %0a
        ====================== %0a
        %0a
        %0a
        Status: Diterima %0a
        %0a
        Operator : ${userData.email} %0a
        ====================== %0a
        %0a
        Syarat dan ketentuan: %0a
        PERHATIAN : %0a
        1. Pengambilan Dokumen harap disertai Tanda Terima Digital ( WA/SMS/Email) %0a
        2. DOKUMEN yang tidak diambil selama 1 bulan, hilang / rusak tidak diganti %0a
        3. Harap Melakukan Pengecekan Dokumen Secara Berkala %0a
        %0a
        %0a 
        Terima Kasih %0a`;
    }
    window.open(
      "https://wa.me/" +
        (String(item.no_hp).substring(0, 1) === "0"
          ? Number("+62" + String(item.no_hp).substring(1))
          : item.no_hp) +
        "/?text=" +
        notif,
      "_blank"
    );
  };

  const handlePrintTandaTerima = (item) => {
    let contentWA = "";
    let ContentWording = wording.tracking;
    if (role === "A") {
      contentWA = ContentWording.replace(
        "#url",
        window.location.origin + "/tracking?no=" + item.no_surat
      );
    } else {
      ContentWording = wording.finished;
      contentWA = ContentWording.replace(
        "#download",
        item.suratAttachment[0].lampiran
      );
    }
    setReceipt(contentWA);
    // window.print();
  };

  return (
    <div className="print:hidden block p-6 rounded-lg shadow-lg bg-[#F3F4F6]">
      <p className="text-xl font-light my-4">
        Surat <span className="font-bold">Keluar</span>
      </p>
      {renderModalReceipt()}
      {renderModal()}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <div className="hidden print:block z-50">{receipt}</div>

            <SearchBox filteringData={filteringData} isReport={false} />
            <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase"
                  >
                    No Surat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase"
                  >
                    Tujuan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase"
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base text-center font-bold text-gray-500 uppercase"
                  >
                    NIK
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase"
                  >
                    Pengirim
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-bold text-gray-500 uppercase"
                  >
                    Tanggal Masuk
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentTableData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item.no_surat}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.tujuan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.judul}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.nik}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.nama}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {convertDate(item.createdAt)}
                      </td>
                      <td className="flex justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {role === "A" ? (
                          <>
                            <div className="hs-tooltip inline-block [--placement:left] mx-1">
                              <a
                                className="hs-tooltip-toggle text-blue-500 hover:text-blue-700"
                                href="#"
                                onClick={() => handleSendTandaTerima(item)}
                              >
                                <RocketLaunchIcon className="h-5 w-5 text-blue-500" />
                                <span
                                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                                  role="tooltip"
                                >
                                  Kirim Tanda Terima
                                </span>
                              </a>
                            </div>

                            <div className="hs-tooltip inline-block mx-1">
                              <a
                                className="hs-tooltip-toggle text-blue-500 hover:text-blue-700"
                                href="#"
                                data-hs-overlay="#hs-scroll-inside-body-modal"
                                onClick={() => handlePrintTandaTerima(item)}
                              >
                                <PrinterIcon className="h-5 w-5 text-blue-500" />
                                <span
                                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                                  role="tooltip"
                                >
                                  Cetak Tanda Terima
                                </span>
                              </a>
                            </div>
                          </>
                        ) : null}

                        <div className="hs-tooltip inline-block [--placement:right] mx-1">
                          <a
                            className="hs-tooltip-toggle text-blue-500 hover:text-blue-700"
                            href="#"
                            data-hs-overlay="#hs-vertically-centered-scrollable-modal"
                            onClick={() => setDetail(item)}
                          >
                            <DocumentTextIcon className="h-5 w-5 text-blue-500" />
                            <span
                              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                              role="tooltip"
                            >
                              View Document
                            </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <Pager /> */}
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalData}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratKeluar;
