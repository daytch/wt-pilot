import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHeaderPPKB,
  getDetailPPKB,
  getHeaderPKK,
  getDetailPKK,
} from "../../redux/slices/ppkbSlice.js";
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../../functions/index.js";
import "react-datepicker/dist/react-datepicker.css";
import Filter from "../../components/Filter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

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
  const [Page, setPage] = useState([]);
  const [Page2, setPage2] = useState([]);
  const [notApproved, setNotApproved] = useState(false);

  var oldindex = "";
  // const fetchData = () => {
  //   const url =
  //     ValueSearch == null
  //       ? `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${handleDateAPI(
  //           startDate
  //         )}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`
  //       : `?ViewBy=${dariPihak}&ViewValue=${
  //           UserData.UserName
  //         }&FromDate=${handleDateAPI(
  //           startDate
  //         )}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch=${ValueSearch}&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`;

  //   dispatch(getDataPKKInaportnet(url));
  // };

  const dataHeaderPPKB = useSelector((state) => state.PPKB.dataHeaderPPKB);
  const dataDetailPPKB = useSelector((state) => state.PPKB.dataDetailPPKB);
  const dataHeaderPKK = useSelector((state) => state.PPKB.dataHeaderPKK);
  const dataDetailPKK = useSelector((state) => state.PPKB.dataDetailPKK);
  const isLoading = useSelector((state) => state.PPKB.loading);
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

  var max = 1;
  const fetchData = async () => {
    if (Outstanding === "1") {
      const url =
        ValueSearch === null
          ? `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${FromDate}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`
          : `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${FromDate}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch=${ValueSearch}&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`;

      dispatch(getHeaderPKK(url));
      // const response = await axios.get(url);
      // const data = await response.data;

      // if (data.data != null) {
      // setisLoading(false);
      // setPage(post);
      if (max > 0) {
        fetchData2(data.data[0]);
        max = max - 1;
      }

      // if (oldindex != "") {
      //   selectedRow(0);
      // }

      // if (data.data.length == 0) {
      //   const kosong = <tr></tr>;
      //   setPage2(kosong);
      // }
      // }
    } else {
      const urlppkb =
        ValueSearch == null
          ? `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${FromDate}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`
          : `?ViewBy=${ViewBy}&ViewValue=${ViewValue}&FromDate=${FromDate}&ToDate=${ToDate}&Filterdate=${FilterDate}&ColumnSearch=${Code}&ValueSearch=${ValueSearch}&Outstanding=${Outstanding}&Status_Order=${Status_Order}&UserLogin=${UserLogin}&AgentUserLogin=${AgentUserLogin}&MMCode=${MMCode}`;
      dispatch(getHeaderPPKB(urlppkb));
      // const responseppkb = await axios.get(urlppkb);
      // const datappkb = await responseppkb.data;

      // if (datappkb.data != null) {
      //   setisLoading(false);
      //   setPage(post);
      if (max > 0) {
        // fetchData2(datappkb.data[0]);
        max = max - 1;
      }

      if (oldindex != "") {
        selectedRow(0);
      }
      // }
    }
  };

  useEffect(() => {
    if (dataHeaderPPKB.length > 0) {
    }
  }, [dataHeaderPPKB]);

  useEffect(() => {
    if (dataHeaderPKK.length > 0) {
    }
  }, [dataHeaderPKK]);

  const fetchData2 = async (item) => {
    if (item !== undefined) {
      if (Outstanding === "1") {
        const nopkk = item.nomor_pkk;
        const url = `?Nomor_PKK=${nopkk}&Outstanding=${OutstandingRKBM}`;
        dispatch(getDetailPKK(url));
        // const response = await axios.get(url);
        // const data2 = await response.data;
        // setIsActive((current) => !current);

        // if (data2.data != null) {
        //   setisLoading(false);
        //   setPage2(post);
        // }
      } else {
        const noppkb = item.NoPPKB;
        const urldetailppkb = `?NoPPKB=${noppkb}`;
        dispatch(getDetailPPKB(urldetailppkb));

        // const responsedetailppkb = await axios.get(urldetailppkb);
        // const datadetailppkb = await responsedetailppkb.data;
        // setIsActive((current) => !current);

        if (datadetailppkb != null) {
          // setisLoading(false);
          // setPage2(postdetailppkb);
        }
      }
    }
  };

  const fetchDataInput = async () => {
    const nopkk = ppkb.nomor_pkk;
    const url = `api/get-detailrkbm?Nomor_PKK=${nopkk}&Outstanding=1`;

    const response = await axios.get(url);
    const datainput = await response.data;
    setIsActive((current) => !current);

    if (datainput.data != null) {
      // setisLoading(false);
      // setPageInput(post);
    }
  };

  const fetchEditPPKB = async (item) => {
    const noppkb = item.NoPPKB;
    const urldetailppkb = `api/get-detailppkb?NoPPKB=${noppkb}`;

    const responsedetailppkb = await axios.get(urldetailppkb);
    const datadetailppkb = await responsedetailppkb.data;
    setIsActive((current) => !current);

    if (datadetailppkb != null) {
      const postdetailppkb = datadetailppkb.data.map((item, index) => (
        <tr className={index % 2 == 0 ? "warnabiru " : "warnaputih"}>
          {/* <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <input
              type="checkbox"
              onClick={(e) => addOrRemoveRKBM(e, item.Oid)}
            ></input>
          </td> */}
          <td style={{ paddingLeft: "5px", paddingRight: "5px" }}>
            <button
              className="btn btn-danger"
              style={{ fontSize: "10px", padding: "2px 5px" }}
              onClick={(e) => handleDeleteDetailRKBMPPKB(noppkb, item)}
            >
              X
            </button>
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {index + 1}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.nama_barang}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.bahaya}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.ganggu}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.kegiatan}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {separateComma(parseFloat(item.unit).toFixed(2))}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {separateComma(parseFloat(item.ton).toFixed(2))}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {separateComma(parseFloat(item.m3).toFixed(2))}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.penyaluran}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.kade}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.pbm}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.npwp_pbm}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.consginee}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.shipper}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.npwp_shipper}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.no_bl}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {separateComma(parseFloat(item.gang).toFixed(2))}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {separateComma(parseFloat(item.palka).toFixed(2))}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.no_rkbm_bongkar}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.no_rkbm_muat}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.rencana_bongkar}
          </td>
          <td style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            {item.rencana_muat}
          </td>
        </tr>
      ));
      setisLoading(false);
      setPageEdit(postdetailppkb);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("dariTanggalJadwalKedatangan", startDate);
    sessionStorage.setItem("sampaiTanggalJadwalKedatangan", endDate);
    sessionStorage.setItem("codeColumnSearchJadwalKedatangan", Code);
    sessionStorage.setItem("valueColumnSearchJadwalKedatangan", ValueSearch);
    sessionStorage.setItem("cabangJadwalKedatangan", MMCode);
    // sessionStorage.setItem("startDate", startDate);
    // sessionStorage.setItem("endDate", endDate);

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

  useEffect(() => {
    console.log("notApproved:", notApproved);
  }, [notApproved]);

  const renderHeader = () => {
    return notApproved ? (
      <div>
        <h5>PKK</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table style={{ whiteSpace: "nowrap" }} id="table">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black"></th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>

                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PKK
                </th>

                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA PERUSAHAAN
                </th>

                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANDA PENDAFTARAN KAPAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA KAPAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAHKODA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GRT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LOA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS KAPAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TAHUN PEMBUATAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LEBAR KAPAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT MAX
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT DEPAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT BELAKANG
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT TENGAH
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS TRAYEK
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BENDERA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CALL SIGN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL ETA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL ETD
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE PELABUHAN ASAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN ASAL
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE PELABUHAN TUJUAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN TUJUAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE TUJUAN AKHIR PELABUHAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN TUJUAN AKHIR
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR TRAYEK
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DERMAGA NAMA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  STATUS BM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS BARANG
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH MUAT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PORT CODE
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  STATUS
                </th>

                {/* <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">Option</th> */}
              </tr>
            </thead>
            <tbody>
              {isLoading === true ? (
                <div
                  className="spinner-border modal-dialog text-primary"
                  role="status"
                  style={{ position: "absolute", left: "50%" }}
                ></div>
              ) : (
                Page
              )}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>
        <h5>PPKB</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table style={{ whiteSpace: "nowrap" }} id="table">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black"></th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>

                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PKK
                </th>

                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PPKB
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL PPKB
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PPK
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL RENCANA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JAM RENCANA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LOKASI
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KETERANGAN
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading === true ? (
                <div
                  className="spinner-border modal-dialog text-primary"
                  role="status"
                ></div>
              ) : (
                Page
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderDetail = () => {
    return notApproved ? (
      <div>
        <h5>RKBM</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table className="text-xs min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA BARANG
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BAHAYA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GANGGU
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  UNIT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TON
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  M3
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PENYALURAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KADE
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PBM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP PBM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CONSIGNEE
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  SHIPPER
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP SHIPPER
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR BILL OF LANDING
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH GANG (Kelompok Kerja)
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PALKA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM BONGKAR
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM MUAT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA BONGKAR
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA MUAT
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading === true ? (
                <div
                  className="spinner-border modal-dialog text-primary"
                  role="status"
                  style={{ position: "absolute", left: "50%" }}
                ></div>
              ) : (
                Page2
              )}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>
        <h5>DETAIL PPKB</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table className="text-xs min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA BARANG
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BAHAYA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GANGGU
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  UNIT TON
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  M3
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PENYALURAN
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KADE
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PBM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP PBM
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CONSIGNEE
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  SHIPPER
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP SHIPPER
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR BILL OF LANDING
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH GANG (Kelompok Kerja)
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PALKA
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM BONGKAR
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM MUAT
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA BONGKAR
                </th>
                <th className="text-xs whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA MUAT
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading === true ? (
                <div
                  className="spinner-border modal-dialog text-primary"
                  role="status"
                  style={{ position: "absolute", left: "50%" }}
                ></div>
              ) : (
                Page2
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border overflow-y-auto h-[50rem] border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
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
                    tipe="ppkb"
                    setNotApproved={setNotApproved}
                    notApproved={notApproved}
                  />
                </div>
                {/* <!-- End Accordion --> */}

                {/* <!-- Table --> */}
                {renderHeader(Outstanding)}
                {renderDetail(Outstanding)}
                {/* <!-- End Table --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}

        <div
          id="hs-bg-gray-on-hover-cards1"
          className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center py-1 px-2 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  Pengajuan Permintaan Pelayanan Kapal dan Barang
                </h3>
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  data-hs-overlay="#hs-bg-gray-on-hover-cards1"
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
                    <div className="grid gap-2">
                      <div className="grid gap-y-4">
                        <div className="grid md:grid-cols-3 gap-2">
                          <div>
                            <label
                              htmlFor="no_ppkb"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Nomor PPKB
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="no_ppkb"
                                name="no_ppkb"
                                placeholder="Nomor PPKB"
                                className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                required
                                aria-describedby="no_ppkb-error"
                              />
                              <div className="hidden absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                                <svg
                                  className="h-5 w-5 text-red-500"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                              </div>
                            </div>
                            <p
                              className="hidden text-xs text-red-600 mt-2"
                              id="no_ppkb-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="tgl_ppkb"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Tanggal PPKB
                            </label>
                            <div className="relative">
                              <DatePicker
                                wrapperClassName="wrapperdatePicker"
                                className="dateandtimepicker-hp py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Tanggal PPKB"
                                aria-describedby="tgl_ppkb-error"
                                id="tgl_ppkb"
                                name="tgl_ppkb"
                                // selected={TanggalPPKB}
                                // onChange={(e) => handleTanggalPPKB(e)}
                              />
                              <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                                <CalendarDaysIcon className="h-5 w-5" />
                              </div>
                            </div>
                            <p
                              className="hidden text-xs text-red-600 mt-2"
                              id="tgl_ppkb-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                          <div>
                            <label
                              htmlFor="no_pkk"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Nomor PKK
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="no_pkk"
                                name="no_pkk"
                                placeholder="Nomor PKK"
                                className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                disabled
                                aria-describedby="no_pkk-error"
                              />
                              <div className="hidden absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                                <svg
                                  className="h-5 w-5 text-red-500"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                  aria-hidden="true"
                                >
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                              </div>
                            </div>
                            <p
                              className="hidden text-xs text-red-600 mt-2"
                              id="email-error"
                            >
                              Please include a valid email address so we can get
                              back to you
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Tanggal Rencana
                            </label>
                            <div className="relative">
                              <DatePicker
                                wrapperClassName="wrapperdatePicker"
                                className="dateandtimepicker-hp py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                dateFormat="dd-MM-yyyy"
                                placeholderText="Tanggal PPKB"
                                aria-describedby="tgl_ppkb-error"
                                id="tgl_ppkb"
                                name="tgl_ppkb"
                                // selected={TanggalPPKB}
                                // onChange={(e) => handleTanggalPPKB(e)}
                              />
                              <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                                <CalendarDaysIcon className="h-5 w-5" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm mb-2 dark:text-white"
                            >
                              Jam Rencana
                            </label>
                            <div className="relative">
                              <DatePicker
                                // selected={JamRencana}
                                // onChange={(date) => handleJamRencana(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Pilih Jam"
                                dateFormat="HH:mm"
                                wrapperClassName="wrapperdatePicker"
                                placeholderText="Jam Rencana"
                                aria-describedby="jam_rencana-error"
                                className="datepicker py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              />
                              <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                                <ClockIcon className="h-5 w-5" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="lokasi"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            Lokasi
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="lokasi"
                              name="lokasi"
                              placeholder="Lokasi"
                              className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              required
                              aria-describedby="lokasi-error"
                            />
                            <div className="hidden absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="lokasi-error"
                          >
                            Please include a valid email address so we can get
                            back to you
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="kegiatan"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            Kegiatan
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="kegiatan"
                              name="kegiatan"
                              placeholder="Kegiatan"
                              className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              required
                              aria-describedby="kegiatan-error"
                            />
                            <div className="hidden absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="kegiatan-error"
                          >
                            Please include a valid email address so we can get
                            back to you
                          </p>
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm mb-2 dark:text-white"
                          >
                            Keterangan
                          </label>
                          <div className="relative">
                            <textarea
                              rows="3"
                              type="text"
                              id="keterangan"
                              name="keterangan"
                              placeholder="Keterangan"
                              className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              required
                              aria-describedby="keterangan-error"
                            ></textarea>
                            <div className="hidden absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="keterangan-error"
                          >
                            Please include a valid email address so we can get
                            back to you
                          </p>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="text-xs min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-slate-900">
                              <tr className="text-center">
                                <td></td>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NO
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NOMOR RKBM
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NAMA BARANG
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      BAHAYA
                                    </span>
                                  </div>
                                </th>

                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      GANGGU
                                    </span>
                                  </div>
                                </th>

                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      KEGIATAN
                                    </span>
                                  </div>
                                </th>

                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      UNIT
                                    </span>
                                  </div>
                                </th>

                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      TON
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      M3
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      PENYALURAN
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      KADE
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      PBM
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NPWP PBM
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      CONSIGNEE
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      SHIPPER
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NPWP SHIPPER
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NOMOR BILL OF LANDING
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      JUMLAH GANG (Kelompok Kerja)
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      PALKA
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NOMOR RKBM BONGKAR
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      NOMOR RKBM MUAT
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      RENCANA BONGKAR
                                    </span>
                                  </div>
                                </th>
                                <th className="border border-black">
                                  <div className="flex justify-center gap-x-2">
                                    <span className="text-xs px-2 font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                      RENCANA MUAT
                                    </span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isLoading === true ? (
                                <div
                                  className="spinner-border modal-dialog text-primary"
                                  role="status"
                                  style={{ position: "absolute", left: "50%" }}
                                ></div>
                              ) : null}
                            </tbody>
                          </table>
                        </div>

                        <button
                          type="submit"
                          className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ppkb;
