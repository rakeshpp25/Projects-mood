import React, { useEffect, useState } from "react";
import styles from "../../css/Business_Dashboard_Css/profile.module.css";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({}); // Track changed fields
  const [originalData, setOriginalData] = useState(null); // Store original data

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Profile", {
          withCredentials: true,
        });
        setUserData(res.data);
        setOriginalData(res.data); // Set the original data
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data", err.response || err);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // If we're cancelling the edit, revert to the original data
      setUserData(originalData);
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { username, useremail, mobile_no, aadharNumber } = updatedFields;

    const mobileRegex = /^\d{10}$/; // Matches exactly 10 digits

    // Check if mobile number is updated and validate only when updated
    if (mobile_no && !mobileRegex.test(mobile_no)) {
      toast.error("Mobile number must be a 10-digit number.");
      return;
    }

    // Send only updated fields
    try {
      const res = await axios.put(
        "http://localhost:8000/Profile",
        updatedFields, // Send only updated data
        { withCredentials: true }
      );
      setUserData(res.data); // updated data from backend
      setOriginalData(res.data); // Update original data after save
      setUpdatedFields({}); // Reset updated fields
      setIsEditing(false);
      toast.success("Data saved successfully");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Something went wrong while saving your profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Track changed fields
    setUpdatedFields((prevUpdatedFields) => ({
      ...prevUpdatedFields,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading profile...</div>;
  if (!userData) return <div>Failed to load profile.</div>;

  return (
    <form className={styles.FullProfileSection} onSubmit={handleSave}>
      <div className={styles.titleNedit}>
        <span>Personal Information Details</span>
        <EditButton isEditing={isEditing} onClick={handleEditToggle} />
      </div>

      <div className={styles.Name}>
        <span>Name</span>
        <input
          className={styles.InputBox}
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.gender}>
        <span>Your Gender</span>
        <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={userData.gender === "Male"}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={userData.gender === "Female"}
            onChange={handleChange}
            disabled={!isEditing}
          />
          Female
        </label>
        </div>
      </div>

      <div className={styles.EmailAddress}>
        <span>Email Address</span>
        <input
          className={styles.InputBox}
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className={styles.AadharNumber}>
        <span>Aadhar Number</span>
        <input
          className={styles.InputBox}
          type="text"
          name="aadharNumber"
          value={userData.aadharNumber}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.mobileNumber}>
        <span>Mobile Number</span>
        <input
          className={styles.InputBox}
          type="text"
          name="mobile_no"
          value={userData.mobile_no}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.AltmobileNumber}>
        <span>Alternate Mobile Number</span>
        <input
          className={styles.InputBox}
          type="text"
          name="altMobileNumber"
          value={userData.altMobileNumber}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.AltmobileNumber}>
        <span>City</span>
        <input
          className={styles.InputBox}
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {isEditing && <SaveButton onClick={handleSave} />}
    </form>
  );
}

export default Profile;
