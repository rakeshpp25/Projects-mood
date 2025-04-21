import React, { useState } from "react";
import styles from "../../css/Full_Library_Details_css/ShowRatings.module.css";
import { StarIcon } from "../Svgs";
import { IoMdStar,  IoMdStarHalf    } from "react-icons/io";



function ShowRatings() {
  const [GraphReview, setGraphReview] = useState([
    {
      RatingNumber: "5",
      count: 232,
    },
    {
      RatingNumber: "4",
      count: 131,
    },
    {
      RatingNumber: "3",
      count: 54,
    },
    {
      RatingNumber: "2",
      count: 40,
    },
    {
      RatingNumber: "1",
      count: 10,
    },
  ]);

  return (
    <>
      <div className="flex flex-col gap-8 w-[80%]">
        <div className="w-full ">
          <h5 className="text-3xl font-semibold my-4">Ratings and Reviews</h5>
          <p className="font-medium text-lg">Start Your Review</p>
          <div className="flex text-yellow-500 text-4xl">
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            < IoMdStarHalf />
          </div>
        </div>
        <div className={styles.OuterRatingsDiv}>
        <div className={styles.RatingInNumbers}>
          <div className={styles.RatingNStar}>
            <span className={styles.Rating}>4.5</span>
            <span className={styles.stars}>
              <StarIcon />
            </span>
          </div>
          <div className={styles.NoOfReviewsNRatings}>
            <span className={styles.RatingTitle}>Excellent</span>
            <span className={styles.NoOfRatings}>90 Ratings</span>
            <span className={styles.NoOfReviews}>10 Reviews</span>
          </div>
        </div>
        <div className={styles.RatingsInGraphOuterDiv}>
          <div className={styles.RatingsInGraphInnerDiv}>
            {GraphReview.map((item) => (
              <div className={styles.IndividualRatingGrapgh}>
                <div className={styles.GrapghRatingStar}>
                  <span className={styles.GraphRating}>
                    {item.RatingNumber}
                  </span>
                  <svg
                    className={styles.graphStar}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                  >
                    <path
                      d="M9.64734 12.4658C9.22042 12.7851 6.48111 10.7612 5.95647 10.7568C5.43183 10.7524 2.66168 12.7297 2.23974 12.4033C1.8178 12.0768 2.80976 8.72379 2.65168 8.20004C2.4936 7.6763 -0.158652 5.52898 0.00748721 5.00796C0.173663 4.48694 3.52604 4.43855 3.95296 4.11927C4.37988 3.80003 5.51087 0.495595 6.03555 0.500004C6.56015 0.504453 7.64005 3.82757 8.06199 4.15401C8.48393 4.48042 11.8352 4.58549 11.9933 5.10924C12.1514 5.63298 9.46641 7.7352 9.30023 8.25622C9.13409 8.77724 10.0743 12.1466 9.64734 12.4658Z"
                      fill="#FABC3F"
                    />
                  </svg>
                </div>
                <div className={styles.UncloredLine}>
                  <div className={styles.coloredLine}></div>
                </div>
                <div className={styles.count}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      
    </>
  );
}

export default ShowRatings;