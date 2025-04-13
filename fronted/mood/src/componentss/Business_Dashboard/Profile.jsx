import React, { useEffect, useState } from "react";
import styles from "../../css/Business_Dashboard_Css/profile.module.css";
import EditButton from "../Reuse/EditButton";
import axios from "axios";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/profile", {
          withCredentials: true, // if you're using httpOnly cookies
        });

        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (!userData) return <div>Failed to load profile.</div>;

  return (
    <div className={styles.FullProfileSection}>
      <div className={styles.titleNedit}>
        <span>Personal Information Details</span>
        <EditButton />
      </div>

      <div className={styles.firstName}>
        <span>First Name</span>
        <input className={styles.InputBox} type="text" value={userData.name} disabled />
      </div>

      <div className={styles.gender}>
        <span>Your Gender</span>
        <p className={styles.male}>
          <input type="checkbox" checked={userData.gender === "Male"} disabled />
          <span>Male</span>
        </p>
        <p className={styles.Female}>
          <input type="checkbox" checked={userData.gender === "Female"} disabled />
          <span>Female</span>
        </p>
      </div>

      <div className={styles.EmailAddress}>
        <span>Email Address</span>
        <input className={styles.InputBox} type="text" value={userData.email} disabled />
      </div>

      <div className={styles.AadharNumber}>
        <span>Aadhar Number</span>
        <input className={styles.InputBox} type="text" value={userData.aadhar} disabled />
      </div>

      <div className={styles.mobileNumber}>
        <span>Mobile Number</span>
        <input className={styles.InputBox} type="text" value={userData.mobile_no} disabled />
      </div>

      <div className={styles.AltmobileNumber}>
        <span>Alternate Mobile Number</span>
        <input className={styles.InputBox} type="text" value={userData.altMobile} disabled />
      </div>
    </div>
  );
}

export default Profile;
