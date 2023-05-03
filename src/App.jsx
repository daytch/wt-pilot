import React from "react"
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom"
import { history } from "./helpers/history.js"

import { PrivateRoute } from "./PrivateRoute"

const BuatPassword = React.lazy(() => import("./pages/buatPassword.jsx"))
const Login = React.lazy(() => import("./pages/login"))
const NotFound = React.lazy(() => import("./pages/notfound"))
const Admin = React.lazy(() => import("./pages/admin/admin"))
const Reset = React.lazy(() => import("./pages/admin/reset"))

function App() {
  history.navigate = useNavigate()
  history.location = useLocation()

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
      <Route path="/buatpassword" element={<BuatPassword />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  )
}

export default App
