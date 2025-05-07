import React from "react";
import styles from "../../css/Full_Library_Details_css/ShowAmenities.module.css";
import { WaterIcon, WifiIcon, ACIcon, CheckIcon } from "../Svgs";
import { LuCircleCheckBig } from "react-icons/lu";
function ShowAmenities({ overview }) {
  // Icon mapper based on string name
  const getIcon = (name) => {
    switch (name?.toLowerCase()) {
      case "wifi":
        return <WifiIcon />;
      case "ac":
        return <ACIcon />;
      case "power backup":
      case "ro water":
        return <WaterIcon />;
      default:
        return <LuCircleCheckBig/>; // default or fallback icon
    }
  };

  return (
    <div className={styles.OuterAmenitiesDiv}>
      <div className={styles.title}>Amenities</div>
      <div className="flex flex-wrap gap-4 w-full max-w-[800px]">
        {overview?.amenities?.map((item, index) => (
          <div key={index} className="flex items-center gap-2 w-[150px]">
            <span>{getIcon(item)}</span>
            <p className="text-[18px] text-[#303030]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAmenities;
