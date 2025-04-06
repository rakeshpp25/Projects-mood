import React, { useState } from "react";
import logo from "../images/MOOD.png";
import styles from "../css/navbar.module.css";
import { Link,  useNavigate } from "react-router-dom";
import { AccountIcon, DownArrow, LogoutIcon } from "./Svgs";
function Navbar() {
  const [IsAuthenticated, setIsAuthenticated] = useState(false);
  const [IsDropdownHover , setIsDropdownHover] = useState(false);
  const navigate = useNavigate();

  const HandleLogin = () =>{
navigate('/login')
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <nav className={`${styles.navbar} w-full`}>
        <div className={styles.logoDiv}>
          <img className={styles.logoInside} src={logo} alt="logo" />
        </div>
        <div className={styles.middleNav}>
        <button onClick={scrollToContact} >
          Contact
        </button>
          <Link to={"/"}>About</Link>
        </div>
       
         {
          (!IsAuthenticated) && (
            <button className={styles.login}
            onClick={HandleLogin}>Login / Signup</button>
          )
         }
       
       { IsAuthenticated && (<div className={styles.AccountbtnNdropdown}
       onMouseLeave={() => setIsDropdownHover(false)}>
            <button className={styles.Accountbtn} onMouseEnter={() => setIsDropdownHover(true)}>
            <span className={styles.accountIcon}>
              <AccountIcon />
            </span>
            <span className={styles.AccountTitle}>Account</span>
            <span className={styles.downArrow}>
              <DownArrow className={styles.downArrow} />
            </span>
          </button>
         {
          IsDropdownHover && (
            <div className={`${styles.dropdown} `} >
<button className={styles.MyProfilebtn} >
<AccountIcon/>
<span>
  My Profile
</span>
</button>

<button className={styles.logoutbtn}>
<LogoutIcon/>
<span>
  Logout
</span>
</button>
         </div>
          )
         }
       </div>)}
      </nav>
    </>
  );
}

export default Navbar;
