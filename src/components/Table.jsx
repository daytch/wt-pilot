import React from "react"
import PropTypes from "prop-types"

const Table = (props) => {
    
  const { ListHeader, ListData, Tipe, onClickRow } = props

  return (
    <table style={{ whiteSpace: "nowrap" }} id="table">
      <thead className="sticky top-0 bg-gray-50 dark:bg-slate-900">
        <tr className="text-center">
          {ListHeader &&
            ListHeader.map((item, idx) => {
              return (
                <th
                  className={
                    item.class
                      ? item.class
                      : "text-[10px] whitespace-nowrap px-3 py-0 font-semibold border border-black"
                  }
                >
                  {item.text}
                </th>
              )
            })}
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
  )
}

Table.propTypes = {
  ListHeader: PropTypes.array,
  ListData: PropTypes.array,
  Tipe: PropTypes.string,
  onClickRow: PropTypes.func,
}

export default Table
