import React, { useState , useEffect} from "react";
import logo from "../../images/MOOD.png";
import styles from "../../css/Reuse_css/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AccountIcon, DownArrow, LogoutIcon } from "../Svgs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authenticatedSlice";
import axios from "axios";

function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [firstName, setFirstName] = useState("");

// Fetch user profile data from backend on component mount
useEffect(() => {
  const fetchUserData = async () => {
    if (isAuthenticated) {
      try {
        const res = await axios.get("http://localhost:8000/Profile", {
          withCredentials: true,
        });
        const fullName = res.data.name;
        const firstName = fullName.split(" ")[0]; // Extract the first name
        setFirstName(firstName); // Update the state with the first name
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    }
  };

  fetchUserData();
}, [isAuthenticated]);


  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout", {}, {
        withCredentials: true,
      });

      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleProfileClick = () => {
    if (user?.role === "business") {
      navigate("/dashboard");
    }  else {
      navigate("/");
    }
    setIsDropdownHover(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navbar} w-full`}>
      <div className={styles.logoDiv}>
        <Link to = {'/'}><img className={styles.logoInside} src={logo} alt="logo" /></Link>
      </div>

      <div className={styles.middleNav}>
        <button onClick={scrollToContact}>Contact</button>
        <Link to={"/"}>About</Link>
      </div>

      {!isAuthenticated && (
        <button className={styles.login} onClick={handleLogin}>
          Login / Signup
        </button>
      )}

      {isAuthenticated && (
        <div
          className={styles.AccountbtnNdropdown}
          onMouseLeave={() => setIsDropdownHover(false)}
        >
          <button
            className={styles.Accountbtn}
            onMouseEnter={() => setIsDropdownHover(true)}
          >
            <span className={styles.accountIcon}>
              <AccountIcon />
            </span>
            <span className={styles.AccountTitle}>
            {firstName || "Account"}
            </span>
            <span className={styles.downArrow}>
              <DownArrow className={styles.downArrow} />
            </span>
          </button>

          {isDropdownHover && (
            <div className={styles.dropdown}>
              <button className={styles.MyProfilebtn} onClick={handleProfileClick}>
                <AccountIcon />
                <span>My Profile</span>
              </button>

              <button className={styles.logoutbtn} onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
