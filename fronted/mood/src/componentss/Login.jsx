import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link,useNavigate } from "react-router-dom";
// import "../css/userlogin.css";
import React, { useState } from "react";
import axios from 'axios'


function Login() {
const navigate = useNavigate()
      const [inputEmail , setInputEmail] = useState({});
      const handleEmail = (e) =>{
       setInputEmail({
        ...inputEmail,
       [e.target.name] : e.target.value
       })
       console.log(inputEmail)
      }

      const handlesubmit = (e) =>{
            e.preventDefault();
            axios.post("http://localhost:8000/login", inputEmail)
            .then((res) =>{
              console.log("baby u did it data send" ,res.data)
              if(res.data){
                navigate("/emailverify", { state: { email: inputEmail } });
              }
              
            })
            .catch((error) =>{
              console.log("ops baby data not send" ,error)
            })
 
            }
  return (
    <>
        <div className=" full-user-login-body  ">
        <div className="outer-user-login-div">
          <div className="inner-userlogin-div">
            <h1>Login / Signup</h1>
            <p>Please enter your email address to continue </p>
            <div className="form-terms">
              <form onSubmit={handlesubmit}>
            
                <input type="email" name="useremail"  placeholder="Email id" 
                onChange={handleEmail}/>
            
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
  )
}

export default Login
