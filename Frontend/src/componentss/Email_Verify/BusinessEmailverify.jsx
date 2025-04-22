import { Link } from "react-router-dom";
import styles from  "../css/emailverify.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { useLocation } from "react-router-dom";



function BusinessEmailVerify() {
  const navigate = useNavigate()
  const { state } = useLocation(); // Retrieve the state object
  const email = state?.email;

  const [emailCode, setEmailCode] = useState(Array(6).fill(""));
 
  const handleInputChange = (index, e) => {
    const value = e.target.value.slice(0, 1); // Limit input to one character
    const newEmailCode = [...emailCode];
    newEmailCode[index] = value;
    setEmailCode(newEmailCode);

    if (value && index < 5) {
      // Move to the next input if a character is entered
      document.getElementById(`input-${index + 1}`).focus();
    } else if (!value && e.nativeEvent.inputType === "deleteContentBackward" && index > 0) {
      // Move back to the previous input if Backspace is pressed
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const verificationCode = emailCode.join("");

    // Validation: Ensure all inputs are filled
    if (emailCode.includes(" ")) {
     toast.error("Please fill all 6 digits before submitting.");
      return;
    }

    axios
    .post("http://localhost:8000/BusinessEmailVerify", { verificationCode, email })
    .then((res) => {
       toast.success("Successfully verified");
      if (res.data) {
        navigate("/home");
      }
    })
      .catch((error) => {
        console.log("Error sending data", error);
        if (error.response) {
          // The server responded with a status other than 2xx
          toast.error(`Error: ${error.response.data || 'Failed to submit the verification code'}`);
        } else if (error.request) {
          // The request was made, but no response was received
          toast.error('No response from the server. Please check your internet connection.');
        } else {
          // Something else happened while setting up the request
          toast.error('An unexpected error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className={styles.fullUserLoginBody}>
      <div className={styles.outerUserLoginDiv}>
        <div className={styles.innerUserLoginDiv}>
          <h1>Login / Signup</h1>
          <p>Please enter your email address to continue</p>
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
                  />
                ))}
              </div>

              <button type="submit" className={styles.btnUserSubmit} disabled={emailCode.includes("")}>
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

export default BusinessEmailVerify;