import React,{useEffect} from "react"
import PropTypes from "prop-types"
import { fillComboAreaPandu } from "../redux/slices/ppkbSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffectOnce } from "../functions/index.js"

const ComboAreaPandu = (props) => {
  const dispatch = useDispatch()
  const { MMCode, areaPanduRef, kodeAreaPandu, setKodeAreaPandu } = props

  // debugger

  // const [MMCode, setMMCode] = useState(
  //   UserData.MMCode === "PST" ? "" : UserData.MMCode  )
  // const UserData = JSON.parse(localStorage.getItem("userData"))
  // const MMCode = UserData.MMCode// "BPN"
  const ValueSearch = ""

  useEffectOnce(() => {
    let payload = { MMCode: MMCode, ValueSearch: ValueSearch }
    dispatch(fillComboAreaPandu(payload))
    // dispatch(fillComboAreaPandu(MMCode,ValueSearch))
  })

  useEffect(() => {
    let payload = { MMCode: MMCode, ValueSearch: ValueSearch }
    dispatch(fillComboAreaPandu(payload))
  }, [MMCode])

  const dataListAreaPandu = useSelector(
    (state) => state.PPKB.fillComboAreaPandu
  )

  return (
    <select
      value={kodeAreaPandu}
      ref={areaPanduRef}
      onChange={(e) => setKodeAreaPandu(e.target.value)}
      className="py-1 px-3 w-128 pr-6 block w-full disabled:bg-gray-300 bg-blue-100 border-gray-500 rounded-md text-xs focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
    >
      {dataListAreaPandu &&
        dataListAreaPandu.map((x, idx) => (
          <option key={idx} value={x.MemberValue}>
            {x.DisplayValue}
          </option>
        ))}
    </select>
  )
}

ComboAreaPandu.propTypes = {
  MMCode: PropTypes.string,
  areaPanduRef: PropTypes.any,
  kodeAreaPandu: PropTypes.string,
  setKodeAreaPandu: PropTypes.func,
}

export default ComboAreaPandu
