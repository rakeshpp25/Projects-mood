import React ,{ useState } from "react";
import styles from "../../css/User_view_css/herobar.module.css";
import { SearchIcon } from "../Svgs";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Herobar() {

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
});

const navigate = useNavigate();

const getLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                
                setLocation({ latitude, longitude, error: null });

                // Save to local storage
                localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));

                console.log("New location fetched:", latitude, longitude);

                // Send to backend for formatted address
                sendLocationToServer(latitude, longitude);
            },
            (error) => {
                console.warn("Geolocation error:", error);
                
                const savedLocation = localStorage.getItem("userLocation");
                if (savedLocation) {
                    const { latitude, longitude } = JSON.parse(savedLocation);
                    setLocation({ latitude, longitude, error: "Using last known location" });
                    console.log("Using saved location:", latitude, longitude);
                    sendLocationToServer(latitude, longitude);
                } else {
                    setLocation((prev) => ({
                        ...prev,
                        error: getErrorMessage(error.code)
                    }));
                }
            }
        );
    } else {
        setLocation((prev) => ({
            ...prev,
            error: "Geolocation is not supported by your browser."
        }));
    }
};

const sendLocationToServer = async (latitude, longitude) => {
    try {
        const response = await axios.post("http://localhost:8000/location", { latitude, longitude });

        const formattedAddress = response.data.formattedAddress;
        console.log("Formatted Address:", formattedAddress);

        // Redirect to DesktopBigCard with formatted address as query param
        console.log("hello")
        navigate(`/Nearme?address=${encodeURIComponent(formattedAddress)}`);
        
    } catch (error) {
        console.error("Error sending location:", error);
    }
};

const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 1: return "Permission denied. Please enable location access.";
        case 2: return "Location unavailable. Try again later.";
        case 3: return "Location request timed out.";
        default: return "An unknown error occurred.";
    }
};

  return (
    <>
    
      <div className={styles.herobarOuterDiv}>
        <div className={styles.herobarInsideDiv}>
          <div className={styles.HerobarTitleNdescription}>
            <div className={styles.title}>
            Set Your MOOD, Set Your Success
            </div>
            <div className={styles.description}>
            find best library that suits you and provide best result that fits you    
            </div>
          </div>
          
            <form action="" className={styles.searchBar}>
              <input type="text" placeholder="Search by library, place" />
              <button type="submit">
                <SearchIcon/>
              </button>
              
            </form> 
            <button className={styles.NearMebtn} onClick={getLocation}>Near me</button>
        </div>
      </div>
    </>
  );
}

export default Herobar;
