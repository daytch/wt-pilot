import React, { useEffect, useRef, useState } from "react";
import {
  getImageUrl,
  isObjectEmpty,
  validateEmail,
  validasiNomorSeluler,
} from "./../../functions";
import LogoImage from "../../assets/logo.png";
import { postSubmitSurat } from "./../../redux/slices/suratSlice.js";
import { toogleLoading } from "./../../redux/slices/dashboardSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../helpers/history.js";
import axios from "axios";
import { nikParser } from "nik-parser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const InputSurat = () => {
  const dispatch = useDispatch();
  const namaRef = useRef();
  const nikRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const tujuanRef = useRef();
  const judulRef = useRef();
  const formRef = useRef();
  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    nik: false,
    nama: false,
    hp: false,
    email: false,
    tujuan: false,
    judul: false,
    lampiran: false,
  });
  const listTujuan = [
    { id: "B1", text: "Walikota" },
    { id: "B2", text: "Wakil Walikota" },
    { id: "B3", text: "Sekot" },
  ];

  const loading = useSelector((state) => state.Surat.loading);
  const message = useSelector((state) => state.Surat.message);

  useEffect(() => {
    dispatch(toogleLoading(loading));
    if (message)
      MySwal.fire({
        title: <strong>Success!</strong>,
        html: message,
        icon: "success",
      }).then(() => {
        formRef.current.reset();
      });
  }, [loading, message]);

  function handleSubmit(e) {
    e.preventDefault();

    let pl = {
      nik: nikRef.current.value,
      nama: namaRef.current.value,
      no_hp: phoneRef.current.value,
      email: emailRef.current.value,
      tujuan: tujuanRef.current.selectedOptions[0].text,
      judul: judulRef.current.value,
      lampiran: url, // ? url.split("/").pop() : url,
      status: tujuanRef.current.value,
    };
    let err = error;
    err.nik = !nikParser(pl.nik).isValid();
    err.nama = !pl.nama;
    err.hp = !validasiNomorSeluler(pl.no_hp);
    err.email = !validateEmail(pl.email);
    err.tujuan = !pl.tujuan;
    err.judul = !pl.judul;
    err.lampiran = !pl.lampiran;

    if (
      !err.nik &&
      !err.nama &&
      !err.hp &&
      !err.email &&
      !err.tujuan &&
      !err.judul &&
      !err.lampiran
    ) {
      pl.no_hp =
        String(pl.no_hp).substring(0, 1) === "0"
          ? Number("+62" + String(pl.no_hp).substring(1))
          : pl.no_hp;
      dispatch(postSubmitSurat({ data: pl }));
    } else {
      setError({ ...error, err });
    }
    dispatch(toogleLoading(false));
  }
  
  const changeUploadFile = async (e) => {
    dispatch(toogleLoading(true));
    e.preventDefault();
    const formData = new FormData();
    const image = e.target.files[0];
    if (image.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
      formData.append("file", image);
      formData.append("upload_preset", "pemkot_bitung");

      await axios
        .post("https://api.cloudinary.com/v1_1/daytch/image/upload", formData)
        .then((res) => {
          setUrl(res.data["secure_url"]);
          dispatch(toogleLoading(false));
        });
    } else {
      // let er = error;
      // er.lampiran = true;
      // setError(er);
      setError((prevState) => ({
        ...prevState,
        lampiran: true,
      }));
      dispatch(toogleLoading(false));
    }
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-[#F3F4F6] lg:w-1/2">
      <div className="flex flex-row justify-center items-center border-b-[1px] border-black">
        <img src={LogoImage} className="w-20 h-auto inline" alt="logo" />
        <p className="header-card font-medium text-xl ml-4">
          Layanan Surat Pemkot Bitung
        </p>
      </div>

      <form
        className="grid gap-y-4 p-5"
        method="POST"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div>
          <div className="relative">
            <input
              type="text"
              id="nama"
              name="nama"
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              placeholder="Silahkan input Nama"
              ref={namaRef}
            />
            {error.nama ? (
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
          {error.nama ? (
            <p className="flex text-xs text-red-600 mt-2" id="nama-error">
              Nama pengirim wajib diisi.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="number"
              id="nik"
              name="nik"
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              ref={nikRef}
              placeholder="Silahkan input NIK"
            />
            {error.nik ? (
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
          {error.nik ? (
            <p className="flex text-xs text-red-600 mt-2" id="nik-error">
              NIK tidak valid.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="number"
              id="phone"
              name="phone"
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              ref={phoneRef}
              placeholder="Silahkan input No HP (aktif WA)"
            />
            {error.hp ? (
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
          {error.hp ? (
            <p className="flex text-xs text-red-600 mt-2" id="phone-error">
              No Hp tidak valid.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              ref={emailRef}
              placeholder="Silahkan input Email"
            />
            {error.email ? (
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
          {error.email ? (
            <p className="flex text-xs text-red-600 mt-2" id="email-error">
              Email tidak valid.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <select
              ref={tujuanRef}
              className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              <option value="0">Silahkan Pilih Tujuan</option>
              <option value="B1">Walikota</option>
              <option value="B2">Wakil Walikota</option>
              <option value="B3">Sekot</option>
            </select>
            {error.tujuan ? (
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
          {error.tujuan ? (
            <p className="flex text-xs text-red-600 mt-2" id="tujuan-error">
              Tujuan surat wajib diisi.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <input
              type="text"
              id="judul"
              name="judul"
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              ref={judulRef}
              placeholder="Silahkan input Judul Surat"
            />
            {error.judul ? (
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
          {error.judul ? (
            <p className="flex text-xs text-red-600 mt-2" id="judul-error">
              Judul surat wajib diisi.
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <label htmlFor="small-file-input" className="sr-only">
              Choose file
            </label>
            <input
              onChange={changeUploadFile}
              type="file"
              name="small-file-input"
              id="small-file-input"
              className="bg-white block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
            />
            {error.lampiran ? (
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
          {error.lampiran ? (
            <p
              className="flex text-xs text-red-600 mt-2"
              id="small-file-input-error"
            >
              Lampiran wajib diisi dengan file gambar.
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          className="mt-8 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputSurat;
