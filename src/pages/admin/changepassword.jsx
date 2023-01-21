import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChangePassword } from "../../redux/slices/authenticationSlice.js";
import { toogleLoading } from "../../redux/slices/dashboardSlice.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ChangePassword = () => {
  const dispatch = useDispatch();
  const currentRef = useRef();
  const baruRef = useRef();
  const confirmRef = useRef();
  const formRef = useRef();
  const [url, setUrl] = useState("");
  const [errorBaru, setErrorBaru] = useState(false);
  const [errorCurrent, setErrorCurrent] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const message = useSelector((state) => state.Authentication.message);
  const error = useSelector((state) => state.Authentication.error);
  const loading = useSelector((state) => state.Authentication.loading);

  useEffect(() => {
    dispatch(toogleLoading(loading));
  }, [loading]);

  useEffect(() => {
    if (message) {
      MySwal.fire({
        title: <strong>Success!</strong>,
        html: message,
        icon: "success",
      });
      dispatch(toogleLoading(false));
    } else if (error) {
      MySwal.fire({
        title: <strong>Failed!</strong>,
        html: error,
        icon: "error",
      });
      dispatch(toogleLoading(false));
    }
  }, [message, error]);

  function handleSubmit(e) {
    e.preventDefault();

    let pl = {
      username: userData.email,
      old_password: currentRef.current.value,
      new_password: baruRef.current.value,
    };

    if (baruRef.current.value !== confirmRef.current.value) {
      MySwal.fire({
        title: <strong>Failed!</strong>,
        html: "Password baru harus sama dengan password confirmation",
        icon: "error",
      });
    } else if (!errorBaru && !errorCurrent && !errorConfirm) {
      dispatch(
        postChangePassword({
          username: userData.email,
          old_password: currentRef.current.value,
          new_password: baruRef.current.value,
        })
      );
    }
    dispatch(toogleLoading(false));
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6]">
      <p className="text-xl font-light my-4">
        Change <span className="font-bold">Password</span>
      </p>

      <form
        className="grid gap-y-4 p-5"
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <div className="relative">
            <input
              type="password"
              id="current"
              name="current"
              className="py-2 px-3 block w-full lg:w-[30vw] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              placeholder="Silahkan Current password."
              //   onChange={(e) =>
              //     setErrorCurrent(!reg.test(e?.currentTarget?.value))
              //   }
              ref={currentRef}
            />
            {errorCurrent ? (
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                <svg
                  className="h-5 w-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            ) : null}
          </div>
          {errorCurrent ? (
            <p className="flex text-xs text-red-600 mt-2" id="nama-error">
              Password anda harus minimal 8 karakter dan berisi huruf kecil dan
              besar.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="password"
              id="baru"
              name="baru"
              className="py-2 px-3 block w-full lg:w-[30vw] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              onChange={(e) => setErrorBaru(!reg.test(e?.currentTarget?.value))}
              ref={baruRef}
              placeholder="Silahkan input Password baru."
            />
            {errorBaru ? (
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                <svg
                  className="h-5 w-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            ) : null}
          </div>
          {errorBaru ? (
            <p className="flex text-xs text-red-600 mt-2" id="nik-error">
              Password anda harus minimal 8 karakter dan berisi huruf kecil dan
              besar.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="password"
              id="confirm"
              name="confirm"
              className="py-2 px-3 block w-full lg:w-[30vw] border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              onChange={(e) =>
                setErrorConfirm(!reg.test(e?.currentTarget?.value))
              }
              ref={confirmRef}
              placeholder="Silahkan input konfirmasi password baru."
            />
            {errorConfirm ? (
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                <svg
                  className="h-5 w-5 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            ) : null}
          </div>
          {errorConfirm ? (
            <p className="flex text-xs text-red-600 mt-2" id="phone-error">
              Password anda harus minimal 8 karakter dan berisi huruf kecil dan
              besar.
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full lg:w-[30vw] mt-8 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
