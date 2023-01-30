import React from "react";
import PropTypes from "prop-types";
import {
  handleDateAPI,
  isEmptyNullOrUndefined,
  datetimeToString,
} from "../functions/index.js";

const Detail = (props) => {
  const { detail, tipe } = props;
  console.log("props:", props);
  const renderDetail = {
    jadwal: (detail) => (
      <div className="p-4 overflow-y-auto">
        <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:py-6">
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nomor PKK
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nomor_pkk}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        NPWP
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.npwp}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nama Perusahaan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nama_perusahaan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nomor Trayek
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nomor_trayek}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
              Data Kapal
            </h4>

            {/* <!-- Data Kapal --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nama Kapal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nama_kapal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        DRT
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.drt)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        GRT
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.grt)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        LOA
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.loa)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Lebar Kapal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.lebar_kapal)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Draft Max
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.draft_max)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Draft Depan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.draft_depan)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jenis Trayek
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.jenis_trayek}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nahkoda
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nahkoda}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Tanda Pendaftaran Kapal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.tanda_pendaftaran_kapal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Tahun Pembuatan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.tahun_pembuatan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Bendera
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.bendera}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jenis Kapal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.jenis_kapal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Draft Belakang
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.draft_belakang)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Draft Tengah
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.draft_tengah)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Call Sign
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.call_sign}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Data Kapal --> */}
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
              Pelabuhan
            </h4>

            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Kode Pelabuhan Asal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_pelabuhan_asal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Kode Pelabuhan Tujuan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_pelabuhan_tujuan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Kode Tujuan Akhir Pelabuhan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_tujuan_akhir_pelabuhan}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Pelabuhan Asal
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_asal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Pelabuhan Tujuan
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_tujuan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Pelabuhan Tujuan Akhir
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_tujuan_akhir}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Nama Dermaga
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.dermaga_nama}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jenis Barang
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.jenis_barang}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Port Code
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.port_code}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Tanggal ETA
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_eta).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_eta)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Status BM
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status_bm}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jumlah Muat
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.jumlah_muat)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Status
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Tanggal ETD
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_etd).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_etd)}
                      </span>
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
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
              No PKK
            </h4>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        No BPJS
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {/* {detail.nomor_pkk} */}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Perusahaan / Agent
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.Agent}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Nama Customer
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.CustomerName}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        GT Kecil
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nama_perusahaan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        GT Besar
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nomor_trayek}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
              Data Kapal
            </h4>

            {/* <!-- Data Kapal --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Pelabuhan Asal
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nama_kapal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Nama Kapal
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.drt)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        DWT
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.grt)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        LOA
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.loa)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Pelabuhan Tujuan
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.nahkoda}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Tipe Kapal
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.tanda_pendaftaran_kapal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        GRT
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.tahun_pembuatan}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <!-- End Data Kapal --> */}
          </div>

          <div className="py-3 sm:py-6">
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
              Gerakan Kapal
            </h4>

            {/* <!-- Grid --> */}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-2">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Gerakan Kapal Masuk
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm  text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        masuk
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_pelabuhan_asal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        waktu mulai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_pelabuhan_tujuan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        waktu selesai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_tujuan_akhir_pelabuhan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        jam
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.kode_tujuan_akhir_pelabuhan}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Gerakan Kapal Pindah
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Pindah
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_asal}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Waktu Mulai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_tujuan}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Waktu Selesai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_tujuan_akhir}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        jam
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.pelabuhan_tujuan_akhir}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Gerakan Kapal Keluar
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Keluar
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.dermaga_nama}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jenis Barang
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.jenis_barang}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        waktu mulai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.port_code}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        waktu selesai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_eta).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_eta)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        jam
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_eta).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_eta)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Tunda Masuk
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Unit
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status_bm}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Mulai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.jumlah_muat)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Selesai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jam
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_etd).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_etd)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Tunda Pindah
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Unit
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status_bm}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Mulai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.jumlah_muat)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Selesai
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px w-4 text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Jam
                      </span>
                    </td>
                    <td className="h-px w-4 text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_etd).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_etd)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Tunda Keluar
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Unit
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status_bm}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        Mulai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.jumlah_muat)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Selesai
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm ext-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Jam
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(detail.tanggal_etd).getFullYear() < 2000
                          ? ""
                          : datetimeToString(detail.tanggal_etd)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-900">
                  <tr>
                    <th scope="col" colspan="2" className="px-6 py-3 text-left">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                          Pandu Tunda
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Nama Pandu
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status_bm}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Motor Pandu
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {parseFloat(detail.jumlah_muat)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-px max-w-sm text-center bg-blue-200 border-black border whitespace-nowrap">
                      <span className="max-w-sm text-xs text-gray-600 dark:text-gray-400">
                        Kapal Pandu
                      </span>
                    </td>
                    <td className="text-center border-black border whitespace-nowrap">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {detail.status}
                      </span>
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
