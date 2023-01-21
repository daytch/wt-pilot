import React, { useEffect, useRef } from "react";
import { getImageUrl } from "./../functions";
import LogoImage from "./../assets/logo-hd.png";
import { postLogin } from "./../redux/slices/authenticationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../helpers/history.js";
import { isObjectEmpty } from "../functions/index.js";
import Loader from "../components/Loader";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import { ErrorMessage } from "../components/Notification";

// const MySwal = withReactContent(Swal);

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleLogin(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("Email", emailRef.current.value);
    data.append("Password", passwordRef.current.value);
    dispatch(postLogin(data));
  }

  const token = useSelector((state) => state.Authentication.token);
  const data = useSelector((state) => state.Authentication.data);
  const loading = useSelector((state) => state.Authentication.loading);
  const error = useSelector((state) => state.Authentication.error);

  const lsData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (!isObjectEmpty(lsData)) {
      history.navigate("/");
    }
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(data));
      if (token && data) {
        history.navigate("/");
      }
    }
  }, [token, data]);

  useEffect(() => {
    if (error) {
      // MySwal.fire({
      //   title: <strong>Failed!</strong>,
      //   html: error,
      //   icon: "error",
      // });
      ErrorMessage("", error);
    }
  }, [error]);

  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="bg-cover bg-center w-screen h-screen grid place-items-center"
        style={{ backgroundImage: "url(/bg-full.webp)" }}
      >
        {/* <div className="lg:w-1/3 lg:h-[45%] bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-sm mx-auto"> */}
        <div className="lg:w-1/3 lg:h-[45%] h-auto flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex flex-col justify-items-center">
            <section className="grid justify-items-center mb-3">
              <img
                src={LogoImage}
                className="w-[60%] h-auto text-center"
                alt="logo"
              />
            </section>
            <div className="header-card flex flex-col justify-center items-center">
              <p className="font-medium text-3xl">Login</p>
              <p className="font-light text-xl">
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
            </div>
            {/* <!-- End Form Group --> */}

            <button
              type="submit"
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
