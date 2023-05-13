import React from "react";
import PropTypes from "prop-types";
import {
  sliceHour,
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../functions/index.js";

const Detail = (props) => {
  const { detail, tipe } = props;
  // console.log("props: ", props);
  const renderDetail = {
    jadwal: (detail) => (
      <div className="p-4 overflow-y-auto">
        <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:py-6">
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nomor PKK
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.nomor_pkk}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      NPWP
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.npwp}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nama Perusahaan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.nama_perusahaan}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nomor Trayek
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.nomor_trayek}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              Data Kapal
            </h4>

            {/* <!-- Data Kapal --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nama Kapal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.nama_kapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      DRT
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.drt)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      GRT
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.grt)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      LOA
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.loa)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Lebar Kapal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.lebar_kapal)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Draft Max
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.draft_max)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Draft Depan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.draft_depan)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jenis Trayek
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.jenis_trayek}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nahkoda
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.nahkoda}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanda Pendaftaran Kapal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.tanda_pendaftaran_kapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tahun Pembuatan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.tahun_pembuatan}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Bendera
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.bendera}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jenis Kapal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.jenis_kapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Draft Belakang
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.draft_belakang)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Draft Tengah
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.draft_tengah)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Call Sign
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.call_sign}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Data Kapal --> */}
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              Pelabuhan
            </h4>

            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Kode Pelabuhan Asal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.kode_pelabuhan_asal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Kode Pelabuhan Tujuan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.kode_pelabuhan_tujuan}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Kode Tujuan Akhir Pelabuhan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.kode_tujuan_akhir_pelabuhan}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Asal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.pelabuhan_asal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Tujuan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.pelabuhan_tujuan}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Tujuan Akhir
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.pelabuhan_tujuan_akhir}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nama Dermaga
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.dermaga_nama}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jenis Barang
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.jenis_barang}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Port Code
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.port_code}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanggal ETA
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {new Date(detail?.tanggal_eta).getFullYear() < 2000
                        ? ""
                        : datetimeToString(detail?.tanggal_eta)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Status BM
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.status_bm}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jumlah Muat
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.jumlah_muat)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Status
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.status}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanggal ETD
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {new Date(detail?.tanggal_etd).getFullYear() < 2000
                        ? ""
                        : datetimeToString(detail?.tanggal_etd)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Grid --> */}
          </div>
        </div>
      </div>
    ),
    realisasi: (detail) => (
      <div className="p-4 overflow-y-auto">
        <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              No PKK
            </h4>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Nomor PKK
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.nomor_pkk}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Perusahaan / Agent
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.Agent}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Nama Customer
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.CustomerName}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      GT Kecil
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.NoPKKGTKecil}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      GT Besar
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.NoPKKGTBesar}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              Data Kapal
            </h4>

            {/* <!-- Data Kapal --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Asal
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.PelabuhanAsal}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Nama Kapal
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.NamaKapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      DWT
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.DWT)
                        ? detail?.DWT
                        : parseFloat(detail?.DWT).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      LOA
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.LOA)
                        ? detail?.LOA
                        : parseFloat(detail?.LOA).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Tujuan
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.PelabuhanTujuan}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Tipe Kapal
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.TypeKapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      GRT
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.GRT)
                        ? detail?.GRT
                        : parseFloat(detail?.GRT).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Data Kapal --> */}
          </div>

          <div className="py-3 sm:py-6">
            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Gerakan Kapal Masuk
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Masuk
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.TglBPPTMasuk}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Mulai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.MulaiPanduMasuk)
                        ? detail?.MulaiPanduMasuk
                        : sliceHour(detail?.MulaiPanduMasuk)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Selesai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.SelesaiPanduMasuk)
                        ? detail?.SelesaiPanduMasuk
                        : sliceHour(detail?.SelesaiPanduMasuk)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {isEmptyNullOrUndefined(detail?.TotaljamPanduMasuk)
                        ? detail?.TotaljamPanduMasuk
                        : sliceHour(detail?.TotaljamPanduMasuk)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Gerakan Kapal Pindah
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Pindah
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.JumlahUnitTundaPindah}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Mulai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.pelabuhan_tujuan}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Selesai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {/* {detail?.pelabuhan_tujuan_akhir} */}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {/* {detail?.pelabuhan_tujuan_akhir} */}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Gerakan Kapal Keluar
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Keluar
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.TanggalKeluar}
                    </td>
                  </tr>
                  {/* <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Jenis Barang
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.jenis_barang}
                    </td>
                  </tr> */}
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Mulai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.MulaiPanduKeluar === "" ||
                      detail?.MulaiPanduKeluar === null
                        ? detail?.MulaiPanduKeluar
                        : sliceHour(detail?.MulaiPanduKeluar)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Waktu Selesai
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.SelesaiPanduKeluar === "" ||
                      detail?.SelesaiPanduKeluar === null
                        ? detail?.SelesaiPanduKeluar
                        : sliceHour(detail?.SelesaiPanduKeluar)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.TotalJamPanduKeluar}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Tunda Masuk
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 h-px text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Unit
                    </td>

                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.JumlahUnitTundaMasuk}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Mulai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.MulaiPanduMasuk === "" ||
                      detail?.MulaiPanduMasuk === null
                        ? detail?.MulaiPanduMasuk
                        : sliceHour(detail?.MulaiPanduMasuk)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Selesai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.SelesaiPanduMasuk === "" ||
                      detail?.SelesaiPanduMasuk === null
                        ? detail?.SelesaiPanduMasuk
                        : sliceHour(detail?.SelesaiPanduMasuk)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.TotalJamPanduMasuk}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Tunda Pindah
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Unit
                    </td>

                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.JumlahUnitTundaPindah}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Mulai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.MulaiPanduPindah === "" ||
                      detail?.MulaiPanduPindah === null
                        ? detail?.MulaiPanduPindah
                        : sliceHour(detail?.MulaiPanduPindah)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Selesai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.SelesaiPanduPindah === "" ||
                      detail?.SelesaiPanduPindah === null
                        ? detail?.SelesaiPanduPindah
                        : sliceHour(detail?.SelesaiPanduPindah)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.TotalJamPanduPindah}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Tunda Keluar
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Unit
                    </td>

                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.JumlahUnitTundaKeluar}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Mulai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.MulaiPanduKeluar === "" ||
                      detail?.MulaiPanduKeluar === null
                        ? detail?.MulaiPanduKeluar
                        : sliceHour(detail?.MulaiPanduKeluar)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Selesai
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.SelesaiPanduKeluar === "" ||
                      detail?.SelesaiPanduKeluar === null
                        ? detail?.SelesaiPanduKeluar
                        : sliceHour(detail?.SelesaiPanduKeluar)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jam
                    </td>
                    <td className="px-3 py-0 h-px w-4 text-[10px] text-center border-black border whitespace-nowrap">
                      {detail?.TotalJamPanduKeluar}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colSpan="2" className="px-3 py-0 text-left">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Pandu Tunda
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Nama Pandu
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.NamaPandu}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Motor Pandu
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.MotorPandu}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-0 text-center text-[10px] capitalized bg-blue-200 border-black border whitespace-nowrap">
                      Kapal Pandu
                    </td>
                    <td className="px-3 py-0 text-center text-[10px] capitalized border-black border whitespace-nowrap">
                      {detail?.KapalTunda}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Grid --> */}
          </div>
        </div>
      </div>
    ),
    pnbp: (detail) => (
      <div className="p-4 overflow-y-auto">
        <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              No PKK
            </h4>

            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      GT Kecil
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.NoPKKGTKecil}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      GT Besar
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.NoPKKGTBesar}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jumlah PNBP
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.JumlahPNBP).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nomor Invoice
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.NomorInv}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              Data Kapal
            </h4>

            {/* <!-- Data Kapal --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nama Kapal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.NamaKapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Nama Tongkang
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.NamaTongkang}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Bendera
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.Bendera}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Asal
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.PelabuhanAsal}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      DWT
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.DWT).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      GRT
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.GRT).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      LOA
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.LOA).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pelabuhan Tujuan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.PelabuhanTujuan}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Data Kapal --> */}
          </div>

          <div className="py-3 sm:py-6">
            {/* <h4 className="mb-2 text-[10px] font-semibold uppercase text-gray-600 dark:text-gray-400">
              Gerakan kapal
            </h4> */}

            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <th
                    scope="col"
                    colSpan="2"
                    className="border border-black bg-[#778798] px-3 py-0 text-center"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Gerakan Kapal
                      </span>
                    </div>
                  </th>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanggal Masuk
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.MulaiPanduMasuk === "" ||
                      detail?.MulaiPanduMasuk === null
                        ? detail?.MulaiPanduMasuk
                        : sliceHour(detail?.MulaiPanduMasuk)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanggal Pindah
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {/* {detail?.MulaiPanduPindah} */}
                      {detail?.MulaiPanduPindah === "" ||
                      detail?.MulaiPanduPindah === null
                        ? detail?.MulaiPanduPindah
                        : sliceHour(detail?.MulaiPanduPindah)}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Tanggal Keluar
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.MulaiPanduKeluar === "" ||
                      detail?.MulaiPanduKeluar === null
                        ? detail?.MulaiPanduKeluar
                        : sliceHour(detail?.MulaiPanduKeluar)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <th
                    scope="col"
                    colSpan="2"
                    className="border border-black bg-[#778798] px-3 py-0 text-center"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Tunda
                      </span>
                    </div>
                  </th>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Unit
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.JumlahUnitTundaKapal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Jumlah Jam
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.TotalJamTundaKapal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Grid --> */}
          </div>

          <div className="py-3 sm:py-6">
            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <th
                    scope="col"
                    colSpan="2"
                    className="border border-black bg-[#778798] px-3 py-0 text-center"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Pendapatan
                      </span>
                    </div>
                  </th>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pemanduan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {detail?.pelabuhan_asal}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Penundaan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.TotalNilaiPanduPNBP).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
                  <th
                    scope="col"
                    colSpan="2"
                    className="border border-black bg-[#778798] px-3 py-0 text-center"
                  >
                    <div className="flex justify-center items-center gap-x-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        PNBP 5%
                      </span>
                    </div>
                  </th>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Pemanduan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {/* {detail?.MulaiPanduMasuk} */}
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-[10px]  text-center bg-blue-200 border-black border whitespace-nowrap">
                      Penundaan
                    </td>
                    <td className="h-px w-4 text-[10px]  text-center border-black border whitespace-nowrap">
                      {parseFloat(detail?.TotalNilaiTundaPNBP).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Grid --> */}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div
      id="hs-bg-gray-on-hover-cards"
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              Detail Data
            </h3>
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-bg-gray-on-hover-cards"
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

          {renderDetail[tipe](detail)}
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  detail: PropTypes.object,
  tipe: PropTypes.string,
};

export default Detail;
