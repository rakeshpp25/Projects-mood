import React, { useState } from "react";
import styles from "../../css/User_view_css/herobar.module.css";
import { SearchIcon } from "../Svgs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Herobar() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const navigate = useNavigate();

  const getLocation = (e) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocation({ latitude, longitude, error: null });
          console.log("New location fetched:", latitude, longitude);
          fetchNearbyLibraries(latitude, longitude); // Fetch and store city + navigate
        },
        (error) => {
          console.warn("Geolocation error:", error);

          const savedLocation = localStorage.getItem("userLocation");
          if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation);
            setLocation({
              latitude,
              longitude,
              error: "Using last known location",
            });
            console.log("Using saved location:", latitude, longitude);
            fetchNearbyLibraries(latitude, longitude);
          } else {
            setLocation((prev) => ({
              ...prev,
              error: getErrorMessage(error.code),
            }));
          }
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
      }));
    }
  };

  const fetchNearbyLibraries = async (latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:8000/location", {
        latitude,
        longitude,
      });

      const formattedAddress = response.data.formattedAddress;
      console.log("Formatted Address:", formattedAddress);

      const city = extractCity(formattedAddress);
      console.log("Extracted City:", city);

      // Store lat, lon and city
      localStorage.setItem(
        "userLocation",
        JSON.stringify({ latitude, longitude, city })
      );

      // Navigate to Nearme page
      navigate(`/Nearme?address=${encodeURIComponent(formattedAddress)}`);
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  const extractCity = (address) => {
    if (!address) return null;

    const parts = address.split(",");
    // Adjust this depending on your formattedAddress structure
    const city = parts.length >= 3 ? parts[parts.length - 3].trim() : null;
    return city;
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

  return (
    <div className={styles.herobarOuterDiv}>
      <div className={styles.herobarInsideDiv}>
        <div className={styles.HerobarTitleNdescription}>
          <div className={styles.title}>
            Set Your<span> MOOD </span>Set Your Success
          </div>
          <div className={styles.description}>
            Find the best library that suits you and provides the best results
            that fit you
          </div>
        </div>

        <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.search}>
            <input type="text" placeholder="Search by library, place" />
            <button className={styles.searchIcon} type="submit">
              <SearchIcon />
            </button>
          </div>
          <button type="button" className={styles.nearme} onClick={getLocation}>
            Near me
          </button>
        </form>
      </div>
    </div>
  );
}

export default Herobar;
