import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Customer from "./pages/Customer";
import Engineer from "./pages/Engineer";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorised";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-circular-progressbar/dist/styles.css";
import "antd/dist/antd.css";
import "./styles/globalStyles.css";
import "./App.css";
import "./styles/variables.css";
import "./styles/responsive.css";
import { ThemeProvider } from "@mui/material/styles";
import { Consume } from "./context";
import ThemeToggler from "./components/ThemeToggler";

const ROLES = {
  CUSTOMER: "CUSTOMER",
  ENGINEER: "ENGINEER",
  ADMIN: "ADMIN",
};

function App() {
  const { ModeTheme } = Consume();
  return (
      <ThemeProvider theme={ModeTheme}>
      <ThemeToggler />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "blue",
                      fontSize: "40px",
                    }}
                  >
                    Loading...
                  </div>
                }
              >
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
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      </ThemeProvider>
      
  );
}

export default App;
