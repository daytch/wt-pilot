import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { history } from "./helpers/history.js";

import { PrivateRoute } from "./PrivateRoute";

const Login = React.lazy(() => import("./pages/login"));
const NotFound = React.lazy(() => import("./pages/notfound"));
const Admin = React.lazy(() => import("./pages/admin/admin"));

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();
  // console.log("history:", history);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  );
}

export default App;
