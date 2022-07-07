import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { userSignin, userSignup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import login from "../assets/login.svg";
import signup from "../assets/signup.svg";
import signupGif from "../assets/signup.gif";
// import { Select } from "antd";
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
} from "@mui/material";
import { Consume } from "../context";

let isInitial = true;

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [userSigninData, setUserSigninData] = useState({});
  // const [userSignupData, setUserSignupData] = useState({
  //   userId: '',
  //   name: '',
  //   email: '',
  //   password:'',
  // });
  // const [userSigninData, setUserSigninData] = useState({
  //   userId: "",
  //   password: "",
  // });
  const [apiMessage, setApiMessage] = useState("");
  const [showAccountAnimation, setShowAccountAnimation] = useState(false);
  // const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const navigate = useNavigate();
  // const userSignup = useUserSignup();
  const { initialState, setInitialState, isLoading, notify } = Consume();
  console.log(initialState);
  console.log("loading", isLoading);
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
    // setUserSignupData({
    //   ...userSignupData,
    //   [e.target.id]: e.target.value,
    // })
  };

  const userSigninDataHandler = (e) => {
    userSigninData[e.target.id] = e.target.value;
    // setUserSigninData({
    //   ...userSigninData,
    //   [e.target.id]: e.target.value,
    // })
  };

  const registered = () => {
    navigate(0);
  };

  const userSignupDataSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userType);
    const data = {
      ...userSignupData,
      userType: userType,
    };
    // setInitialState(data);
    // console.log("user signup data", data);
    // setShowAccountAnimation(true);
    userSignup(data)
      .then(function (response) {
        console.log("response", response);
        if (response.status === 201) {
          // setShowAccountAnimation(false);
          console.log("registered");
          registered();
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          // setErrorMessage(error.response.data.message);
          setApiMessage({
            status: "error",
            title: "error",
            message: error.response.data.message,
          });
          // console.log(error.response.data.message)
          // console.log("got 400")
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
    const userId = userSigninData.userId;
    const password = userSigninData.password;
    const data = {
      userId,
      password,
    };
    console.log("data", data);
    userSignin(data)
      .then(function (response) {
        if (response.data.message) {
          // setApiMessage(response.data.message);
          console.log("user sigin in response data message", response);
        } else {
          console.log("sigin response", response.data);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userTypes", response.data.userTypes);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("token", response.data.accessToken);
          console.log("response usertype", response.data.userTypes);
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

  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     console.log("inside effect if")
  //     return;
  //   }
  //   console.log(initialState !== {});
  //   if(initialState){
  //     console.log("effect", initialState)
  //     userSignup(initialState)
  //       .then(function (response) {
  //         if (response.status === 201) {
  //           // setShowAccountAnimation(false);
  //           console.log("registered");
  //           registered();
  //         }
  //       })
  //       .catch(function (error) {
  //         // console.log(error)
  //         // if (error.response.status === 400) {
  //         //   // setErrorMessage(error.response.data.message);
  //         // } else {
  //         //   console.log(error);
  //         // }
  //       });
  //   }
  //   // init = true;
  // }, [initialState]);

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

  return (
    <div className="login-container">
      {apiMessage && <Toast info={apiMessage} />}
      {/* {showAccountAnimation ? (
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
      ) : ( */}
      <div className="login-content-wrapper">
        {/* {
          apiMessage && <div>{apiMessage}</div>
        } */}
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
                  // value={userSigninData.userId}
                  onChange={userSigninDataHandler}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  // value={userSigninData.password}
                  onChange={userSigninDataHandler}
                />
                <Button variant="contained" type="submit">
                  Login
                </Button>

                <Typography
                  variant="body2"
                  onClick={toggleSignup}
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Don't have an account. Signup!
                </Typography>
                {/* {signInErrorMessage && (
              <p className="text-danger">{signInErrorMessage}</p>
            )} */}
              </form>
            </Paper>
          ) : (
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
                  // value={userSignupData.userId}
                  onChange={userSignupDataHandler}
                />
                <TextField
                  id="name"
                  label="Username"
                  variant="outlined"
                  // value={userSignupData.name}
                  onChange={userSignupDataHandler}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  // value={userSignupData.email}
                  onChange={userSignupDataHandler}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  // value={userSignupData.password}
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
                  Signup
                </Button>
                <Typography
                  color="primary"
                  variant="body2"
                  onClick={toggleSignup}
                  sx={{ cursor: "pointer" }}
                >
                  Already have an account. Login!
                </Typography>
                {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
              </form>
            </Paper>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Login;
