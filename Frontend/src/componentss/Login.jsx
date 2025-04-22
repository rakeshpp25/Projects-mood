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
  const [isSending, setIsSending] = useState(false); // loading state

  const handleEmail = (e) => {
    setInputEmail({
      ...inputEmail,
      [e.target.name]: e.target.value
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setIsSending(true); // start loading

    axios.post("http://localhost:8000/login", inputEmail)
      .then((res) => {
        if (res.data) {
          const userRole = res.data.role;
          dispatch(setRole(userRole));
          navigate("/emailverify", {
            state: {
              email: inputEmail.useremail,
              role: userRole,
              purpose: "login"
            }
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          toast.error(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          // Request made but no response received
          toast.error("No response from server. Please check your internet connection.");
        } else {
          // Something else caused an error
          toast.error("An unexpected error occurred.");
        }
      })
      .finally(() => {
        setIsSending(false); // stop loading
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
                  required
                />
                <button
                  type="submit"
                  className="btn-user-submit"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Code"}
                </button>
              </form>
            </div>

            <div className="orsignupas">
              <hr />
              <p>Or Sign up as</p>
              <hr />
            </div>

            <div className="signupdecide w-full flex justify-around gap-4">
              <Link to="/userSignup" className="tosigninpage w-1/2">
                <button className="w-full">User</button>
              </Link>
              <Link to="/businessSignup" className="tosigninpage w-1/2">
                <button className="w-full">Corporate</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
