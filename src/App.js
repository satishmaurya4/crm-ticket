import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Customer from "./pages/Customer";
import Engineer from "./pages/Engineer";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorised";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '@coreui/coreui/dist/css/coreui.min.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-circular-progressbar/dist/styles.css"


const ROLES = {
  CUSTOMER: "CUSTOMER",
  ENGINEER: "ENGINEER",
  ADMIN: "ADMIN",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/admin" exact element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" exact element={<Customer />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />}>
          <Route path="/engineer" exact element={<Engineer />} />
        </Route>

        {/* <Route
          path="/home"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      
      </Routes>
    </Router>
  );
}

export default App;
