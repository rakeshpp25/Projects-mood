import React, { useEffect, useState } from "react";
import styles from "../../css/Business_Dashboard_Css/profile.module.css";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Address() {
  const [userData, setUserData] = useState({
    building_name: "",
    area_name: "",
    pin_code: "",
    city: "",
    state: "",
    landmark: "",
    location: "",
  });

  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});
  const [locationInfo, setLocationInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      const fetchAddress = async () => {
        try {
          const res = await axios.get("http://localhost:8000/address", {
            withCredentials: true,
          });
    
          console.log("Fetched address from backend:", res.data);
    
          if (res.data && Object.keys(res.data).length > 0) {
            setUserData((prev) => ({
              ...prev,
              ...res.data,
            }));
            setOriginalData(res.data);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          if (error.response?.status !== 404) {
            toast.error("Something went wrong while fetching address");
          }
        }
      };
    
      fetchAddress();
    }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(originalData);
      setUpdatedFields({});
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If city, state, or pin_code is manually edited, don't overwrite them with fetched data
    if (name === "pin_code" || name === "city" || name === "state") {
      setUpdatedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setUpdatedFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocationInfo({ latitude, longitude, error: null });
          localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));

          console.log("New location fetched:", latitude, longitude);

          sendLocationToServer(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          const savedLocation = localStorage.getItem("userLocation");

          if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation);
            setLocationInfo({ latitude, longitude, error: "Using last known location" });
            console.log("Using saved location:", latitude, longitude);
            sendLocationToServer(latitude, longitude);
          } else {
            setLocationInfo((prev) => ({
              ...prev,
              error: getErrorMessage(error.code),
            }));
          }
        }
      );
    } else {
      setLocationInfo((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
      }));
    }
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      console.log("Sending location to server:", { latitude, longitude });

      const response = await axios.post("http://localhost:8000/location", {
        latitude,
        longitude,
      });

      const { formattedAddress, city, state, postalCode } = response.data;
      console.log("Location response data:", response.data);

      setUserData((prev) => ({
        ...prev,
        location: formattedAddress,
        city: city || prev.city, // Don't overwrite if manually entered
        state: state || prev.state, // Don't overwrite if manually entered
        pin_code: postalCode || prev.pin_code, // Don't overwrite if manually entered
      }));

      setUpdatedFields((prev) => ({
        ...prev,
        location: formattedAddress,
        city: city || prev.city,
        state: state || prev.state,
        pin_code: postalCode || prev.pin_code,
        coordinates: {
          type: "Point", // This is required
          coordinates: [longitude, latitude], // Array [longitude, latitude]
        },
      }));

      toast.success("Location fetched successfully");
    } catch (error) {
      console.error("Error sending location:", error);
      toast.error("Failed to fetch formatted address");
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 1:
        return "Permission denied. Please enable location access.";
      case 2:
        return "Location unavailable. Try again later.";
      case 3:
        return "Location request timed out.";
      default:
        return "An unknown error occurred.";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:8000/address", updatedFields, {
        withCredentials: true,
      });

      toast.success("Address updated successfully");
      setOriginalData(res.data); // Update original data with response from server
      setIsEditing(false);
      setUpdatedFields({}); // Clear updated fields
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Failed to update address");
    }
  };

  return (
    <form className={styles.FullProfileSection} onSubmit={handleSave}>
      <div className={styles.titleNedit}>
        <span>Address</span>
        <EditButton isEditing={isEditing} onClick={handleEditToggle} />
      </div>

      <div className={styles.AltmobileNumber}>
        <span>Location</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className={styles.InputBox}
            type="text"
            name="location"
            value={userData.location}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              type="button"
              style={{
                padding: "8px 12px",
                background: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={getLocation}
            >
              Fetch
            </button>
          )}
        </div>
      </div>

      <div className={styles.Name}>
        <span>Building Name</span>
        <input
          className={styles.InputBox}
          type="text"
          name="building_name"
          value={userData.building_name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.EmailAddress}>
        <span>Area Name</span>
        <input
          className={styles.InputBox}
          type="text"
          name="area_name"
          value={userData.area_name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.AadharNumber}>
        <span>Pin Code</span>
        <input
          className={styles.InputBox}
          type="text"
          name="pin_code"
          value={userData.pin_code}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.mobileNumber}>
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

      <div className={styles.AltmobileNumber}>
        <span>State</span>
        <input
          className={styles.InputBox}
          type="text"
          name="state"
          value={userData.state}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className={styles.AltmobileNumber}>
        <span>Landmark</span>
        <input
          className={styles.InputBox}
          type="text"
          name="landmark"
          value={userData.landmark}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      

      {isEditing && <SaveButton />}
    </form>
  );
}

export default Address;
