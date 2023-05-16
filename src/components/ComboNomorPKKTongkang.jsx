// import React from "react";
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { fillComboNomorPKKTongkang } from "../redux/slices/ppkbSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffectOnce } from "../functions/index.js"

const ComboNomorPKKTongkang = (props) => {
  const dispatch = useDispatch()
  // const {NomorPKKTongkangRef,kodeNomorPKKTongkang,setKodeNomorPKKTongkang} = props
  const {
    MMCode,
    NomorPKKSelected,
    NomorPKKTongkangRef,
    NomorPKKTongkang,
    // setNomorPKKTongkang,
    onChangePKKTongkang,
  } = props
  console.log("NomorPKKSelected:", NomorPKKSelected)
  const ValueSearch = ""

  useEffectOnce(() => {
    let payload = {
      MMCode: MMCode,
      NomorPKKSelected: NomorPKKSelected,
      ValueSearch: ValueSearch,
    }

    dispatch(fillComboNomorPKKTongkang(payload))
    // dispatch(fillComboNomorPKKTongkang(MMCode,ValueSearch))
  })

  useEffect(() => {
    let payload = {
      MMCode: MMCode,
      NomorPKKSelected: NomorPKKSelected,
      ValueSearch: ValueSearch,
    }
    dispatch(fillComboNomorPKKTongkang(payload))
  }, [MMCode, NomorPKKSelected])

  const dataListNomorPKKTongkang = useSelector(
    (state) => state.PPKB.fillComboNomorPKKTongkang
  )
  // console.log(dataListNomorPKKTongkang)

  return (
    <select
      value={NomorPKKTongkang}
      ref={NomorPKKTongkangRef}
      // onChange={(e) => setNomorPKKTongkang(e.target.value)}
      onChange={(e) => onChangePKKTongkang(e, dataListNomorPKKTongkang)}
      className="py-1 px-3 w-128 pr-6 block w-full disabled:bg-gray-300 bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    >
      {dataListNomorPKKTongkang &&
        dataListNomorPKKTongkang.map((x, idx) => (
          <option key={idx} value={x.MemberValue}>
            {x.DisplayValue}
          </option>
        ))}
    </select>
  )
}

ComboNomorPKKTongkang.propTypes = {
  MMCode: PropTypes.string,
  NomorPKKSelected: PropTypes.string,
  NomorPKKTongkangRef: PropTypes.any,
  NomorPKKTongkang: PropTypes.string,
  // setNomorPKKTongkang: PropTypes.func,
  onChangePKKTongkang: PropTypes.func,
}

export default ComboNomorPKKTongkang
