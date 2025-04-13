import { Link, useNavigate } from "react-router-dom";
import "../css/userlogin.css";
import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setRole } from "../Redux/roleslice";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputEmail, setInputEmail] = useState({});

  const handleEmail = (e) => {
    setInputEmail({
      ...inputEmail,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/login", inputEmail)
      .then((res) => {
        console.log("Data saved", res.data);
        if (res.data) {
          const userRole = res.data.role;
          
          dispatch(setRole(userRole)); // store role in Redux
          navigate("/emailverify", { state: { email: inputEmail.useremail, role: userRole, purpose: "login" } });
        }
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };

  return (
    <>
      <div className="full-user-login-body">
        <div className="outer-user-login-div">
          <div className="inner-userlogin-div">
            <h1>Login / Signup</h1>
            <p>Please enter your email address to continue </p>
            <div className="form-terms">
              <form onSubmit={handlesubmit}>
                <input
                  type="email"
                  name="useremail"
                  placeholder="Email id"
                  onChange={handleEmail}
                />
                <button type="submit" className="btn-user-submit">
                  Send Code
                </button>
              </form>
            </div>

            <div className="orsignupas">
              <hr />
              <p>Or Sign up as</p>
              <hr />
            </div>

            <div className="signupdecide">
              <Link to="/userSignup" className="tosigninpage">
                <button>User</button>
              </Link>
              <Link to="/businessSignup" className="tosigninpage">
                <button>Corporate</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
