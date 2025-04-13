import React from 'react'
import styles from '../css/DesktopBigCards.module.css'
import libraryimage from '../images/library.jpg'
// import { LocationIcon , DotIcon } from './Svgs'
import { useLocation } from "react-router-dom";

function DesktopBigCard() {

      const location = useLocation();
    const params = new URLSearchParams(location.search);
    const formattedAddress = params.get("address");
  return (
    <>
    <div>
      MOODS in Around Me  { formattedAddress }
    </div>
    <div className={styles.AllNearByCards}>

    <div className={styles.OutermostCard}>
<div className={styles.imageDiv}>
<img src={libraryimage} alt="" />
</div>
<div className={styles.LibraryDetailsDiv}>
<div className={styles.details}>
<div className={styles.NameNLocation}>
<span>
Knowledge Zone Library
</span>
<p>
      {/* <LocationIcon/> */}
      <span>
            300m
      </span>
      {/* <DotIcon/> */}
      <span>
      Knit, near rss building , 1 floor  , sultanpur
      </span>
</p>
</div>
<div className={styles.RatingNOpenNAmenities}>
<p>
Ratings
</p>
<p>
Open 
</p>
<p>
Amenities come here
</p>
</div>
</div>
<div className={styles.libraryPrice}>
Price come here 
</div>
</div>
    </div>

    </div>
    </>
  )
}

export default DesktopBigCard