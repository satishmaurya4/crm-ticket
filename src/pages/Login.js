import React, { useEffect, useState } from "react";
import { userSignin, userSignup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import login from "../assets/login.svg";
import signup from "../assets/signup.svg";
import signupGif from "../assets/signup.gif";
import Toast from "../components/Toast";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Consume } from "../context";
import { logout } from "../utils/logout";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [userSigninData, setUserSigninData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [showAccountAnimation, setShowAccountAnimation] = useState(false);

  const navigate = useNavigate();

  const { mode } = Consume();

  const toggleSignup = () => {
    clearState();
    setShowSignup(!showSignup);
  };

  const clearState = () => {
    setUserSigninData({
      userId: "",
      password: "",
    });
    setUserSignupData({
      userId: "",
      password: "",
      name: "",
      email: "",
    });
    setUserType("CUSTOMER");
  };

  const handleSelect = (e) => {
    setUserType(e.target.value);
  };

  const userSignupDataHandler = (e) => {
    userSignupData[e.target.id] = e.target.value;
  };

  const userSigninDataHandler = (e) => {
    userSigninData[e.target.id] = e.target.value;
  };

  const registered = () => {
    setTimeout(() => {
      navigate(0);
    }, 2000);
  };

  const userSignupDataSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      ...userSignupData,
      userType: userType,
    };
    userSignup(data)
      .then(function (response) {
        setShowAccountAnimation(true);
        setIsLoading(false);
        if (response.status === 201) {
          registered();
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        if (error.response.status === 400) {
          setApiMessage({
            status: "error",
            title: "error",
            message: error.response.data.message,
          });
        } else {
          setApiMessage({
            status: "error",
            title: "error",
            message: error.response.data.message,
          });
        }
      });
  };

  const userSigninDataSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = userSigninData.userId;
    const password = userSigninData.password;
    const data = {
      userId,
      password,
    };
    userSignin(data)
      .then(function (response) {
        setIsLoading(false);
        if (response.data.message) {
        } else {
      
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userTypes", response.data.userTypes);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("token", response.data.accessToken);
          if (response.data.userTypes === "CUSTOMER") {
            navigate("/customer");
          } else if (response.data.userTypes === "ENGINEER") {
            navigate("/engineer");
          } else {
            navigate("/admin");
          }
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        if (error.response.status === 400) {
          setApiMessage({
            status: "error",
            title: "error",
            message: error.response.data.message,
          });
        } else {
          logout();
        }
      });
  };

  useEffect(() => {
    let id;
    if (apiMessage) {
      id = setTimeout(() => {
        setApiMessage("");
      }, 2000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [apiMessage]);

  if (showAccountAnimation) {
    return (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={signupGif}
          alt=""
          style={{ width: "180px", height: "180px" }}
        />
        <p style={{ color: "limegreen", fontSize: "22px" }}>
          Registered Successfully!
        </p>
      </div>
    );
  }

  return (
    <div className={`${mode === "dark" ? "darkModeBg login-container" : "login-container"}`}>
      {apiMessage && <Toast info={apiMessage} />}

      <div className="login-content-wrapper">
        <Typography
          variant="h2"
          color="primary"
          sx={{ textAlign: "center" }}
          className="login-title"
        >
          {!showSignup ? "Welcome Back!" : "Welcome!"}
        </Typography>
        <div className="login-content">
          <div className="image-wrapper">
            {!showSignup ? (
              <img src={login} alt="" className="image" />
            ) : (
              <img src={signup} alt="" className="image" />
            )}
          </div>

          {!showSignup ? (
            <Paper
              sx={{
                alignSelf: "center",
                justifySelf: "right",
                height: "max-content",
                width: "max-content",
                padding: "10px",
              }}
              className="form-wrapper"
            >
              <form onSubmit={userSigninDataSubmitHandler} className="form">
                <TextField
                  id="userId"
                  label="User ID"
                  variant="outlined"
                  onChange={userSigninDataHandler}
                  className="login-input"
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  // value={userSigninData.password}
                  onChange={userSigninDataHandler}
                />
                <Button variant="contained" type="submit">
                  {!isLoading ? "Login" : <CircularProgress color="inherit" />}
                </Button>

                <Typography
                  variant="body2"
                  onClick={toggleSignup}
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Don't have an account. Signup!
                </Typography>
              </form>
            </Paper>
          ) : (
            <>
              <Paper
                sx={{
                  alignSelf: "center",
                  justifySelf: "right",
                  height: "max-content",
                  width: "max-content",
                  padding: "10px",
                }}
                className="form-wrapper"
              >
                <form onSubmit={userSignupDataSubmitHandler} className="form">
                  <TextField
                    id="userId"
                    label="User ID"
                    variant="outlined"
  
                    onChange={userSignupDataHandler}
                  />
                  <TextField
                    id="name"
                    label="Username"
                    variant="outlined"
                    onChange={userSignupDataHandler}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"

                    onChange={userSignupDataHandler}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
      
                    onChange={userSignupDataHandler}
                  />
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      User Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      value={userType}
                      label="User Type"
                      onChange={handleSelect}
                    >
                      <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
                      <MenuItem value="ENGINEER">ENGINEER</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" type="submit">
                    {!isLoading ? (
                      "Signup"
                    ) : (
                      <CircularProgress color="inherit" />
                    )}
                  </Button>
                  <Typography
                    color="primary"
                    variant="body2"
                    onClick={toggleSignup}
                    sx={{ cursor: "pointer" }}
                  >
                    Already have an account. Login!
                  </Typography>
                </form>
              </Paper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
