import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../css/userlogin.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Usersignup() {
  // using navigate to navigate from one react component to another
  const navigate = useNavigate();

  // Taking the details of the users
  const [inputData, setInputData] = useState({});
  const handleinput = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { username, useremail, mobile_no } = inputData;

    if (!username || !useremail || !mobile_no) {
      toast.error("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(useremail)) {
      toast.error("Enter a valid email address."); // to check valid email address
      return;
    }

    const mobileRegex = /^\d{10}$/; // Matches exactly 10 digits
    if (!mobileRegex.test(mobile_no)) {
      toast.error("Mobile number must be a 10-digit number.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/usersignup",
        {
          ...inputData,
          role: "user", 
        }
      );

      // Success response
      toast.success("Otp has been send to: " + response.data.email);
      if (response.data) {
        navigate("/emailverify", { state: { email: useremail, role: "user", purpose: "signup" } });

      }
    }
     catch (error) {
      // Handling errors if request fails

      if (error.response) {
        // Server responded with an error (e.g., 400 or 500 status code)
        toast.error("Error: " + error.response.data);
      } 
      else if (error.request) {
        // No response from server (e.g., network issues , can't connect to server)
        toast.error("No response from server.");
      } 
      else {
        // Some other error occurred (e.g., bad request or configuration issues)
        toast.error("Something went wrong: " + error.message);
      }
    }
  };

  return (
    <>
      <div className=" full-user-login-body  ">
        <div className="outer-user-login-div">
          <div className="inner-userlogin-div">
            <h1>Welcome</h1>
            <div className="form-terms">
              <form onSubmit={handlesubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Name"
                  pattern="[A-Za-z ]+"
                  title="Name must only contain alphabetic characters and spaces"
                  onChange={handleinput}
                />
                <input
                  type="email"
                  name="useremail"
                  placeholder="Email id"
                  onChange={handleinput}
                />
                <input
                  type="number"
                  name="mobile_no"
                  placeholder="Mobile"
                  onChange={handleinput}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={handleinput}
                />

                <div className="terms">
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    className="login-checkbox-icon"
                  />
                  <p>
                    By logging in, you agree to our Privacy policy and Terms &
                    Conditions.
                  </p>
                </div>
                <button type="submit" className="btn-user-submit">
                  Register Now
                </button>
              </form>
            </div>

            <div className="haveaccount">
              <p>Have an account ?</p>
              <Link to={"/login"} className="tosigninpage">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usersignup;
