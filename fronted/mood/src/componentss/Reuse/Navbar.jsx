import React, { useState, useEffect, useRef } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const res = await axios.get("http://localhost:8000/Profile", {
            withCredentials: true,
          });
          const fullName = res.data.name;
          const firstName = fullName.split(" ")[0];
          setFirstName(firstName);
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
      await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleProfileClick = () => {
    if (user?.role === "business") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setIsDropdownHover(false);
    setIsSidebarOpen(false);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  const scrollToAbout = () => {
    const contactSection = document.getElementById("footer");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsSidebarOpen(false);
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoDiv}>
        <Link to="/">
          <img className={styles.logoInside} src={logo} alt="logo" />
        </Link>
      </div>

      <div className={styles.middleNav}>
        <button onClick={scrollToContact}>Contact</button>
        <button onClick={scrollToAbout}>About</button>
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
            <span className={styles.accountIcon}><AccountIcon /></span>
            <span className={styles.AccountTitle}>{firstName || "Account"}</span>
            <span className={styles.downArrow}><DownArrow /></span>
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

      {/* Hamburger for mobile */}
      <div className={styles.hamburger} onClick={() => setIsSidebarOpen(true)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <div className={styles.sidebar} ref={sidebarRef}>
          {/* Cross Icon */}
          <div className={styles.closeSidebar} onClick={() => setIsSidebarOpen(false)}>
            &#10005; {/* Unicode for cross icon */}
          </div>

          <button onClick={scrollToContact}>Contact</button>
          <button onClick={scrollToAbout}>About</button>
          {!isAuthenticated && (
            <button onClick={handleLogin}>Login / Signup</button>
          )}
          {isAuthenticated && (
            <>
              <button onClick={handleProfileClick}>My Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
