import React from "react";
import PropTypes from "prop-types"
import {fillComboKegiatan} from "../redux/slices/ppkbSlice.js"
import { useDispatch,useSelector } from "react-redux"
import { useEffectOnce } from "../functions/index.js"

const ComboKegiatan = (props)=>{
    const dispatch = useDispatch()
    const {kegiatanRef,kodekegiatan,setKodeKegiatan} = props

    useEffectOnce(() => {
        dispatch(fillComboKegiatan())
    })
    
    const dataListKegiatan = useSelector((state)=> state.PPKB.fillComboKegiatan)

    return ( <select
        value={kodekegiatan}
        ref={kegiatanRef}
        onChange={(e) => setKodeKegiatan(e.target.value)}
        className="py-1 px-3 w-48 pr-6 block w-full disabled:bg-gray-300 bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
      >
        {dataListKegiatan &&
          dataListKegiatan.map((x, idx) => (
            <option key={idx} value={x.MemberValue}>
              {x.DisplayValue}
            </option>
          ))}
      </select>)
}

ComboKegiatan.propTypes = { 
    kegiatanRef: PropTypes.any, 
    kodekegiatan: PropTypes.string,
    setKodeKegiatan: PropTypes.func 
}

export default ComboKegiatan;