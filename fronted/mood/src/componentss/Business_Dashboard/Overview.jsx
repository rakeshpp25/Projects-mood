import React, { useState, useEffect } from "react";
import axios from "axios";
import Time from "./Time";
import styles from "../../css/Business_Dashboard_Css/overview.module.css";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";

function Overview() {
  const [days, setDays] = useState([
    { day: "Monday", status: "", customTime: "", showOptions: false },
    { day: "Tuesday", status: "", customTime: "", showOptions: false },
    { day: "Wednesday", status: "", customTime: "", showOptions: false },
    { day: "Thursday", status: "", customTime: "", showOptions: false },
    { day: "Friday", status: "", customTime: "", showOptions: false },
    { day: "Saturday", status: "", customTime: "", showOptions: false },
    { day: "Sunday", status: "", customTime: "", showOptions: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    Library_name: "",
    time: "", // Time will be handled in the 'days' state
    special_features: "",
    about_library: "",
  });

  const [originalUserData, setOriginalUserData] = useState({});
  const [originalDays, setOriginalDays] = useState([]);

  const [predefinedAmenities] = useState(["WiFi", "AC", "Power Backup"]);
  const [dynamicAmenities, setDynamicAmenities] = useState([]);
  const [specialFeatures, setSpecialFeatures] = useState([]);

  // Fetch overview data from backend
  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get("http://localhost:8000/overview");
        const {
          Library_name,
          time,
          special_features,
          about_library,
          amenities = [],
        } = res.data;

        setUserData({ Library_name, time, special_features, about_library });
        setOriginalUserData({
          Library_name,
          time,
          special_features,
          about_library,
        }); // Save the original data
        setDays(time); // Set the time (days) state from fetched data
        setOriginalDays(time); // Save the original time data

        const dynamic = amenities.filter(
          (a) => !predefinedAmenities.includes(a)
        );
        setDynamicAmenities(dynamic);
      } catch (err) {
        console.error("Error fetching overview:", err);
      }
    };

    fetchOverview();
  }, [predefinedAmenities]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset the state to original data when exiting the edit mode
      setUserData(originalUserData);
      setDays(originalDays);
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...userData,
      amenities: [...predefinedAmenities, ...dynamicAmenities],
      time: days, // Pass the days (time) data here
    };

    try {
      const res = await axios.put("http://localhost:8000/overview", payload);
      console.log("✅ Overview saved:", res.data);
      setIsEditing(false);
      // Optionally reset the original data after saving
      setOriginalUserData(userData);
      setOriginalDays(days);
    } catch (err) {
      console.error("Error saving overview:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityChange = (index, value) => {
    const updated = [...dynamicAmenities];
    updated[index] = value;
    setDynamicAmenities(updated);
  };

  const handleAddAmenity = () => {
    setDynamicAmenities((prev) => [...prev, ""]);
  };

  const handleRemoveAmenity = (index) => {
    setDynamicAmenities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSpecialFeature = () => {
    if (isEditing) {
      setSpecialFeatures((prev) => [...prev, ""]);
    }
  };

  const handleSpecialFeatureChange = (index, value) => {
    const updated = [...specialFeatures];
    updated[index] = value;
    setSpecialFeatures(updated);
  };

  const handleRemoveSpecialFeature = (index) => {
    const updated = [...specialFeatures];
    updated.splice(index, 1);
    setSpecialFeatures(updated);
  };

  return (
    <form className={styles.FullOverviewSection} onSubmit={handleSave}>
      <div className={styles.titleNedit}>
        <span>Overview Details</span>
        <EditButton isEditing={isEditing} onClick={handleEditToggle} />
      </div>

      <div className={styles.BusinessName}>
        <span>Business Name</span>
        <input
          className={styles.InputBox}
          type="text"
          name="Library_name"
          value={userData.Library_name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {/* Time Section - passed to Time component */}
      <Time days={days} setDays={setDays} isEditing={isEditing} />

      <div className={styles.Amenities}>
        <span>Amenities</span>

        {/* Predefined Amenities */}
        {predefinedAmenities.map((amenity, index) => (
          <div key={`pre-${index}`} className={styles.AmenityItemWrapper}>
            <div className={styles.InputWithIcons}>
              {/* Create a div that looks like an input */}
              <div className={styles.InputDivWrapper}>
                {/* Show the WiFi icon only if the amenity is WiFi */}
                {amenity === "WiFi" && <FaWifi className={styles.WifiIcon} />}
                <input
                  className={styles.AmenitiesInputBox}
                  type="text"
                  value={amenity}
                  disabled
                />
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Amenities */}
        {dynamicAmenities.map((amenity, index) => (
          <div key={`dyn-${index}`} className={styles.DynamicAmenityWrapper}>
            <div className={styles.InputWithIcons}>
              {/* Styled div that looks like an input */}
              <div className={styles.InputDivWrapper}>
                <FaCheck className={styles.CheckIcon} />
                {amenity.toLowerCase() === "wifi" && (
                  <FaWifi className={styles.AmenitiesIcon} />
                )}
                {amenity.toLowerCase() === "ac" && (
                  <FaFan className={styles.AmenitiesIcon} />
                )}
                {amenity.toLowerCase() === "water" && (
                  <FaTint className={styles.AmenitiesIcon} />
                )}

                <input
                  className={styles.AmenitiesInputBox}
                  type="text"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <FaTimes
                className={`${styles.RemoveIcon} ${
                  !isEditing ? styles.disabledIcon : ""
                }`}
                onClick={() => isEditing && handleRemoveAmenity(index)}
              />
            </div>
          </div>
        ))}

        {/* "Add More" Button */}
        <button
          type="button"
          onClick={isEditing ? handleAddAmenity : null} // Only add more if editing is enabled
          className={`${styles.AddMoreButton} ${
            !isEditing ? styles.disabledButton : ""
          }`}
        >
          Add More
        </button>
      </div>

      <div className={styles.SpecialFeatures}>
        <span>Special Features</span>

        {specialFeatures.map((feature, index) => (
          <div key={index} className={styles.DynamicInputWrapper}>
            <input
              className={styles.DynamicAmenitiesInputBox}
              type="text"
              value={feature}
              onChange={(e) =>
                handleSpecialFeatureChange(index, e.target.value)
              }
              disabled={!isEditing}
            />
            <span
              className={styles.RemoveIcon}
              onClick={() => isEditing && handleRemoveSpecialFeature(index)}
            >
              ✖
            </span>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSpecialFeature}
          className={`${styles.AddMoreButton} ${
            !isEditing ? styles.disabledButton : ""
          }`}
        >
          Add More
        </button>
      </div>

      <div className={styles.AboutLibrary}>
        <span>About the Library</span>
        <textarea
          className={styles.AboutLibraryInputBox}
          name="about_library"
          value={userData.about_library}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {isEditing && <SaveButton onClick={handleSave} />}
    </form>
  );
}

export default Overview;
