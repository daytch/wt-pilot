import axios from "axios";
import { API_URL } from "./../constants";

var token = localStorage.getItem("token");

let api = axios.create({
  baseURL: API_URL,
  // timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    // "Content-Type": "application/json;charset=utf-8",
    //   "x-access-token": token ? token : "",
  },
});

api.interceptors.request.use(
  function (config) {
    // token = localStorage.getItem("token");
    // config.headers.set("x-access-token", token);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    if (response.data.ErrorCode === 400) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      if (error.response.data.message.toLowerCase() === "invalid token") {
        localStorage.clear();
        window.location.href = "/login";
      }
    } else {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export { default as setAuthorizationHeader } from "./setAuthorizationHeader.js";
export default api;
