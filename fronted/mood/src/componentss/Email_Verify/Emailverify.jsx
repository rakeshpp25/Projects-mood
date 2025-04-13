import { Link } from "react-router-dom";
import styles from "../../css/Email_Verify_css/emailverify.module.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setAuth } from "../../Redux/authenticatedSlice";

function Emailverify() {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "";
  const role = state?.role || "";
  const purpose = state?.purpose || "";

  const [emailCode, setEmailCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleInputChange = (index, e) => {
    const value = e.target.value.replace(/\s/g, "").slice(0, 1).toUpperCase();
    const newCode = [...emailCode];
    newCode[index] = value;
    setEmailCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !emailCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const verificationCode = emailCode.join("");

    if (emailCode.includes("")) {
      toast.error("Please fill all 6 digits before submitting.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/emailverify", {
        verificationCode,
        email,
        role,
        purpose,
      });
      if (res.data && res.data.user) {
        dispatch(setAuth(res.data.user)); // set authenticated and store user
        toast.success("Successfully verified");
        navigate("/");
      }
    } catch (error) {
      console.error("Verification error:", error);
      if (error.response) {
        // ✅ Fix: show actual message
        toast.error(`Error: ${error.response?.data?.message || 'Verification failed.'}`);
      } else if (error.request) {
        toast.error("No server response. Check your internet connection.");
      } else {
        toast.error("Unexpected error. Try again later.");
      }
    }
  };

  return (
    <div className={styles.fullUserLoginBody}>
      <div className={styles.outerUserLoginDiv}>
        <div className={styles.innerUserLoginDiv}>
          <h1>Login / Signup</h1>
          <p>Please enter the OTP sent to your email to verify</p>
          <div className={styles.formTerms}>
            <form onSubmit={handlesubmit}>
              <div className={styles.formInput}>
                {emailCode.map((_, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={emailCode[index]}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <button
                type="submit"
                className={styles.btnUserSubmit}
                disabled={emailCode.includes("")}
              >
                Verify
              </button>
            </form>
          </div>
          <div className={styles.haveAccount}>
            <p>Didn't receive an email?</p>
            <Link to={"/verifyemail"} className={styles.toSignInPage}>
              Resend
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emailverify;
