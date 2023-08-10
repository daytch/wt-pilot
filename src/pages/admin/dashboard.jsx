import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataPKKInaportnet } from '../../redux/slices/jadwalSlice';
import { getDataFlow } from '../../redux/slices/dashboardSlice';
import {
  resetDataDetailPPK,
  selectedRowHeaderPPK,
  getDetailPPKB,
  fillComboKegiatan,
  fillComboAreaPandu,
  fillComboNomorPKKTongkang,
} from '../../redux/slices/ppkbSlice';
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from '../../functions/index';
import 'react-datepicker/dist/react-datepicker.css';
import Filter from '../../components/Filter';
import Detail from '../../components/Detail';
import FlowChart from '../../components/FlowChart';
import Datepicker from '../../components/Datepicker.jsx';
import Select from '../../components/Select';

function Dashboard() {
  const dispatch = useDispatch();
  const UserData = JSON.parse(localStorage.getItem('userData'));
  const [startDate, setStartDate] = useState(
    sessionStorage.getItem('dariTanggalJadwalKedatangan')
      ? new Date(sessionStorage.getItem('dariTanggalJadwalKedatangan'))
      : new Date()
  );
  const [endDate, setEndDate] = useState(
    sessionStorage.getItem('sampaiTanggalJadwalKedatangan')
      ? new Date(sessionStorage.getItem('sampaiTanggalJadwalKedatangan'))
      : new Date()
  );
  const dariPihak = UserData.UserType;
  const { UserType } = UserData;
  const UserLogin = UserData.UserId;
  // const [MMCode, setMMCode] = useState(UserData.MMCode)
  const [MMCode, setMMCode] = useState(
    UserData.MMCode === 'PST' ? '' : UserData.MMCode
  );
  const [Outstanding, setOutstanding] = useState('');
  const [Code, setCode] = useState(
    sessionStorage.getItem('codeColumnSearchJadwalKedatangan') ?? ''
  );
  const [ValueSearch, setValueSearch] = useState('');
  const [isShowModal, setIsShowModal] = useState(true);
  const [ViewBy, setViewBy] = useState(dariPihak);
  const [ViewValue, setViewValue] = useState(UserData.UserName);
  const [FilterDate, setFilterDate] = useState('1');
  const [Status_Order, setStatus_Order] = useState('');
  const [AgentUserLogin, setAgentUserLogin] = useState(
    dariPihak === 'AGEN' ? UserLogin : ''
  );
  const tglRencanaRef = useRef();
  const jamRencanaRef = useRef();
  const tglPPKBRef = useRef();
  const areaPanduRef = useRef();
  const kegiatanRef = useRef();
  const modalRef = useRef();
  const [detail, setDetail] = useState({});
  const [noPKK, setNoPKK] = useState('');
  const [nomorPKKTongkang, setNomorPKKTongkang] = useState('');
  const [nomorRKBMBongkar, setNomorRKBMBongkar] = useState('');
  const [nomorRKBMuat, setNomorRKBMMuat] = useState('');
  const [nama_kapal, setNamaKapal] = useState('');
  const [nama_tongkang, setNamaTongkang] = useState('');
  const [nama_nahkoda, setNamaNahkoda] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [kodekegiatan, setKodeKegiatan] = useState('');
  const [noPPKB, setNoPPKB] = useState('');
  const [RKBMBongkar, setRKBMBongkar] = useState('');
  const [RKBMMuat, setRKBMMuat] = useState('');
  const [tglPPKB, setTglPPKB] = useState(new Date());
  const [tglRencana, setTglRencana] = useState(new Date());
  const [jamRencana, setJamRencana] = useState(new Date());
  const [kodelokasi, setKodeLokasi] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lokasi, setLokasi] = useState('');
  const [kegiatan, setKegiatan] = useState('');
  const [oid, setOid] = useState('');

  let oldindex = '';
  const fetchData = async () => {
    const url = `?MMCode=${
      !isEmptyNullOrUndefined(MMCode) ? MMCode : ''
    }&FromDate=${handleDateAPI(startDate)}&ToDate=${handleDateAPI(
      endDate
    )}&FilterDate=${
      !isEmptyNullOrUndefined(FilterDate) ? FilterDate : ''
    }&ColumnSearch=${!isEmptyNullOrUndefined(Code) ? Code : ''}&ValueSearch=${
      !isEmptyNullOrUndefined(ValueSearch) ? ValueSearch : ''
    }&Outstanding=${
      !isEmptyNullOrUndefined(Outstanding) ? Outstanding : ''
    }&UserType=${!isEmptyNullOrUndefined(UserType) ? UserType : ''} 
      &LoginUserId=${!isEmptyNullOrUndefined(UserLogin) ? UserLogin : ''}`;

    // debugger
    dispatch(getDataPKKInaportnet(url));
  };

  const handleSaveDataNew = () => {
    var trString = tglRencanaRef.current.input.value.split('-');
    var tbString = tglPPKBRef.current.input.value.split('-');

    const tr = handleDateAPI(
      new Date(+trString[2], trString[1] - 1, +trString[0])
    );
    const jr = jamRencanaRef.current.input.value;
    const tb = handleDateAPI(
      new Date(+tbString[2], tbString[1] - 1, +tbString[0])
    );

    const kode_lokasi = areaPanduRef.current.value;
    const lokasi = areaPanduRef.current.selectedOptions[0].text;

    const kode_kegiatan = kegiatanRef.current.value;
    const keg = kegiatanRef.current.selectedOptions[0].text;

    var payload = {
      NomorPKK: noPKK,
      NoPPKB: noPPKB,
      // TglPPKB: tglPPKB,
      TglPPKB: tb,
      NomorPKKTongkang: nomorPKKTongkang ? nomorPKKTongkang : '',
      no_rkbm_bongkar: nomorRKBMBongkar ? nomorRKBMBongkar : '',
      no_rkbm_muat: nomorRKBMuat ? nomorRKBMuat : '',
      TglRencana: tr,
      JamRencana: jr,
      Kode_Lokasi: kode_lokasi.replace(/\s/g, ''),
      Lokasi: lokasi,
      // Kode_Kegiatan: kodekegiatan,
      // Kegiatan: kegiatan,

      Kode_Kegiatan: kode_kegiatan,
      Kegiatan: keg,

      Keterangan: keterangan,
      UserId: UserLogin,
    };
    let urlParameters = Object.entries(payload)
      .map((e) => e.join('='))
      .join('&');
    dispatch(postDataPPKB('?' + urlParameters));
    if (isModalOpen) {
      btnDetailRef.current.click();
      setIsModalOpen(false);
      resetModal();
    }
  };
  const onClickOpenDetail = (item) => {
    // console.log("1")
    var newData = data;
    const dt = newData.map((elm) => {
      let it = { ...elm };

      it.isSelected = it.idx === item.idx; // it?.nomor_pkk === item?.nomor_pkk
      return it;
    });

    dispatch(selectedRowHeaderPPK(dt));

    setIsModalOpen(true);
    setDetail(item);
    getDetail(item);
  };
  const getDetail = async (item) => {
    if (Outstanding === 1) {
      if (item) {
        const url = `?Nomor_PKK=${item.nomor_pkk}&Outstanding=${Outstanding}`;
        dispatch(getDetailPKK(url));
      }
    } else {
      const noppkb = item.NoPPKB;
      const urldetailppkb = `?NoPPKB=${noppkb}`;
      dispatch(getDetailPPKB(urldetailppkb));
    }
  };

  const onChangePKKTongkang = (e) => {
    const pkkTongkang = e; // e.currentTarget.value
    setNomorPKKTongkang(pkkTongkang);
    var listPKKTongkang = dataListNomorPKKTongkang.filter(
      (x) => x.MemberValue === pkkTongkang
    );
    let PKKTongkang = listPKKTongkang.length > 0 ? listPKKTongkang[0] : '';
    if (PKKTongkang) {
      setRKBMBongkar(PKKTongkang.no_rkbm_bongkar);
      setRKBMMuat(PKKTongkang.no_rkbm_muat);
      setNamaTongkang(PKKTongkang.nama_kapal_tongkang);
    }
  };

  const data = useSelector((state) => state.Jadwal.data);
  const dataCabang = useSelector((state) => state.Dashboard.dataCabang);
  const dataSalesOrder = useSelector((state) => state.Dashboard.dataSalesOrder);
  const dataListNomorPKKTongkang = useSelector(
    (state) => state.PPKB.fillComboNomorPKKTongkang
  );
  const dataListKegiatan = useSelector((state) => state.PPKB.fillComboKegiatan);
  const dataListAreaPandu = useSelector(
    (state) => state.PPKB.fillComboAreaPandu
  );
  const getDataDropdown = () => {
    let payload = { MMCode: MMCode, ValueSearch: '' };
    let payloadTongkang = {
      MMCode: MMCode,
      NomorPKKSelected: noPKK,
      ValueSearch: '',
    };
    dispatch(fillComboNomorPKKTongkang(payloadTongkang));
    dispatch(fillComboAreaPandu(payload));
    dispatch(fillComboKegiatan());
  };
  useEffect(() => {
    if (dataCabang?.length > 0 && isEmptyNullOrUndefined(MMCode)) {
      setMMCode(dataCabang[0].MMCode);
    }
    if (dataSalesOrder?.length > 0 && isEmptyNullOrUndefined(Code)) {
      setCode(dataSalesOrder[0].Code);
    }
  }, [dataCabang, dataSalesOrder]);

  useEffect(() => {
    if (noPKK) dispatch(getDataFlow(noPKK));
    getDataDropdown();
  }, [noPKK]);

  useEffect(() => {
    if (modalRef.current.classList.value) {
      setIsModalOpen(modalRef.current.classList.value.indexOf('hidden') === -1);
    }
  }, [modalRef.current?.classList]);

  const resetModal = () => {
    if (!isModalOpen) {
      if (Outstanding === '1' || Outstanding === 1) {
        dispatch(resetDataDetailPPKB());
      } else {
        setNoPKK('');
        dispatch(resetDataDetailPPK());
      }
      setKeterangan('');
      // if (areaPanduRef) {
      //   areaPanduRef.current.value = ""
      // }
      // if (kegiatanRef) {
      //   kegiatanRef.current.value = ""
      // }
      setKodeLokasi('');
      setLokasi('');
      setKodeKegiatan('');
      setKegiatan('');
      setTglPPKB('');
      setTglRencana('');
      setJamRencana('');
      setNoPPKB('');
      setOid('');
    }
  };
  useEffect(() => {
    sessionStorage.setItem('dariTanggalJadwalKedatangan', startDate);
    sessionStorage.setItem('sampaiTanggalJadwalKedatangan', endDate);
    sessionStorage.setItem('codeColumnSearchJadwalKedatangan', Code);
    sessionStorage.setItem('valueColumnSearchJadwalKedatangan', ValueSearch);
    sessionStorage.setItem('cabangJadwalKedatangan', MMCode);
    sessionStorage.setItem('startDate', startDate);
    sessionStorage.setItem('endDate', endDate);

    setViewValue(localStorage.getItem('username'));
    setViewBy(localStorage.getItem('id'));

    const deleteSelected = () => {
      const table = document.getElementById('table');
      oldindex = '';

      for (let i = 1; i < table?.rows?.length; i++) {
        table.rows[i].classList.remove('selected');
        table.rows[i].cells[0].classList.remove('arrowright');
      }
    };

    deleteSelected();
    fetchData();
  }, [startDate, endDate, Code, ValueSearch, MMCode, Outstanding]);

  useEffect(() => {
    // console.log("detail: ", detail)
    setNoPKK(detail?.nomor_pkk);
    setNamaKapal(detail?.nama_kapal);
    setNamaTongkang(detail?.nama_tongkang);
    setNamaNahkoda(detail?.nahkoda);
    if (Outstanding === 0 || Outstanding === '0') {
      setKeterangan(detail?.Keterangan);

      setNomorPKKTongkang(detail?.nama_pkk_tongkang);
      setNomorRKBMBongkar(detail?.nomor_rkbm_bongkar);
      setNomorRKBMMuat(detail?.nomor_rkbm_muat);
      setKodeLokasi(detail?.Kode_Lokasi);
      setLokasi(detail?.Lokasi);
      setKodeKegiatan(detail?.Kode_Kegiatan);
      setKegiatan(detail?.Kegiatan);
      setTglPPKB(detail?.TglPPKB);
      setTglRencana(detail?.TglRencana);
      setJamRencana(detail?.JamRencana);
      setNoPPKB(detail?.NoPPKB);
      setOid(detail?.Oid);
      // console.log("detail: ", detail)
    } else {
      resetModal();
    }
  }, [detail]);
  const onClickRow = (e) => {
    setNoPKK(e.currentTarget.children[3].innerHTML);
  };

  return (
    <div className="max-w-[85rem] py-3 mx-auto">
      {/* <!-- Card --> */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border overflow-y-auto h-[50rem] border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
              {/* <!-- Header --> */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-1000 dark:text-gray-200">
                    Pemberitahuan Kedatangan Kapal
                  </h2>
                </div>
              </div>
              {/* <!-- End Header --> */}

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
                  tipe="jadwal"
                />
              </div>
              {/* <!-- End Accordion --> */}

              {/* <!-- Table --> */}
              <div
                className="px-3"
                style={{
                  maxWidth: '100%',
                  overflow: 'auto',
                  maxHeight: '30vh',
                }}
              >
                <table className="w-[70vw] divide-gray-200 dark:divide-gray-700">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th
                        scope="col"
                        className="w-12 px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        ppkb
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        detail
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        no
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        nomor pkk
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        nama kapal
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        eta
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-0 text-center border border-black text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200 whitespace-nowrap"
                      >
                        etd
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y overflow-y-auto divide-gray-200 dark:divide-gray-700">
                    {data &&
                      data.map((item, idx) => {
                        return (
                          <tr
                            key={`jdwl${idx}`}
                            className="even:bg-white odd:bg-[#C0C0FD] dark:odd:bg-slate-900 dark:even:bg-slate-800"
                          >
                            <td className="text-center border border-black h-px w-12 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400">
                              <button
                                className="z-50 bg-cyan-400 px-1 rounded text-black"
                                data-hs-overlay="#hs-bg-gray-on-hover-cards1"
                                onClick={() => {
                                  setIsModalOpen(true);
                                  onClickOpenDetail(item);
                                }}
                              >
                                Buat PPKB
                              </button>
                            </td>
                            <td className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400">
                              <button
                                className="bg-orange-400 px-1 rounded text-black"
                                onClick={() => setDetail(item)}
                                data-hs-overlay="#hs-bg-gray-on-hover-cards"
                              >
                                Detail PKK
                              </button>
                            </td>
                            <td
                              className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={onClickRow}
                            >
                              {idx + 1}
                            </td>
                            <td
                              className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={onClickRow}
                            >
                              {item.nomor_pkk}
                            </td>
                            <td
                              className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={onClickRow}
                            >
                              {item.nama_kapal}
                            </td>
                            <td
                              className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={onClickRow}
                            >
                              {new Date(item.tanggal_eta).getFullYear() < 2000
                                ? ''
                                : datetimeToString(item.tanggal_eta)}
                            </td>
                            <td
                              className="text-center border border-black h-px w-4 whitespace-nowrap text-[10px] text-gray-600 dark:text-gray-400 cursor-pointer"
                              onClick={onClickRow}
                            >
                              {new Date(item.tanggal_etd).getFullYear() < 2000
                                ? ''
                                : datetimeToString(item.tanggal_etd)}
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
                      {data?.length}
                    </span>{' '}
                    results
                  </p>
                </div>
              </div>
              {/* <!-- End Footer --> */}

              <FlowChart />
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
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:w-[60vw] my-auto lg:mx-auto">
          <div className="flex justify-between items-center w-[60vw] flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between w-[60vw] items-center py-1 px-2 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-gray-200">
                Permintaan Pelayanan Kapal dan Barang (MODUS TAMBAH).
              </h3>
              <button
                type="button"
                className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-[10px] dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-bg-gray-on-hover-cards1"
                onClick={() => setIsModalOpen(false)}
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

            <div className="flex w-full p-4 overflow-y-auto">
              <div className="w-full sm:divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-3 sm:py-6">
                  <div className="flex justify-end">
                    <div className="row" style={{ marginLeft: '5px' }}>
                      <button
                        className="mr-3 py-1 px-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-[10px] dark:focus:ring-offset-gray-800"
                        onClick={handleSaveDataNew}
                      >
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-y-4">
                      <div className="grid md:grid-cols-2 gap-2">
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
                              onChange={(e) => setNoPKK(e.target.value)}
                              className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                              disabled
                              value={noPKK}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="pkk_tongkang"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Nomor PKK Tongkang
                          </label>

                          <Select
                            value={nomorPKKTongkang}
                            onChange={onChangePKKTongkang}
                            options={dataListNomorPKKTongkang}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="nama_kapal"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Nama Kapal
                          </label>

                          <input
                            type="text"
                            id="nama_kapal"
                            name="nama_kapal"
                            onChange={(e) => setNamaKapal(e.target.value)}
                            className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            disabled
                            value={nama_kapal}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="nama_kapal"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Nama Tongkang
                          </label>

                          <input
                            type="text"
                            id="nama_tongkang"
                            name="nama_tongkang"
                            // placeholder="Nama Tongkang"
                            onChange={(e) => nama_tongkang(e.target.value)}
                            className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            disabled
                            value={nama_tongkang}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="nama_nahkoda"
                            className="block text-[10px] mb-2 dark:text-white"
                          >
                            Nama Nahkoda
                          </label>

                          <input
                            type="text"
                            id="nama_nahkoda"
                            name="nama_nahkoda"
                            placeholder="Nama Nahkoda"
                            onChange={(e) => setNamaNahkoda(e.target.value)}
                            className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            disabled
                            value={nama_nahkoda}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-2"></div>
                      </div>
                      <hr />
                      <div className="grid md:grid-cols-2 gap-2">
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
                              disabled={true}
                              value={noPPKB}
                              onChange={(e) => setNoPPKB(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
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
                            onChange={(e) => setRKBMBongkar(e.target.value)}
                            className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            disabled
                            value={RKBMBongkar}
                          />
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
                            selected={tglPPKB ? new Date(tglPPKB) : new Date()}
                            onChange={(e) => setTglPPKB(e)}
                            compRef={tglPPKBRef}
                          />
                        </div>

                        <div>
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
                            onChange={(e) => setRKBMMuat(e.target.value)}
                            className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            disabled
                            value={RKBMMuat}
                          />
                        </div>

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
                      <hr />

                      <div>
                        <label
                          htmlFor="kegiatan"
                          className="block text-[10px] mb-2 dark:text-white"
                        >
                          Kegiatan
                        </label>
                        <div className="relative">
                          <Select
                            value={kodekegiatan}
                            onChange={setKodeKegiatan}
                            options={dataListKegiatan}
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
                          <Select
                            value={kodelokasi}
                            onChange={setKodeLokasi}
                            options={dataListAreaPandu}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Detail detail={detail} tipe="jadwal" />
    </div>
  );
}

export default Dashboard;
