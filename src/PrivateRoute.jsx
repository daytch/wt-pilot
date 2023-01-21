import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { history } from "./helpers/history.js";
import { isObjectEmpty } from "./functions";

export { PrivateRoute };

function PrivateRoute({ children }) {
  const data = JSON.parse(localStorage.getItem("userData"));

  if (isObjectEmpty(data)) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" state={{ from: history.location }} />;
  }

  // authorized so return child components
  return children;
}
