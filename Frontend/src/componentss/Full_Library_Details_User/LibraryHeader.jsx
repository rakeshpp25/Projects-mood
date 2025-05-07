import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../css/Full_Library_Details_css/libraryDescription.module.css";
import { DotIcon, LocationIcon, StarIcon } from "../Svgs";
import { MdOutlineLocationOn } from "react-icons/md";

function LibraryHeader({ profile, address, overview }) {
  const name = useSelector(
    (state) => state.overviewDescription.BusinessNameinputvalue
  );

  const [libraryStatus, setLibraryStatus] = useState('');

  useEffect(() => {
    if (overview?.time) {
      const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();  // Get current day in lowercase (e.g., "monday")
      console.log("Today:", today);  // Log today's day

      // Log the time entries in overview
      console.log("Overview Time:", overview.time);

      // Find the operating hours entry for today
      const todayHours = overview.time.find(
        (entry) => entry.day.toLowerCase() === today  // Convert both to lowercase
      );

      if (todayHours) {
        console.log("Today's Hours:", todayHours);  // Log found entry
        setLibraryStatus(todayHours.status);  // Set status from found entry
      } else {
        setLibraryStatus('Closed');  // Default if no entry for today
      }
    }
  }, [overview]);

  return (
    <>
      <div className={styles.OuterFullHeader}>
        <div className={styles.titleNLocation}>
          <h1 className={styles.LibraryName}>{profile?.library_name}</h1>
          <div className={styles.LocationNIcon}>
            <span className={styles.loactionIcon}><LocationIcon /></span>
            <p className={styles.locationName}>
              {address?.building_name}, {address?.landmark}, {address?.area_name}, {address?.pin_code}, {profile?.city}
            </p>
          </div>
        </div>

        <div className={styles.RatingTimeContact}>
          <div className={styles.ReviewNRatingsDetails}>
            <div className={styles.RatingNStar}>
              <span className={styles.rating}>4.5</span>
              <span className={styles.star}><StarIcon /></span>
            </div>
            <p className={styles.review}>
              <span>(25 Ratings)</span>
              <span><DotIcon /></span>
              <span>Excellent</span>
            </p>
          </div>

          <div className={styles.Time}>
          <span className={`font-medium text-[18px] ${libraryStatus === 'close' ? 'text-red-500' : 'text-[#059212]'}`}>
  {libraryStatus === 'open' || libraryStatus === '24'
    ? 'Open'
    : libraryStatus === 'close'
    ? 'Closed'
    : libraryStatus === 'custom'
    ? 'Open'
    : 'Status Unknown'}
</span>
<span><DotIcon /></span>
<span className={`text-[18px] ${libraryStatus === 'close' ? 'text-[#4D4D4D]' : 'text-[#4D4D4D]'}`}>
  {libraryStatus === 'open'
    ? 'Currently Open'
    : libraryStatus === 'close'
    ? 'Currently Closed'
    : libraryStatus === '24'
    ? '24 hours'
    : libraryStatus === 'custom'
    ? `${overview.time.find(d => d.day.toLowerCase() === new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase())?.customTime || 'Check timings'}`
    : 'Check timings'}
</span>

</div>


          <div className={styles.ContactNumber}>
            <span className="font-medium text-[18px]">Contact</span>
            <span><DotIcon /></span>
            <span className="text-[#4D4D4D] text-[18px]">{profile?.mobile_no}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LibraryHeader;
