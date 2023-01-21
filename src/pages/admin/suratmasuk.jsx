import React, { useState, useMemo, useEffect, useRef } from "react";
import SearchBox from "../../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  useEffectOnce,
  convertDate,
  isEmptyNullOrUndefined,
} from "../../functions/index.js";
import { getInbox, postActionSurat } from "../../redux/slices/suratSlice.js";
import { toogleLoading } from "../../redux/slices/dashboardSlice.js";
import Pagination from "./../../components/Pagination";
import wording from "../../assets/wording.json";
import FileSaver from "file-saver";
import axios from "axios";
import {
  DocumentTextIcon,
  PaperAirplaneIcon,
  ForwardIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
let PageSize = 10;

const SuratMasuk = () => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [url, setUrl] = useState("");
  const role = JSON.parse(localStorage.getItem("userData")).role;

  const kepadaRef = useRef();
  const keteranganRef = useRef();

  useEffectOnce(() => {
    window.addEventListener("close.hs.overlay", (e) => {
      setUrl("");
      setDetail({});
      dispatch(getInbox());
    });
    dispatch(getInbox());
  });

  const inbox = useSelector((state) => state.Surat.inbox);
  const master = useSelector((state) => state.Surat.inbox);
  const loading = useSelector((state) => state.Surat.loading);
  const message = useSelector((state) => state.Surat.message);
  const error = useSelector((state) => state.Surat.error);
  const isSuccess = useSelector((state) => state.Surat.isSuccess);

  useEffect(() => {
    if (message) {
      MySwal.fire({
        title: <strong>Success!</strong>,
        html: message,
        icon: "success",
      });
      dispatch(toogleLoading(false));
    } else if (error) {
      MySwal.fire({
        title: <strong>Failed!</strong>,
        html: error,
        icon: "error",
      });
      dispatch(toogleLoading(false));
    }
    dispatch(getInbox());
  }, [message, error]);

  const changeUploadFile = async (e) => {
    dispatch(toogleLoading(true));
    e.preventDefault();
    const formData = new FormData();
    const image = e.target.files[0];

    if (image.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
      formData.append("file", image);
      formData.append("upload_preset", "pemkot_bitung");

      await axios
        .post("https://api.cloudinary.com/v1_1/daytch/image/upload", formData)
        .then((res) => {
          setUrl(res.data["secure_url"]);
          dispatch(toogleLoading(false));
        });
    } else {
      // let er = error;
      // er.lampiran = true;
      // setError(er);
      setError((prevState) => ({
        ...prevState,
        lampiran: true,
      }));
      dispatch(toogleLoading(false));
    }
  };

  useEffect(() => {
    setFilteredData(inbox);
  }, [inbox]);

  const currentTableData = useMemo(() => {
    let dt = [...inbox];
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
        if (x.status === role) {
          return x;
        }
      });
    }
    setTotalData(dt.length);
    if (dt.length > 1) {
      dt.sort(function (x, y) {
        return y.id - x.id;
      });
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dt.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, inbox, keywords]);

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
                      value={detail.nama || ""}
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
                      value={detail.nik || ""}
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
                      value={detail.no_hp || ""}
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
                      value={detail.email || ""}
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
                      value={detail.tujuan || ""}
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
                      value={detail.judul || ""}
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

  const renderModalForward = () => {
    return (
      <div
        id="modal-forward"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Action
              </h3>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#modal-forward"
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
                      htmlFor="tujuan"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Tujuan
                    </label>
                    <input
                      type="text"
                      value={detail.tujuan || ""}
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
                      value={detail.judul || ""}
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

                {role === "A" && (
                  <div>
                    <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                      <label
                        htmlFor="tujuan"
                        className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                      >
                        Kepada
                      </label>
                      <select
                        ref={kepadaRef}
                        defaultValue="0"
                        className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      >
                        <option value="0">Please Select</option>
                        <option value="B1">Admin Walikota</option>
                        <option value="B2">Admin Wakil Walikota</option>
                        <option value="B3">Admin Sekot</option>
                      </select>
                    </div>
                  </div>
                )}

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
                <hr />

                {role === "A" ? null : (
                  <input
                    onChange={changeUploadFile}
                    type="file"
                    name="small-file-input"
                    id="small-file-input"
                    className="bg-white block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                  />
                )}

                <div>
                  <div className="sm:inline-flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full">
                    <label
                      htmlFor="judul"
                      className="block text-sm font-medium mb-2 lg:w-32 dark:text-white"
                    >
                      Keterangan
                    </label>
                    <textarea
                      ref={keteranganRef}
                      id="keterangan"
                      className="lg:w-[31rem] py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Keterangan"
                      aria-describedby="keterangan"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                data-hs-overlay="#modal-forward"
              >
                Close
              </button>
              <a
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                href="#"
                onClick={handlePostAction}
              >
                Save changes
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   dispatch(toogleLoading(loading));

  //   if (isSuccess && !loading) {
  //     dispatch(getInbox());
  //   }
  // }, [loading]);

  const handlePostAction = () => {
    // if (url) {
    // dispatch(toogleLoading(true));
    let des =
      role !== "A"
        ? "F"
        : detail.tujuan.indexOf("sekot") > -1
        ? "B3"
        : detail.tujuan.indexOf("wakil") > -1
        ? "B2"
        : "B1";
    let payload = {
      id: Number(detail.id), // id surat
      destination:
        kepadaRef?.current?.value === "0" ||
        isEmptyNullOrUndefined(kepadaRef?.current)
          ? des
          : kepadaRef.current.value,
      keterangan: keteranganRef.current.value,
      lampiran: url,
    };
    let contentWA = "";
    if (role === "A") {
      delete payload.lampiran;
      contentWA = wording.tracking
        .replace("#url", window.location.origin)
        .replace("#no", detail.no_surat);
    } else {
      contentWA = wording.tracking.replace("#download", url);
    }

    dispatch(postActionSurat(payload));
    // dispatch(toogleLoading(false));
    // } else {
    //   MySwal.fire({
    //     title: <strong>Validation!</strong>,
    //     html: "Harap Masukkan foto atau hasil scan surat balasan.",
    //     icon: "warning",
    //   });
    // }
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6]">
      <p className="text-xl font-light my-4">
        Surat <span className="font-bold">Masuk</span>
      </p>
      {renderModal()}
      {renderModalForward()}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <SearchBox filteringData={filteringData} isReport={false} />
            <table className="min-w-full bg-white divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
                  >
                    No Surat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
                  >
                    Tujuan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
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
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
                  >
                    Pengirim
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-base font-bold text-gray-500 uppercase"
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
                        <div className="hs-tooltip inline-block [--placement:left] mx-1">
                          <a
                            className="hs-tooltip-toggle text-blue-500 hover:text-blue-700"
                            href="#"
                            data-hs-overlay="#modal-forward"
                            onClick={() => setDetail(item)}
                          >
                            {role === "A" ? (
                              <>
                                <ForwardIcon className="h-5 w-5 text-blue-500" />
                                <span
                                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                                  role="tooltip"
                                >
                                  Forward Document
                                </span>
                              </>
                            ) : (
                              <>
                                <PaperAirplaneIcon className="h-5 w-5 text-blue-500" />
                                <span
                                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-sm dark:bg-slate-700"
                                  role="tooltip"
                                >
                                  Reply Document
                                </span>
                              </>
                            )}
                          </a>
                        </div>
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

export default SuratMasuk;
