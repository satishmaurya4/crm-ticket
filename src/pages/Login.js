import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { userSignin, userSignup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState("CUSTOMER");
  const [userSignupData, setUserSignupData] = useState({});
  const [userSigninData, setUserSigninData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [signInErrorMessage, setSignInErrorMessage] = useState("");
  const navigate = useNavigate();

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleSelect = (e) => {
    setUserType(e);
  };

  const userSignupDataHandler = (e) => {
    userSignupData[e.target.id] = e.target.value;
  };

  const userSigninDataHandler = (e) => {
    userSigninData[e.target.id] = e.target.value;
  };

  const userSignupDataSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      ...userSignupData,
      userType: userType,
    };
    console.log("user signup data", data);
    userSignup(data)
      .then(function (response) {
        if (response.status === 201) {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  const userSigninDataSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userSigninData);
    userSignin(userSigninData)
      .then(function (response) {
        if (response.data.message) {
          setSignInErrorMessage(response.data.message);
        } else {
          console.log("sigin response", response.data);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userType", response.data.userTypes);
          localStorage.setItem("userStatus", response.data.userStatus);
          localStorage.setItem("token", response.data.accessToken);
          if (response.data.userTypes === "CUSTOMER") {
            window.location.href = "/customer";
          } else if (response.data.userTypes === "ENGINEER") {
            window.location.href = "/engineer";
          } else {
            window.location.href = "/admin";
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setSignInErrorMessage(error.response.data.message);
        } else {
          console.log(error);
          setSignInErrorMessage(error.message);
        }
      });
  };

  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="card m-5 p-5">
        <div className="row">
          <div className="col">
            {!showSignup ? (
              <div className="login">
                <form onSubmit={userSigninDataSubmitHandler}>
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      id="userId"
                      className="form-control"
                      placeholder="User ID"
                      onChange={userSigninDataHandler}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={userSigninDataHandler}
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                  </div>
                  <p
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={toggleSignup}
                  >
                    Don't have an account. Signup!
                  </p>
                  <p className="text-danger">{signInErrorMessage}</p>
                </form>
              </div>
            ) : (
              <div className="signup">
                <form onSubmit={userSignupDataSubmitHandler}>
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      id="userId"
                      className="form-control"
                      placeholder="User ID"
                      onChange={userSignupDataHandler}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Username"
                      onChange={userSignupDataHandler}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={userSignupDataHandler}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={userSignupDataHandler}
                    />
                  </div>
                  <div className="input-group">
                    <span className="text-muted">User Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      variant="light"
                      className="mx-1"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="ENGINEER">
                        ENGINEER
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary">Signup</button>
                  </div>
                  <p
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={toggleSignup}
                  >
                    Already have an account. Login!
                  </p>
                  <p className="text-danger">{errorMessage}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
