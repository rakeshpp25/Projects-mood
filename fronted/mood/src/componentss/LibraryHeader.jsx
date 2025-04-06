import React from "react";
import { useSelector } from "react-redux";
import styles from "../css/LibraryDescription.module.css";
import { DotIcon, LocationIcon, StarIcon } from "./Svgs";


function LibraryHeader() {
  const name = useSelector(
    (state) => state.overviewDescription.BusinessNameinputvalue
  );
  const location = useSelector(
    (state) => state.overviewDescription.BusinessLocationInputValue
  );

  return (
    <>
      <div className={styles.OuterFullHeader}>
{/* Library title and location starts for user to see */}
        <div className={styles.NameNLocation}>
          <span className={styles.LibraryName} >{name}</span>
          <p className={styles.LocationNIcon}>
            <span className={styles.loactionIcon}><LocationIcon/></span>
            <span className={styles.locationName}>{location}</span>
          </p>
        </div>
{/* Library title and location ends for user to see */}


<div className={styles.RatingTimeContact}>
<div className={styles.ReviewNRatingsDetails}>
<div className={styles.RatingNStar}>
<span className={styles.rating}>
  4.5
</span>
<span className={styles.star}>
<StarIcon/>
</span>
</div>
<p className={styles.review}>
  <span>(25 Ratings)</span>
  <span><DotIcon/></span>
  <span>Excellent</span>
</p>
</div>

<div className={styles.Time}>
<span>
  Open
</span>
<span>
<DotIcon/>
</span>
<span>
  24 Hpurs
</span>
</div>

<div className={styles.ContactNumber}>
<span>
  Contact
</span>
<span>
<DotIcon/>
</span>
<span>
  7232948707
</span>
</div>
</div>
      </div>
    </>
  );
}

export default LibraryHeader;
