import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './../../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import Dashboard from '../admin/dashboard';
import { postLogin } from '../../redux/slices/authenticationSlice.js';

import JadwalKedatangan from '../admin/jadwalkedatangan';
import PPKB from '../admin/ppkb';
import Realisasi from '../admin/realisasipemanduan';

import { useIdleTimer } from 'react-idle-timer';
import { timeOut } from '../../redux/constants.js';
import { isEmptyNullOrUndefined } from '../../functions/index.js';
import { ErrorMessage, SuccessMessage } from '../../components/Notification';

const Admin = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isActive = useSelector((state) => state.Dashboard.activeSidebarMenu);
  const loading = useSelector((state) => state.Dashboard.loading);
  const dispatch = useDispatch();

  const passwordRef = useRef();
  const btnReloginModalRef = useRef();

  const token = useSelector((state) => state.Authentication.token);
  const data = useSelector((state) => state.Authentication.data);
  const reloginMessage = useSelector(
    (state) => state.Authentication.reloginMessage
  );
  const reloginError = useSelector(
    (state) => state.Authentication.reloginError
  );

  const [isUserActive, setIsUserActive] = useState(
    isEmptyNullOrUndefined(localStorage.getItem('isUserActive'))
      ? true
      : localStorage.getItem('isUserActive')
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(data));

      if (token && data) {
        btnReloginModalRef.current.click();
        setIsUserActive(true);
        localStorage.setItem('isUserActive', true);
        if (reloginMessage) SuccessMessage('', reloginMessage);
      }
    } else if (reloginError) {
      ErrorMessage('', reloginError);
    }
  }, [token, data, reloginError]);

  var firstClick = true;
  useEffect(() => {
    var elementExists = document.getElementById('btnModalRelogin');
    var backDrop = document.getElementById('hs-static-backdrop-modal');
    if (!isUserActive && elementExists && backDrop && firstClick) {
      btnReloginModalRef.current.click();
      localStorage.setItem('isUserActive', isUserActive);
      firstClick = false;
    }
  }, []);

  const onIdle = () => {
    if (isUserActive) {
      btnReloginModalRef.current.click();
      localStorage.setItem('isUserActive', false);
      setIsUserActive(false);
    }
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    timeout: isUserActive ? timeOut * 60000 : 0,
    throttle: 500,
  });

  function handleLogin(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('Email', userData.Email);
    data.append('Password', passwordRef.current.value);
    dispatch(postLogin(data));
  }

  const renderMenu = () => {
    return isActive.dashboard ? (
      <Dashboard />
    ) : isActive.jadwal ? (
      <JadwalKedatangan />
    ) : isActive.ppkb ? (
      <PPKB />
    ) : isActive.realisasi ? (
      <Realisasi />
    ) : null;
  };

  const backDropActive =
    'hs-overlay backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static] open';
  const backDroopNonActive =
    'hs-overlay hidden backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]'; //"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto"

  return (
    <>
      <button
        type="button"
        id="btnModalRelogin"
        className="hidden py-3 px-4 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        data-hs-overlay="#hs-static-backdrop-modal"
        ref={btnReloginModalRef}
      >
        Open modal
      </button>

      <div
        id="hs-static-backdrop-modal"
        className="hs-overlay hidden backdrop-blur-sm w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto [--overlay-backdrop:static]"
        // className={!isUserActive ? backDropActive : backDroopNonActive}
        data-hs-overlay-keyboard="false"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Back again?
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Please type your password to back to the application
                </p>
              </div>

              <div className="mt-5">
                <form method="POST" onSubmit={handleLogin}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          ref={passwordRef}
                          type="password"
                          id="password"
                          name="password"
                          className="py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-1 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Let me in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Loader isLoading={loading} />

      <Sidebar />
    </>
  );
};

export default Admin;
