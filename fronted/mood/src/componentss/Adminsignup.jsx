import React from 'react'
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../css/userlogin.css";

function Adminsignup() {
  return (
    <>
       <div className=" full-user-login-body  ">
        <div className="outer-user-login-div">
          <div className="inner-userlogin-div">
            <h1>Welcome</h1>
            <div className="form-terms">
            <form action="">
              <input type="text" name="" id="" placeholder="Name" />
              <input type="text" name="" id="" placeholder="Comapny" />
                <input type="email" name="" id="" placeholder="Email id" />
                <input
                type="number"
                name=""
                id=""
                max="10"
                placeholder="+91 Mobile"
              />
                <input type="text" name="" id="" placeholder="City" />
            </form>
            <div className="terms">
              <FontAwesomeIcon icon={faCheckSquare} className="login-checkbox-icon" />
              <p>
                By logging in, you agree to our Privacy policy and Terms &
                Conditions.
              </p>
            </div>
            </div>
            <button type="submit" className="btn-user-submit">
              Register Now
            </button>
            <div className="haveaccount">
              <p>Have an account ?</p>
              <Link to={"/login"} className="tosigninpage">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adminsignup
