import React, { useState } from "react";
import styles from "../../css/Full_Library_Details_css/ShowAmenities.module.css";
import { WaterIcon, WifiIcon ,ACIcon } from "../Svgs";

function ShowAmenities() {
  const [amenities, setamenities] = useState([
    {
      icon: <WifiIcon />,
      Name: "Wifi",
    },
    {
      icon: <ACIcon/>,
      Name: "AC",
    },
    {
      icon: <WaterIcon />,
      Name: "Ro Water",
    },
    {
      icon: <ACIcon />,
      Name: "AC",
    },
  ]);
  return (
    <>
      <div className={styles.OuterAmenitiesDiv}>
        <div className={styles.title}>Amenities</div>

        <div className={styles.AmenitiesItems}>
          {amenities.map((item) => (
            <div className={styles.amenityItem}>
              <span>{item.icon}</span>
              <p>{item.Name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowAmenities;
