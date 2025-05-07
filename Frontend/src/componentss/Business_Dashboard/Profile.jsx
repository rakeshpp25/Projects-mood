import React, { useEffect, useState } from "react";
import styles from "../../css/Business_Dashboard_Css/profile.module.css";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Reuse/Loader";

// Verhoeff algorithm for Aadhar validation
function validateAadhar(aadhar) {
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];
  let c = 0;
  const reversed = aadhar.split("").reverse().map(Number);
  for (let i = 0; i < reversed.length; i++) {
    c = d[c][p[i % 8][reversed[i]]];
  }
  return c === 0;
}

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getUserProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8000/dashboard/profile", {
          withCredentials: true,
        });
        setUserData(res.data);
        setOriginalData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data", err.response || err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(originalData);
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { mobile_no, aadharNumber } = updatedFields;

    const mobileRegex = /^\d{10}$/;

    if (mobile_no && !mobileRegex.test(mobile_no)) {
      toast.error("Mobile number must be a 10-digit number.");
      return;
    }

    if (aadharNumber && !validateAadhar(aadharNumber)) {
      toast.error("Invalid Aadhar number.");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:8000/dashboard/profile",
        updatedFields,
        { withCredentials: true }
      );
      setUserData(res.data);
      setOriginalData(res.data);
      setUpdatedFields({});
      setIsEditing(false);
      toast.success("Data saved successfully");
    } catch (err) {
      toast.error("Something went wrong while saving your profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits for these fields
    const numericFields = ["mobile_no", "altMobileNumber", "aadharNumber"];
    if (numericFields.includes(name) && !/^\d*$/.test(value)) {
      return;
    }

    // Disallow digits in these fields
    const noDigitFields = ["name", "city"];
    if (noDigitFields.includes(name) && /\d/.test(value)) {
      return;
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setUpdatedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {/* Full-page loader */}
      {loading && <Loader />}

      {/* Profile form */}
      {!loading && userData && (
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
              value={userData?.name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.gender}>
            <span>Your Gender</span>
            <div className={styles.genderSelect}>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userData?.gender === "Male"}
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
                  checked={userData?.gender === "Female"}
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
              value={userData?.email_address || ""}
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
              value={userData?.aadharNumber || ""}
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
              value={userData?.mobile_no || ""}
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
              value={userData?.altMobileNumber || ""}
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
              value={userData?.city || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {isEditing && <SaveButton />}
        </form>
      )}
    </>
  );
}

export default Profile;
