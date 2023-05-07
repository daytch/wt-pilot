import axios from "axios"
import { API_URL } from "./../constants"

let apiRegistrasion = axios.create({ baseURL: API_URL })

apiRegistrasion.interceptors.request.use(function (config) {
  config.headers.set("Accept", "application/json")
  config.headers.set("Content-Type", "application/x-www-form-urlencoded")
  return config
})

export default apiRegistrasion
