import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getHeaderPPKB,
  getHeaderPPKBWeb,
  getDetailPPKB,
  getHeaderPKK,
  getDetailPKK,
  postDataPPKB,
  deleteDataPPKB,
  deleteDetailPPKB,
  selectedRowHeaderPPKB,
  selectedRowHeaderPPK,
  resetDataDetailPPK,
  resetDataDetailPPKB,
} from "../../redux/slices/ppkbSlice.js"
import { toogleLoading } from "../../redux/slices/dashboardSlice.js"
import {
  sliceHour,
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
  handleHourAPI,
  useEffectOnce,
} from "../../functions/index.js"
import "react-datepicker/dist/react-datepicker.css"
import Filter from "../../components/Filter"
import RightChevron from "../../assets/right-chevron.png"
import { ErrorMessage, SuccessMessage } from "../../components/Notification"
import ComboKegiatan from "../../components/ComboKegiatan.jsx"
import Datepicker from "../../components/Datepicker.jsx"
import ComboAreaPandu from "../../components/ComboAreaPandu.jsx"
// import ComboNomorPKKTongkang from "../../components/ComboNomorPKKTongkang.jsx"
import ComboNomorPKKTongkang from "../../components/ComboNomorPKKTongkang.jsx"

const Ppkb = () => {
  const dispatch = useDispatch()
  const UserData = JSON.parse(localStorage.getItem("userData"))
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem("dariTanggalPPKB")
      ? new Date(sessionStorage.getItem("dariTanggalPPKB"))
      : new Date()
  )
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem("sampaiTanggalPPKB")
      ? new Date(sessionStorage.getItem("sampaiTanggalPPKB"))
      : new Date()
  )
  const [detail, setDetail] = useState({})
  const dariPihak = UserData.UserType
  const UserLogin = UserData.UserId
  const UserType = UserData.UserType
  // const [MMCode, setMMCode] = useState(UserData.MMCode)
  const [MMCode, setMMCode] = useState(
    UserData.MMCode === "PST" ? "" : UserData.MMCode
  )
  const [Outstanding, setOutstanding] = useState("0")
  const [Code, setCode] = useState("")
  const [ValueSearch, setValueSearch] = useState("")
  const [isCreatedNew, setIsCreatedNew] = useState(false)
  const [ViewBy, setViewBy] = useState(dariPihak)
  const [ViewValue, setViewValue] = useState(UserData.UserName)
  // const tanggalHariini = handleDateAPI(new Date())
  // const [FromDate, setFromDate] = useState(tanggalHariini)
  // const [ToDate, setToDate] = useState(tanggalHariini)
  const [FilterDate, setFilterDate] = useState("1")
  // const [Status_Order, setStatus_Order] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === "AGEN" ? UserLogin : ""
  )
  // const [Page, setPage] = useState([])
  // const [Page2, setPage2] = useState([])
  const [notApproved, setNotApproved] = useState(false)
  const btnDetailRef = useRef()
  const modalRef = useRef()
  const btnDetailPKKRef = useRef()

  const tglRencanaRef = useRef()
  const jamRencanaRef = useRef()
  const tglPPKBRef = useRef()
  const areaPanduRef = useRef()
  const kegiatanRef = useRef()
  const NomorPKKTongkangRef = useRef()

  const [nomorPKK, setNomorPKK] = useState("")
  const [nomorPKKTongkang, setNomorPKKTongkang] = useState("")
  const [nomorRKBMBongkar, setNomorRKBMBongkar] = useState("")
  const [nomorRKBMuat, setNomorRKBMMuat] = useState("")
  const [nama_kapal, setNamaKapal] = useState("")
  const [nama_tongkang, setNamaTongkang] = useState("")
  const [nama_nahkoda, setNamaNahkoda] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [kodekegiatan, setKodeKegiatan] = useState("")
  const [kegiatan, setKegiatan] = useState("")
  const [kodelokasi, setKodeLokasi] = useState("")
  const [lokasi, setLokasi] = useState("")
  const [RKBMBongkar, setRKBMBongkar] = useState("")
  const [RKBMMuat, setRKBMMuat] = useState("")
  const [tglPPKB, setTglPPKB] = useState(new Date())
  const [tglRencana, setTglRencana] = useState(new Date())
  const [jamRencana, setJamRencana] = useState(new Date())

  const [noPPKB, setNoPPKB] = useState("")
  const [oid, setOid] = useState("")

  var oldindex = ""
  const dataHeaderPPKB = useSelector((state) => state.PPKB.dataHeaderPPKB)
  const dataDetailPPKB = useSelector((state) => state.PPKB.dataDetailPPKB)
  const dataHeaderPKK = useSelector((state) => state.PPKB.dataHeaderPKK)
  const dataDetailPKK = useSelector((state) => state.PPKB.dataDetailPKK)
  const isLoading = useSelector((state) => state.PPKB.loading)
  const error = useSelector((state) => state.PPKB.error)
  const message = useSelector((state) => state.PPKB.message)
  const loading = useSelector((state) => state.Dashboard.loading)
  const dataCabang = useSelector((state) => state.Dashboard.dataCabang)
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder)

  var firstLoad = true
  // console.log("dataDetailPPKB: ", dataDetailPPKB)
  useEffect(() => {
    if (dataHeaderPKK.length > 0) {
      getDetail(dataHeaderPKK[0])
    }
  }, [dataHeaderPKK])

  useEffect(() => {
    dispatch(toogleLoading(isLoading))
    if (!isEmptyNullOrUndefined(error)) {
      ErrorMessage("", error)
    }
    if (!isEmptyNullOrUndefined(message)) {
      SuccessMessage("", message)
      fetchData()
    }
  }, [isLoading, error, message])

  useEffect(() => {
    setOutstanding(notApproved ? 1 : 0)
    setFilterDate(notApproved ? 0 : 1)
  }, [notApproved])

  useEffect(() => {
    if (modalRef.current.classList.value) {
      setIsModalOpen(modalRef.current.classList.value.indexOf("hidden") === -1)
    }
  }, [modalRef.current?.classList])

  useEffect(() => {
    if (dataCabang?.length > 0 && isEmptyNullOrUndefined(MMCode)) {
      setMMCode(dataCabang[0].MMCode)
    }
    if (dataSalesOrder?.length > 0 && isEmptyNullOrUndefined(Code)) {
      setCode(dataSalesOrder[0].Code)
    }
  }, [dataCabang, dataSalesOrder])

  const searchData = () => {
    fetchData("search")
  }

  var max = 1
  const fetchData = async (e) => {
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

    dispatch(getHeaderPPKBWeb(url))

    if (max > 0) {
      // getDetail(datappkb.data[0]);
      max = max - 1
    }

    if (oldindex != "") {
      selectedRow(0)
    }
    if (e === "search") {
      if (firstLoad) {
        btnDetailRef.current.click()
        firstLoad = false
      }
    }
  }

  console.log("nomorPKK (ppkb.jsx):", nomorPKK)

  useEffect(() => {
    // console.log("detail: ", detail)
    setNomorPKK(detail?.nomor_pkk)
    if (Outstanding === 0 || Outstanding === "0") {
      setKeterangan(detail?.Keterangan)

      NomorPKKTongkangRef.current.value = detail?.nomorPKKTongkang
      kegiatanRef.current.value = detail?.Kode_Kegiatan
      areaPanduRef.current.value = detail?.Kode_Lokasi
      setNomorPKKTongkang(detail?.nama_pkk_tongkang)
      setNomorRKBMBongkar(detail?.nomor_rkbm_bongkar)
      setNomorRKBMMuat(detail?.nomor_rkbm_muat)
      setNamaKapal(detail?.nama_kapal)
      setNamaTongkang(detail?.nama_tongkang)
      setNamaNahkoda(detail?.nama_nahkoda)
      setKodeLokasi(detail?.Kode_Lokasi)
      setLokasi(detail?.Lokasi)
      setKodeKegiatan(detail?.Kode_Kegiatan)
      setKegiatan(detail?.Kegiatan)
      setTglPPKB(detail?.TglPPKB)
      setTglRencana(detail?.TglRencana)
      setJamRencana(detail?.JamRencana)
      setNoPPKB(detail?.NoPPKB)
      setOid(detail?.Oid)
      console.log("detail: ", detail)
    } else {
      resetModal()
    }
  }, [detail])

  useEffect(() => {
    const itm =
      Outstanding === 1
        ? dataDetailPKK.filter((itm) => itm.isSelected)
        : dataDetailPPKB.filter((itm) => itm.isSelected)
    if (itm.length > 0) {
      setDetail(itm[0])
    }
  }, [isCreatedNew])

  const getDetail = async (item) => {
    if (Outstanding === 1) {
      if (item) {
        const url = `?Nomor_PKK=${item.nomor_pkk}&Outstanding=${Outstanding}`
        dispatch(getDetailPKK(url))
      }
    } else {
      const noppkb = item.NoPPKB
      const urldetailppkb = `?NoPPKB=${noppkb}`
      dispatch(getDetailPPKB(urldetailppkb))
    }
  }

  // console.log("Outstanding:", Outstanding)
  useEffect(() => {
    sessionStorage.setItem("dariTanggalPPKB", startDate)
    sessionStorage.setItem("sampaiTanggalPPKB", endDate)
    sessionStorage.setItem("codeColumnSearchPPKB", Code)
    sessionStorage.setItem("valueColumnSearchPPKB", ValueSearch)
    sessionStorage.setItem("cabangPPKB", MMCode)

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
    firstLoad = false
    fetchData()
  }, [startDate, endDate, Code, ValueSearch, MMCode, Outstanding])

  const [allRKBM, setAllRKBM] = useState([])
  const onClickOpenDetail = (item) => {
    // console.log("1")
    var newData = Outstanding === 1 ? dataHeaderPKK : dataHeaderPPKB
    const dt = newData.map((elm) => {
      let it = { ...elm }

      it.isSelected = it.idx === item.idx // it?.nomor_pkk === item?.nomor_pkk
      return it
    })
    if (Outstanding === 1) {
      dispatch(selectedRowHeaderPPK(dt))
    } else {
      dispatch(selectedRowHeaderPPKB(dt))
    }
    setIsModalOpen(true)
    setDetail(item)
    getDetail(item)
  }
  useEffect(() => {
    if (
      dataDetailPPKB.length > 0 &&
      (Outstanding === "0" || Outstanding === 0)
    ) {
      var newArr = []
      dataDetailPPKB.forEach((item) => {
        newArr.push(item.Oid)
      })
      setAllRKBM(newArr)
    }
  }, [dataDetailPPKB])

  const onDbClickOpenDetail = (item) => {
    var newData = Outstanding === 1 ? dataHeaderPKK : dataHeaderPPKB
    const dt = newData.map((elm) => {
      let it = { ...elm }
      it.isSelected = it?.nomor_pkk === item?.nomor_pkk
      return it
    })

    if (Outstanding === 1 || Outstanding === "1") {
      resetModal()
      dispatch(selectedRowHeaderPPK(dt))
    } else {
      dataDetailPPKB.forEach((item) => {
        allRKBM.push(item.Oid)
      })
      dispatch(selectedRowHeaderPPKB(dt))
    }
    setIsModalOpen(true)
    // setDetail(item)
    // getDetail(item)

    // setIsCreatedNew(true)
    // if (Outstanding === 0) {
    btnDetailRef.current.click()
    // }
  }

  const renderHeader = () => {
    return notApproved ? (
      <div className="px-3">
        <h5>PKK</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table style={{ whiteSpace: "nowrap" }} id="table">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black"></th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  ACTION
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PKK
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA PERUSAHAAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANDA PENDAFTARAN KAPAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA KAPAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAHKODA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GRT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LOA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS KAPAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TAHUN PEMBUATAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LEBAR KAPAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT MAX
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT DEPAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT BELAKANG
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DRAFT TENGAH
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS TRAYEK
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BENDERA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CALL SIGN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL ETA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL ETD
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE PELABUHAN ASAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN ASAL
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE PELABUHAN TUJUAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN TUJUAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KODE TUJUAN AKHIR PELABUHAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PELABUHAN TUJUAN AKHIR
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR TRAYEK
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  DERMAGA NAMA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  STATUS BM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JENIS BARANG
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH MUAT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PORT CODE
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {dataHeaderPKK &&
                dataHeaderPKK.map((item, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={
                        "dark:odd:bg-slate-900 dark:even:bg-slate-800" +
                        (item.isSelected
                          ? " even:bg-slate-400 odd:bg-slate-400"
                          : " even:bg-white odd:bg-[#C0C0FD]")
                      }
                      onClick={() => onClickOpenDetail(item)}
                    >
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.isSelected && <img src={RightChevron} />}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        <button
                          type="button"
                          className="text-[10px] px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
                          onClick={() => onDbClickOpenDetail(item)}
                        >
                          input
                        </button>
                      </td>
                      <td className="text-right border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {idx + 1}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nomor_pkk}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nama_perusahaan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.npwp}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.tanda_pendaftaran_kapal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.tanda_pendaftaran_kapal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nama_kapal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nahkoda}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.drt).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.grt).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.loa).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.jenis_kapal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.tahun_pembuatan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.lebar_kapal).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.draft_max).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.draft_depan).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.draft_tengah).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.jenis_trayek}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.bendera}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.call_sign}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {sliceHour(item.tanggal_eta)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {sliceHour(item.tanggal_etd)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.kode_pelabuhan_asal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.pelabuhan_asal}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.kode_pelabuhan_tujuan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.pelabuhan_tujuan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.kode_tujuan_akhir_pelabuhan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.pelabuhan_tujuan_akhir}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nomor_trayek}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.dermaga_nama}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.status_bm}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.jenis_barang}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.jumlah_muat).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.port_code}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.status}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="px-3">
        <h5>PPKB</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table style={{ whiteSpace: "nowrap" }} id="table">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
              <tr className="sticky top-0 text-center">
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black"></th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  ACTION
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>

                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PPKB
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL PPKB
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PKK
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR PPK
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TANGGAL RENCANA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JAM RENCANA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  LOKASI
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KETERANGAN
                </th>
              </tr>
            </thead>
            <tbody>
              {Outstanding === 1 && dataHeaderPPKB?.length > 0
                ? dataHeaderPPKB.map((item, idx) => {
                    return (
                      <tr
                        key={idx}
                        className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                        onClick={(e) => onClickOpenDetail(item)}
                      >
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.isSelected && <img src={RightChevron} />}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          <button
                            type="button"
                            className="text-[10px] px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
                            onClick={() => onDbClickOpenDetail(item)}
                          >
                            edit
                          </button>
                        </td>
                        <td className="text-right border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer">
                          {idx + 1}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nomor_pkk}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nama_perusahaan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.npwp}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.tanda_pendaftaran_kapal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.tanda_pendaftaran_kapal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nama_kapal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nahkoda}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.drt).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.grt).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.loa).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.jenis_kapal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.tahun_pembuatan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.lebar_kapal).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.draft_max).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.draft_depan).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.draft_tengah).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.jenis_trayek}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.bendera}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.call_sign}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {sliceHour(item.tanggal_eta)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {sliceHour(item.tanggal_etd)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.kode_pelabuhan_asal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.pelabuhan_asal}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.kode_pelabuhan_tujuan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.pelabuhan_tujuan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.kode_tujuan_akhir_pelabuhan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.pelabuhan_tujuan_akhir}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nomor_trayek}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.dermaga_nama}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.status_bm}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.jenis_barang}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.port_code}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.status}
                        </td>
                      </tr>
                    )
                  })
                : Outstanding !== 1 && dataHeaderPPKB?.length > 0
                ? dataHeaderPPKB.map((item, idx) => {
                    return (
                      <tr
                        key={idx}
                        className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                        onClick={(e) => onClickOpenDetail(item)}
                      >
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.isSelected && <img src={RightChevron} />}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          <button
                            type="button"
                            className="text-[10px] px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800"
                            onClick={() => onDbClickOpenDetail(item)}
                          >
                            edit
                          </button>
                        </td>
                        <td className="text-right border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {idx + 1}
                        </td>

                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.NoPPKB}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.TglPPKB}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nomor_pkk}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {/* {item.nahkoda} */}
                        </td>

                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.TglRencana}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.JamRencana}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.Lokasi}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.Kegiatan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.Keterangan}
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderDetail = () => {
    return notApproved ? (
      <div className="px-3">
        <h5>RKBM</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table className="text-[10px] min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA BARANG
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BAHAYA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GANGGU
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  UNIT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  TON
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  M3
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PENYALURAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KADE
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PBM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP PBM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CONSIGNEE
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  SHIPPER
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP SHIPPER
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR BILL OF LANDING
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH GANG (Kelompok Kerja)
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PALKA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM BONGKAR
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM MUAT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA BONGKAR
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA MUAT
                </th>
              </tr>
            </thead>
            <tbody>
              {dataDetailPKK &&
                dataDetailPKK.map((item, idx) => {
                  return (
                    <tr
                      key={idx}
                      className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                      onClick={(e) => setDetail(item)}
                    >
                      <td className="text-right border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {idx + 1}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.noRKBM}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.nama_barang}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.bahaya}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.ganggu}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.kegiatan}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.unit)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.ton)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.m3).toFixed(2)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.penyaluran}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.kade}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.pbm}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.npwp_pbm}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.consignee}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.shipper}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.npwp_shipper}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.noRKBM}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.gang)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {parseFloat(item.palka)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.no_rkbm_bongkar}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {item.no_rkbm_muat}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {sliceHour(item.rencana_bongkar)}
                      </td>
                      <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                        {sliceHour(item.rencana_muat)}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="px-3">
        <h5>DETAIL PPKB</h5>
        <div
          className="rounded-0"
          style={{ maxWidth: "100%", overflow: "auto", maxHeight: "30vh" }}
        >
          <table className="text-[10px] min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
              <tr className="text-center">
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NO
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NAMA BARANG
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  BAHAYA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  GANGGU
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KEGIATAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  UNIT TON
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  M3
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PENYALURAN
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  KADE
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PBM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP PBM
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  CONSIGNEE
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  SHIPPER
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NPWP SHIPPER
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR BILL OF LANDING
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  JUMLAH GANG (Kelompok Kerja)
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  PALKA
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM BONGKAR
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  NOMOR RKBM MUAT
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA BONGKAR
                </th>
                <th className="text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black">
                  RENCANA MUAT
                </th>
              </tr>
            </thead>
            <tbody>
              {dataDetailPPKB.length > 0
                ? dataDetailPPKB.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                      >
                        <td className="text-right border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {index + 1}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.nama_barang}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.bahaya}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.ganggu}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.kegiatan}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.unit).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.ton).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.m3).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.penyaluran}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.kade}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.pbm}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.npwp_pbm}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.consginee}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.shipper}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.npwp_shipper}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.no_bl}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.gang).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {parseFloat(item.palka).toFixed(2)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.no_rkbm_bongkar}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {item.no_rkbm_muat}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {datetimeToString(item.rencana_bongkar)}
                        </td>
                        <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                          {datetimeToString(item.rencana_muat)}
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderDetailModalPKK = () => {
    return (
      <tbody>
        {dataDetailPKK.length > 0
          ? dataDetailPKK.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                >
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      onClick={(e) => addOrRemoveRKBM(e, item.Oid)}
                    />
                  </td>

                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {index + 1}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.nama_barang}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.bahaya}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.ganggu}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.kegiatan}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {parseFloat(item.unit).toFixed(2)}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {parseFloat(item.ton).toFixed(2)}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {parseFloat(item.m3).toFixed(2)}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.penyaluran}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.kade}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.pbm}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.npwp_pbm}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.consginee}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.shipper}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.npwp_shipper}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.no_bl}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {parseFloat(item.gang).toFixed(2)}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {parseFloat(item.palka).toFixed(2)}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.no_rkbm_bongkar}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.no_rkbm_muat}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.rencana_bongkar}
                  </td>
                  <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                    {item.rencana_muat}
                  </td>
                </tr>
              )
            })
          : null}
      </tbody>
    )
  }

  const handleDeleteDetailPPKB = (item) => {
    const urldelete = `?NoPPKB=${detail.NoPPKB}&NoRKBMDetil_Oid=${item.Oid}`
    dispatch(deleteDetailPPKB(urldelete))
    const no = allRKBM.indexOf(item)
    allRKBM.splice(no, 1)
    getDetail(detail)
  }

  const renderDetailModalPPKB = () => {
    return (
      <tbody>
        {dataDetailPPKB.length > 0 &&
          dataDetailPPKB.map((item, index) => {
            return (
              <tr
                key={index}
                className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
              >
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  <button
                    onClick={() => handleDeleteDetailPPKB(item)}
                    type="button"
                    className="text-[10px] py-0 px-1 inline-flex justify-center items-center gap-2 rounded-md bg-red-100 border border-transparent font-semibold text-red-500 hover:text-white hover:bg-red-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    X
                  </button>
                </td>

                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {index + 1}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.nama_barang}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.bahaya}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.ganggu}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.kegiatan}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {parseFloat(item.unit).toFixed(2)}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {parseFloat(item.ton).toFixed(2)}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {parseFloat(item.m3).toFixed(2)}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.penyaluran}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.kade}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.pbm}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.npwp_pbm}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.consginee}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.shipper}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.npwp_shipper}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.no_bl}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {parseFloat(item.gang).toFixed(2)}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {parseFloat(item.palka).toFixed(2)}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.no_rkbm_bongkar}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.no_rkbm_muat}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.rencana_bongkar}
                </td>
                <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 px-1.5 cursor-pointer">
                  {item.rencana_muat}
                </td>
              </tr>
            )
          })}
      </tbody>
    )
  }
  const addOrRemoveRKBM = (event, item) => {
    if (event.target.checked) {
      var newArr = allRKBM
      newArr.push(item)
      setAllRKBM(newArr)
    } else {
      var newArr = allRKBM
      const no = newArr.indexOf(item)
      newArr.splice(no, 1)
      setAllRKBM(newArr)
    }
    // setIsTableChecked((current) => !current)
  }
  const handleSaveInputData = () => {
    var trString = tglRencanaRef.current.input.value.split("-")
    var tbString = tglPPKBRef.current.input.value.split("-")

    const tr = handleDateAPI(
      new Date(+trString[2], trString[1] - 1, +trString[0])
    )
    const jr = jamRencanaRef.current.input.value
    const tb = handleDateAPI(
      new Date(+tbString[2], tbString[1] - 1, +tbString[0])
    )

    const kode_lokasi = areaPanduRef.current.value
    const lokasi = areaPanduRef.current.selectedOptions[0].text

    const kode_kegiatan = kegiatanRef.current.value
    const keg = kegiatanRef.current.selectedOptions[0].text

    allRKBM.forEach(async (e) => {
      const url = `?NomorPKK=${nomorPKK}&NoPPKB=${
        noPPKB ? noPPKB : ""
      }&TglPPKB=${tb}&NoRKBM_Oid=${e}&TglRencana=${tr}&JamRencana=${jr}&Lokasi=${lokasi}&Kode_Lokasi-${kode_lokasi}&Kegiatan=${keg}&Kode_Kegiatan=${kode_kegiatan}&Keterangan=${
        isEmptyNullOrUndefined(keterangan) ? "" : keterangan
      }&UserId=${UserLogin}`
      dispatch(postDataPPKB(url))
    })
    firstLoad = true
    if (isModalOpen) {
      btnDetailRef.current.click()
      setIsModalOpen(false)
      resetModal()
      // setNoPPKB("")
      // setLokasi("")
      // setKodeKegiatan("")
      // setKegiatan("")
      // setKeterangan("")
    }
  }

  const handleSaveData = () => {
    var trString = tglRencanaRef.current.input.value.split("-")
    var tbString = tglPPKBRef.current.input.value.split("-")

    const tr = handleDateAPI(
      new Date(+trString[2], trString[1] - 1, +trString[0])
    )
    const jr = jamRencanaRef.current.input.value
    const tb = handleDateAPI(
      new Date(+tbString[2], tbString[1] - 1, +tbString[0])
    )

    const lokasiId = areaPanduRef.current.value
    const lokasiText = areaPanduRef.current.selectedOptions[0].text

    const kegId = kegiatanRef.current.value
    const kegText = kegiatanRef.current.selectedOptions[0].text

    allRKBM.forEach(async (e) => {
      const urledit = `?NomorPKK=${nomorPKK}&NoPPKB=${noPPKB}&TglPPKB=${tb}&NoRKBM_Oid=${e}&TglRencana=${tr}&JamRencana=${jr}&Kode_Lokasi=${lokasiId}&Lokasi=${lokasiText}&Kode_Kegiatan=${kegId}&Kegiatan=${kegText}&Keterangan=${
        isEmptyNullOrUndefined(keterangan) ? "" : keterangan
      }&UserId=${UserLogin}`
      dispatch(postDataPPKB(urledit))
    })
    if (isModalOpen) {
      btnDetailRef.current.click()
      setIsModalOpen(false)
      resetModal()
    }
    // setNoPPKB("")
    // setLokasi("")
    // setKodeKegiatan("")
    // setKegiatan("")
    // setKeterangan("")
  }

  const handleDeleteDataPPKB = async () => {
    dispatch(deleteDataPPKB(`?NoPPKB=${noPPKB}`))
    fetchData()
    if (isModalOpen) {
      btnDetailRef.current.click()
      setIsModalOpen(false)
      resetModal()
    }
  }

  useEffect(() => {
    resetModal()
  }, [isModalOpen])

  const resetModal = () => {
    if (!isModalOpen) {
      if (Outstanding === "1" || Outstanding === 1) {
        dispatch(resetDataDetailPPKB())
      } else {
        setNomorPKK("")
        dispatch(resetDataDetailPPK())
      }
      setKeterangan("")
      areaPanduRef.current.value = ""
      kegiatanRef.current.value = ""
      setKodeLokasi("")
      setLokasi("")
      setKodeKegiatan("")
      setKegiatan("")
      setTglPPKB("")
      setTglRencana("")
      setJamRencana("")
      setNoPPKB("")
      setOid("")
    }
  }

  return (
    <>
      <div className="max-w-[85rem] py-3 mx-auto">
        <button
          ref={btnDetailRef}
          data-hs-overlay="#hs-bg-gray-on-hover-cards1"
          hidden
        >
          detail
        </button>
        {/* <!-- Card --> */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border overflow-y-auto h-[50rem] border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
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
                    tipe="ppkb"
                    setNotApproved={setNotApproved}
                    notApproved={notApproved}
                    setIsCreatedNew={setIsCreatedNew}
                    isCreatedNew={isCreatedNew}
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
          ref={modalRef}
          id="hs-bg-gray-on-hover-cards1"
          className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:w-[80vw] my-auto lg:mx-auto">
            <div className="flex justify-between items-center w-[80vw] flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between w-[80vw] items-center py-1 px-2 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  Permintaan Pelayanan Kapal dan Barang (MODUS{" "}
                  {Outstanding === 1 ? "TAMBAH" : "UBAH"}).
                </h3>
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-[10px] dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                  data-hs-overlay="#hs-bg-gray-on-hover-cards1"
                  onClick={() => {
                    setIsModalOpen(false)
                    resetModal()
                  }}
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
                    <div className="flex justify-end">
                      <div className="row" style={{ marginLeft: "5px" }}>
                        <button
                          className="mr-3 py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-[10px] dark:focus:ring-offset-gray-800"
                          onClick={(e) => {
                            if (Outstanding === 1) {
                              handleSaveInputData(e)
                            } else {
                              handleSaveData(e)
                            }
                          }}
                        >
                          Simpan
                        </button>
                        {Outstanding === 0 || Outstanding === "0" ? (
                          <button
                            className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-[10px] dark:focus:ring-offset-gray-800"
                            onClick={(e) => handleDeleteDataPPKB(e)}
                          >
                            Hapus Data
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid gap-y-4">
                        <div className="grid md:grid-cols-3 gap-2">
                          <div>
                            <label
                              htmlFor="no_ppkb"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nomor PPKB
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="no_ppkb"
                                name="no_ppkb"
                                placeholder="Nomor PPKB"
                                className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                disabled={
                                  Outstanding === 0 || Outstanding === "0"
                                }
                                value={noPPKB}
                                onChange={(e) => setNoPPKB(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="tgl_ppkb"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Tanggal PPKB
                            </label>
                            <Datepicker
                              tipe="date"
                              placeholderText="Tanggal PPKB"
                              id="tgl_ppkb"
                              name="tgl_ppkb"
                              selected={
                                tglPPKB ? new Date(tglPPKB) : new Date()
                              }
                              onChange={(e) => setTglPPKB(e)}
                              compRef={tglPPKBRef}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="no_pkk"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nomor PKK Kapal
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="no_pkk"
                                name="no_pkk"
                                placeholder="Nomor PKK"
                                onChange={(e) => nomorPKK(e.target.value)}
                                className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                disabled
                                defaultValue={nomorPKK}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-2">
                            <label
                              htmlFor="nama_kapal"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nama Kapal
                            </label>

                            {/* <div className="relative"> */}
                            <input
                              type="text"
                              id="nama_kapal"
                              name="nama_kapal"
                              // placeholder="Nama Kapal"
                              onChange={(e) => nama_kapal(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled
                              defaultValue={nama_kapal}
                            />

                            <label
                              htmlFor="nama_kapal"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nama Tongkang
                            </label>

                            {/* <div className="relative"> */}
                            <input
                              type="text"
                              id="nama_tongkang"
                              name="nama_tongkang"
                              // placeholder="Nama Tongkang"
                              onChange={(e) => nama_tongkang(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled
                              defaultValue={nama_tongkang}
                            />

                            <label
                              htmlFor="nama_nahkoda"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nama Nahkoda
                            </label>

                            {/* <div className="relative"> */}
                            <input
                              type="text"
                              id="nama_nahkoda"
                              name="nama_nahkoda"
                              // placeholder="Nama Tongkang"
                              onChange={(e) => nama_nahkoda(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled
                              defaultValue={nama_nahkoda}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-2">
                            <label
                              htmlFor="nama_nahkoda"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Nomor PKK Tongkang
                            </label>

                            <div className="relative">
                              <ComboNomorPKKTongkang
                                MMCode={MMCode}
                                NomorPKKSelected={nomorPKK}
                                NomorPKKTongkangRef={NomorPKKTongkangRef}
                                nomorPKKTongkang={nomorPKKTongkang}
                                setNomorPKKTongkang={setNomorPKKTongkang}
                              />
                            </div>

                            <label
                              htmlFor="rkbm_bongkar"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              No. RKBM Bongkar
                            </label>
                            <input
                              type="text"
                              id="rkbm_bongkar"
                              name="rkbm_bongkar"
                              // placeholder="Nama Kapal"
                              onChange={(e) => setRKBMBongkar(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              // disabled
                              defaultValue={RKBMBongkar}
                            />

                            <label
                              htmlFor="rkbm_muat"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              No. RKBM Muat
                            </label>
                            <input
                              type="text"
                              id="rkbm_muat"
                              name="rkbm_muat"
                              // placeholder="Nama Kapal"
                              onChange={(e) => setRKBMMuat(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              // disabled
                              defaultValue={RKBMMuat}
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Tanggal Rencana
                            </label>

                            <Datepicker
                              tipe="date"
                              onChange={(e) => setTglRencana(e)}
                              id="tgl_rencana"
                              name="tgl_rencana"
                              selected={
                                tglRencana ? new Date(tglRencana) : new Date()
                              }
                              compRef={tglRencanaRef}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="JamRencana"
                              className="block text-[10px] mb-2 dark:text-white"
                            >
                              Jam Rencana
                            </label>
                            <Datepicker
                              tipe="time"
                              compRef={jamRencanaRef}
                              onChange={(e) => setJamRencana(e)}
                              selected={
                                jamRencana ? new Date(jamRencana) : new Date()
                              }
                              timeIntervals={15}
                              timeCaption="Pilih Jam"
                              dateFormat="HH:mm"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="kegiatan"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Kegiatan
                          </label>
                          <div className="relative">
                            <ComboKegiatan
                              MMCode={MMCode}
                              kegiatanRef={kegiatanRef}
                              kodekegiatan={kodekegiatan}
                              setKodeKegiatan={setKodeKegiatan}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="lokasi"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Lokasi
                          </label>
                          <div className="relative">
                            <ComboAreaPandu
                              MMCode={MMCode}
                              areaPanduRef={areaPanduRef}
                              kodelokasi={kodelokasi}
                              setKodeLokasi={setKodeLokasi}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="keterangan"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Keterangan
                          </label>
                          <div className="relative">
                            <textarea
                              rows="3"
                              id="keterangan"
                              name="keterangan"
                              placeholder="Keterangan"
                              className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              onChange={(e) => setKeterangan(e.target.value)}
                              value={keterangan}
                            ></textarea>
                          </div>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="text-[10px] min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                              <tr className="text-center">
                                <th className="border border-black"></th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NO
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NAMA BARANG
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  BAHAYA
                                </th>

                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  GANGGU
                                </th>

                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  KEGIATAN
                                </th>

                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  UNIT
                                </th>

                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  TON
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  M3
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  PENYALURAN
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  KADE
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  PBM
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NPWP PBM
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  CONSIGNEE
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  SHIPPER
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NPWP SHIPPER
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NOMOR BILL OF LANDING
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  JUMLAH GANG (Kelompok Kerja)
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  PALKA
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NOMOR RKBM BONGKAR
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  NOMOR RKBM MUAT
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  RENCANA BONGKAR
                                </th>
                                <th className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                  RENCANA MUAT
                                </th>
                              </tr>
                            </thead>
                            {Outstanding === 0 || Outstanding === "0"
                              ? renderDetailModalPPKB()
                              : renderDetailModalPKK()}
                          </table>
                        </div>
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
  )
}

export default Ppkb
