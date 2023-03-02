import React, { useEffect, useRef } from "react"
import { getImageUrl } from "./../functions"
import LogoImage from "./../assets/logo-hd.png"
import {
  postLogin,
  postUserRegistration,
  checkUserRegistration,
  saveUserRegistration,
} from "./../redux/slices/authenticationSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { history } from "../helpers/history.js"
import { isObjectEmpty } from "../functions/index.js"
import Loader from "../components/Loader"
import { ErrorMessage, SuccessMessage } from "../components/Notification"

const Login = () => {
  const dispatch = useDispatch()
  const emailRef = useRef()
  const passwordRef = useRef()

  const forgotUserIdRef = useRef()
  const regUserIdRef = useRef()
  const regEmailRef = useRef()
  const regHPRef = useRef()

  function handleLogin(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("Email", emailRef.current.value)
    data.append("Password", passwordRef.current.value)
    dispatch(postLogin(data))
  }

  const token = useSelector((state) => state.Authentication.token)
  const data = useSelector((state) => state.Authentication.data)
  const error = useSelector((state) => state.Authentication.error)
  const message = useSelector((state) => state.Authentication.message)
  const loading = useSelector((state) => state.Authentication.loading)
  const isPostRegistrationSuccess = useSelector(
    (state) => state.Authentication.isPostRegistrationSuccess
  )
  const isCheckUserSuccess = useSelector(
    (state) => state.Authentication.isCheckUserSuccess
  )
  const isSaveUserSuccess = useSelector(
    (state) => state.Authentication.isSaveUserSuccess
  )

  const lsData = JSON.parse(localStorage.getItem("userData"))

  useEffect(() => {
    if (!isObjectEmpty(lsData)) {
      history.navigate("/")
    }
    if (token) {
      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(data))
      if (token && data) {
        history.navigate("/")
      }
    }
  }, [token, data])

  useEffect(() => {
    if (error) {
      ErrorMessage("", error)
    }
    if (message) {
      SuccessMessage("", message)
    }
  }, [error, message])

  const submitRegistration = () => {
    if (
      regUserIdRef.current.value &&
      regEmailRef.current.value &&
      regHPRef.current.value
    ) {
      dispatch(
        postUserRegistration({
          UserId: regUserIdRef.current.value,
          Email: regEmailRef.current.value,
          NoHP: regHPRef.current.value,
        })
      )
    }
  }

  const submitForgotPassword = () => {
    dispatch(forgotPassword({ userId: "", email: "" }))
  }

  const renderModalRegister = () => {
    return (
      <div
        id="hs-focus-management-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <div></div>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-focus-management-modal"
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
            <div className="p-4 overflow-y-auto">
              <div className="flex flex-col justify-items-center">
                <section className="grid justify-items-center mb-3">
                  <img
                    src={LogoImage}
                    className="w-[60%] h-auto text-center"
                    alt="logo"
                  />
                </section>
                <div className="header-card flex flex-col justify-center items-center">
                  <p className="font-light text-base">Register User</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="reg_userid"
                  className="block text-sm mb-1 mt-3 dark:text-white"
                >
                  UserID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    ref={regUserIdRef}
                    id="reg_userid"
                    name="reg_userid"
                    placeholder="Masukkan User ID"
                    className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  htmlFor="reg_email"
                  className="block text-sm mb-1 mt-3 dark:text-white"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    ref={regEmailRef}
                    id="reg_email"
                    name="reg_email"
                    placeholder="Masukkan Email"
                    className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="reg_hp"
                  className="block text-sm mb-1 mt-3 dark:text-white"
                >
                  No. HP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    ref={regHPRef}
                    id="reg_hp"
                    name="reg_hp"
                    placeholder="Masukkan Nomor HP"
                    className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={submitRegistration}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderModalForgotPassword = () => {
    return (
      <div
        id="hs-focus-management-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <div></div>
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-focus-management-modal"
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
            <div className="p-4 overflow-y-auto">
              <div className="flex flex-col justify-items-center">
                <section className="grid justify-items-center mb-3">
                  <img
                    src={LogoImage}
                    className="w-[60%] h-auto text-center"
                    alt="logo"
                  />
                </section>
                <div className="header-card flex flex-col justify-center items-center">
                  <p className="font-light text-base">Register User</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="forgot_userid"
                  className="block text-sm mb-1 mt-3 dark:text-white"
                >
                  UserID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    ref={forgotUserIdRef}
                    id="forgot_userid"
                    name="forgot_userid"
                    placeholder="Masukkan User ID"
                    className="disabled:bg-gray-300 py-1 px-2 block w-full border-gray-300 rounded border-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                className="py-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={submitForgotPassword}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
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
              <p className="font-light text-3xl">Login</p>
              <p className="font-light text-lg">
                Masukkan Email dan Password anda.
              </p>
            </div>
          </div>
          <form
            className="grid gap-y-4 p-5"
            method="POST"
            onSubmit={handleLogin}
          >
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Email"
                  ref={emailRef}
                />
              </div>
            </div>
            {/* <!-- End Form Group --> */}

            {/* <!-- Form Group --> */}
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 "
                  required
                  ref={passwordRef}
                  placeholder="Password"
                />
              </div>
              <div className="flex justify-between items-center mt-3">
                <div></div>
                {/* <label htmlFor="password" className="block text-sm mb-1 mt-3 dark:text-white">Password</label> */}
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Lupa Password?
                </a>
              </div>
            </div>
            {/* <!-- End Form Group --> */}

            <div>
              Belum Memiliki Akun?{" "}
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="#"
                data-hs-overlay="#hs-focus-management-modal"
              >
                Daftar
              </a>
            </div>
            <button
              type="submit"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {renderModalRegister()}
      {renderModalForgotPassword()}
    </>
  )
}

export default Login
