import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../css/Full_Library_Details_css/LibraryDescription.module.css";
import { DotIcon, LocationIcon, StarIcon } from "../Svgs";
import { MdOutlineLocationOn } from "react-icons/md";


function LibraryHeader() {
  const name = useSelector(
    (state) => state.overviewDescription.BusinessNameinputvalue
  );
  // const location = useSelector(
  //   (state) => state.overviewDescription.BusinessLocationInputValue
  // );
  const [location,setLocation]=useState("KNIT, Sultanpur")

  return (
    <>
   
      <div className="">
  
        <div className="gap-8 font-semibold">
        <h1 className="text-4xl font-bold">Knowledge Zone Library</h1>
          
          <div className="flex items-center my-2"><MdOutlineLocationOn className="text-4xl"/>
          <p>{location}</p>
           </div>
        </div>



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