import React, { useEffect, useRef } from "react"
import { getImageUrl } from "./../functions"
import LogoImage from "./../assets/logo-hd.webp"
import { resetPassword } from "./../redux/slices/authenticationSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { history } from "../helpers/history.js"
import { isEmptyNullOrUndefined, useQuery } from "../functions/index.js"
import Loader from "../components/Loader"
import {
  ErrorMessage,
  SuccessMessage,
  InfoMessage,
} from "../components/Notification"

const BuatPassword = () => {
  const dispatch = useDispatch()
  const query = useQuery()
  const konfirmasiPasswordRef = useRef()
  const passwordRef = useRef()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!isEmptyNullOrUndefined(query.get("token"))) {
      return history.navigate(`/reset?token=${query.get("token")}`)
    }
    if (!isEmptyNullOrUndefined(token)) {
      return history.navigate("/")
    }
  }, [])

  function handleCreatePassword(e) {
    e.preventDefault()
    const pwd = passwordRef.current.value
    const k_pwd = konfirmasiPasswordRef.current.value
    if (isEmptyNullOrUndefined(pwd) && isEmptyNullOrUndefined(k_pwd)) {
      InfoMessage("Validasi password", "Semua data harus diisi")
    } else if (pwd !== k_pwd) {
      InfoMessage(
        "Validasi password",
        "Password dan Konfirmasi Password harus sama"
      )
    } else {
      const data = new FormData()
      data.append("UserId", query.get())
      data.append("UserPwd", passwordRef.current.value)
      data.append("Token", emailRef.current.value)
      data.append("Register", passwordRef.current.value)
      dispatch(resetPassword(data))
    }
  }

  const error = useSelector((state) => state.Authentication.error)
  const message = useSelector((state) => state.Authentication.message)
  const loading = useSelector((state) => state.Authentication.loading)

  useEffect(() => {
    if (error) {
      ErrorMessage("", error)
    }

    if (message) {
      SuccessMessage("", message)
      setTimeout(() => {
        history.navigate("/")
      }, 3000)
    }
  }, [error, message])

  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="bg-cover bg-center w-screen h-screen grid place-items-center"
        style={{ backgroundImage: "url(/bg-full.webp)" }}
      >
        {/* <div className="lg:w-1/3 lg:h-[45%] bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-sm mx-auto"> */}
        <div className="flex flex-col bg-white lg:w-[30vw] border shadow-sm rounded-xl p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex flex-col justify-items-center">
            <section className="grid justify-items-center mb-3">
              <img
                src={LogoImage}
                className="w-[60%] h-auto text-center"
                alt="logo"
              />
            </section>
            <div className="header-card flex flex-col justify-center items-center">
              <p className="font-light text-3xl">Buat Password</p>
              <p className="font-light text-base">Buat Password anda</p>
            </div>
          </div>
          <form
            className="grid gap-y-4 p-5"
            method="POST"
            onSubmit={handleCreatePassword}
          >
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
            </div>
            {/* <!-- End Form Group --> */}

            {/* <!-- Form Group --> */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="konf_password"
                  name="konf_password"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                  required
                  ref={konfirmasiPasswordRef}
                  placeholder="Konfirmasi Password"
                />
              </div>
            </div>
            {/* <!-- End Form Group --> */}

            <button
              type="submit"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default BuatPassword
