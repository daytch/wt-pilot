import { useEffect, useRef, useState } from "react";

export function isEmptyNullOrUndefined(param) {
  if (param === undefined) {
    return true;
  }
  if (param === null) {
    return true;
  }
  if (isString(param)) {
    return param.replace(/\s+/g, "") === "";
  }
  return false;
}

export function isString(param) {
  return Object.prototype.toString.call(param) === "[object String]";
}
export function isObjectEmpty(object) {
  var isEmpty = true;
  // eslint-disable-next-line no-unused-vars
  for (var keys in object) {
    isEmpty = false;
    break; // exiting since we found that the object is not empty
  }
  return isEmpty;
}

export function dateToString(date) {
  // return date.toISOString().split('T')[0]
  let month =
    (new Date(date).getMonth() + 1).toString().length < 2
      ? "0" + (new Date(date).getMonth() + 1)
      : new Date(date).getMonth() + 1;

  let day =
    new Date(date).getDate().toString().length < 2
      ? "0" + new Date(date).getDate()
      : new Date(date).getDate();
  return new Date(date).getFullYear() + "-" + month + "-" + day;
}

export function datetimeToString(date) {
  // return date.toISOString().split('T')[0]
  let month =
    (new Date(date).getMonth() + 1).toString().length < 2
      ? "0" + (new Date(date).getMonth() + 1)
      : new Date(date).getMonth() + 1;

  let day =
    new Date(date).getDate().toString().length < 2
      ? "0" + new Date(date).getDate()
      : new Date(date).getDate();

  let hour =
    new Date(date).getHours().toString().length < 2
      ? "0" + new Date(date).getHours()
      : new Date(date).getHours();
  let minutes =
    new Date(date).getMinutes().toString().length < 2
      ? "0" + new Date(date).getMinutes()
      : new Date(date).getMinutes();
  return (
    new Date(date).getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minutes
  );
}
export function formatDate(value) {
  // let date = new Date(value)
  // const day = date.toString('default', { day: '2-digit' })
  // const month = date.toString('default', { month: 'short' })
  // const year = date.toString('default', { year: 'numeric' })
  // return day + '-' + month + '-' + year
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var date = new Date(value);
  date =
    date.getDate() +
    "-" +
    monthNames[date.getMonth()] +
    "-" +
    date.getFullYear();
  return date;
}

export function diffDate(date1, date2, interval) {
  var second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;
  date1 = new Date(date1);
  date2 = new Date(date2);
  var timediff = date2 - date1;
  if (isNaN(timediff)) return NaN;
  switch (interval) {
    case "years":
      return date2.getFullYear() - date1.getFullYear();
    case "months":
      return (
        date2.getFullYear() * 12 +
        date2.getMonth() -
        (date1.getFullYear() * 12 + date1.getMonth())
      );
    case "weeks":
      return Math.floor(timediff / week);
    case "days":
      return Math.floor(timediff / day);
    case "hours":
      return Math.floor(timediff / hour);
    case "minutes":
      return Math.floor(timediff / minute);
    case "seconds":
      return Math.floor(timediff / second);
    default:
      return undefined;
  }
}

export function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

export function merge(...arrays) {
  const merged = {};

  arrays.forEach((data) =>
    data.forEach((o) => Object.assign((merged[o.periodId] ??= {}), o))
  );

  return Object.values(merged);
}
export const returnFlattenObject = (arr) => {
  const flatObject = {};
  for (let i = 0; i < arr.length; i++) {
    for (const property in arr[i]) {
      flatObject[`${property}_${i}`] = arr[i][property];
    }
  }
  return flatObject;
};

export const getExclamationMark = (total) => {
  let tndaPentung = "";
  for (let index = 0; index < total; index++) {
    tndaPentung = tndaPentung + "!";
  }
  return tndaPentung;
};
export const useEffectOnce = (effect) => {
  const destroyFunc = useRef();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);
    // console.log(val);
    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export function formatNumber(angka, prefix) {
  return generalNumberConverter(angka, prefix, "");
}
export function formatRupiah(angka, prefix) {
  return generalNumberConverter(angka, prefix, "rupiah");
}
export function convertDate(tgl) {
  const today = new Date(tgl);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let min = today.getMinutes();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return (
    dd +
    "/" +
    mm +
    "/" +
    yyyy +
    " - " +
    (hh.toString().length < 2 ? "0" + hh : hh) +
    ":" +
    (min.toString().length < 2 ? "0" + min : min)
  );
}
export const generalNumberConverter = (angka, prefix, tipe) => {
  if (angka) {
    var number_string = angka.toString().replace(/[^,\d]/g, ""),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    if (tipe === "rupiah") {
      return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    } else {
      return prefix === undefined ? rupiah : rupiah ? rupiah : "";
    }
  } else {
    return "";
  }
};

/**
 * Normalisasi nomor HP lokal
 * @param {string} phone
 * @return {string}
 */
export function normalisasiNomorHP(phone) {
  phone = String(phone).trim();
  if (phone.startsWith("+62")) {
    phone = "0" + phone.slice(3);
  } else if (phone.startsWith("62")) {
    phone = "0" + phone.slice(2);
  }
  return phone.replace(/[- .]/g, "");
}

/**
 * Tes nomor HP lokal
 * @param {string} phone
 * @return {boolean}
 */
export function tesNomorHP(phone) {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false;
  }
  return true;
}

/**
 * Deteksi operator seluler indonesia
 * @param {string} phone
 * @return {string?}
 */
export function deteksiOperatorSeluler(phone) {
  const prefix = phone.slice(0, 4);
  if (["0831", "0832", "0833", "0838"].includes(prefix)) return "axis";
  if (["0895", "0896", "0897", "0898", "0899"].includes(prefix)) return "three";
  if (["0817", "0818", "0819", "0859", "0878", "0877"].includes(prefix))
    return "xl";
  if (["0814", "0815", "0816", "0855", "0856", "0857", "0858"].includes(prefix))
    return "indosat";
  if (
    [
      "0812",
      "0813",
      "0852",
      "0853",
      "0821",
      "0823",
      "0822",
      "0851",
      "0811",
      "0854",
    ].includes(prefix)
  )
    return "telkomsel";
  if (
    [
      "0881",
      "0882",
      "0883",
      "0884",
      "0885",
      "0886",
      "0887",
      "0888",
      "0889",
    ].includes(prefix)
  )
    return "smartfren";
  return null;
}

/**
 * Apakah nomor HP ini valid?
 * @param {string} phone
 * @return {boolean}
 */
export function validasiNomorSeluler(phone) {
  phone = normalisasiNomorHP(phone);
  return tesNomorHP(phone) && !!deteksiOperatorSeluler(phone);
}
export function validateEmail(mail) {
  return mail.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
export const twoDigits = (num) => String(num).padStart(2, "0");

export function useQuery() {
  return new URLSearchParams(window.location.search);
}

export function getImageUrl(name) {
  return new URL(`./${name}`, import.meta.url).href;
}

function getOperatingSystem(window) {
  let operatingSystem = "Not known";
  if (window.navigator.appVersion.indexOf("Win") !== -1) {
    operatingSystem = "Windows OS";
  }
  if (window.navigator.appVersion.indexOf("Mac") !== -1) {
    operatingSystem = "MacOS";
  }
  if (window.navigator.appVersion.indexOf("X11") !== -1) {
    operatingSystem = "UNIX OS";
  }
  if (window.navigator.appVersion.indexOf("Linux") !== -1) {
    operatingSystem = "Linux OS";
  }

  return operatingSystem;
}

function getBrowser(window) {
  let currentBrowser = "Not known";
  if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
    currentBrowser = "Google Chrome";
  } else if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
    currentBrowser = "Mozilla Firefox";
  } else if (window.navigator.userAgent.indexOf("MSIE") !== -1) {
    currentBrowser = "Internet Exployer";
  } else if (window.navigator.userAgent.indexOf("Edge") !== -1) {
    currentBrowser = "Edge";
  } else if (window.navigator.userAgent.indexOf("Safari") !== -1) {
    currentBrowser = "Safari";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "Opera";
  } else if (window.navigator.userAgent.indexOf("Opera") !== -1) {
    currentBrowser = "YaBrowser";
  } else {
    console.log("Others");
  }

  return currentBrowser;
}
export const OS = (window) => getOperatingSystem(window);
export const currentBrowser = (window) => getBrowser(window);

export const dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};
