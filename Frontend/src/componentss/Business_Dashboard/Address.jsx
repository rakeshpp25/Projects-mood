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

  // Fetch user data (address and city) on component mount
  useEffect(() => {
    const fetchAddressAndCity = async () => {
      try {
        let addressData = {};

        // Fetch address data
        try {
          const addressRes = await axios.get(
            "https://projects-mood-backend-yugw.onrender.com/dashboard/address",
            {
              withCredentials: true,
            }
          );
          console.log("Fetched address from backend:", addressRes.data);
          addressData = addressRes.data || {};
        } catch (addressError) {
          if (addressError.response?.status === 404) {
            console.warn("No address found, skipping...");
          } else {
            throw addressError;
          }
        }

        // Fetch profile data (city)
        const profileRes = await axios.get(
          "https://projects-mood-backend-yugw.onrender.com/dashboard/profile",
          {
            withCredentials: true,
          }
        );
        console.log("Fetched city from profile:", profileRes.data);

        const profileData = profileRes.data || {};

        // Combine address and city data
        const combinedData = {
          ...addressData,
          city: profileData.city || "",
        };

        // Set userData and originalData states
        setUserData((prev) => ({
          ...prev,
          ...combinedData,
        }));

        setOriginalData(combinedData);
      } catch (error) {
        console.error("Error fetching address or city:", error);
        toast.error("Something went wrong while fetching address or city");
      }
    };

    fetchAddressAndCity();
  }, []);

  // Toggle edit mode
  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(originalData);
      setUpdatedFields({});
    }
    setIsEditing((prev) => !prev);
  };

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setUpdatedFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch and set geolocation
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationInfo({ latitude, longitude, error: null });
          localStorage.setItem(
            "userLocation",
            JSON.stringify({ latitude, longitude })
          );

          console.log("New location fetched:", latitude, longitude);

          sendLocationToServer(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation error:", error);
          const savedLocation = localStorage.getItem("userLocation");

          if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation);
            setLocationInfo({
              latitude,
              longitude,
              error: "Using last known location",
            });
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

  // Send location info to the backend
  const sendLocationToServer = async (latitude, longitude) => {
    try {
      console.log("Sending location to server:", { latitude, longitude });

      const response = await axios.post(
        "https://projects-mood-backend-yugw.onrender.com/dashboard/location",
        {
          latitude,
          longitude,
        }
      );

      const { formattedAddress, city, state, postalCode } = response.data;
      console.log("Location response data:", response.data);

      setUserData((prev) => ({
        ...prev,
        location: formattedAddress,
        city: city || prev.city,
        state: state || prev.state,
        pin_code: postalCode || prev.pin_code,
      }));

      setUpdatedFields((prev) => ({
        ...prev,
        location: formattedAddress,
        city: city || prev.city,
        state: state || prev.state,
        pin_code: postalCode || prev.pin_code,
        coordinates: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      }));

      toast.success("Location fetched successfully");
    } catch (error) {
      console.error("Error sending location:", error);
      toast.error("Failed to fetch formatted address");
    }
  };

  // Get error message for geolocation error codes
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

  // Handle save button click
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !updatedFields.pin_code ||
      !updatedFields.area_name ||
      !updatedFields.location
    ) {
      toast.error("Pin Code, Area Name, and Location are required.");
      return;
    }

    try {
      await Promise.all([
        axios.put(
          "https://projects-mood-backend-yugw.onrender.com/dashboard/profile",
          { city: updatedFields.city },
          { withCredentials: true }
        ),
        axios.put(
          "https://projects-mood-backend-yugw.onrender.com/dashboard/address",
          {
            building_name: updatedFields.building_name,
            landmark: updatedFields.landmark,
            pin_code: updatedFields.pin_code,
            state: updatedFields.state,
            location: updatedFields.location,
            area_name: updatedFields.area_name,
            coordinates: updatedFields.coordinates,
          },
          { withCredentials: true }
        ),
      ]);

      toast.success("Profile and address updated successfully");

      // ✅ After successful save, exit edit mode
      setIsEditing(false);
      setUpdatedFields({});
      setOriginalData(userData); // optional but good: reset originalData
    } catch (error) {
      console.error("Error updating profile/address:", error);
      toast.error("Failed to update profile or address");
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
            disabled
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
