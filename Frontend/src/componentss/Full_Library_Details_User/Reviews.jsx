import React from "react";
import styles from "../../css/Reviews.module.css";
import { DotIcon, StarIcon, UserReviewPic } from "../Svgs";
import libraryImg from '../../images/library.jpg'

function Reviews() {
  return (
    <>
      <div className={styles.OuterReviewdiv}>
        <div className={styles.reviewDescription}>
          <div className={styles.PhotoNNameDetailsNRating}>
            <div className={styles.PhotoNName}>
              <span className={styles.pic}>
                <UserReviewPic />
              </span >
              <span className={styles.UserName}>Rakesh Pal</span>
              <span className={styles.DotIcon}>
                <DotIcon />
              </span>
              <span className={styles.date}>
  {new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
</span>
            </div>
            <div className={styles.RatingNStar}>
              <span >4</span>
              <span>
                <StarIcon />
              </span>
            </div>
          </div>
          <div className={styles.Reviewtitle}>Very Nice</div>
          <div className={styles.ReviewDescription}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
              facilis odit suscipit consequuntur sint voluptatibus earum
              adipisci ipsa est deserunt maxime, dignissimos corporis ratione,
              facere asperiores recusandae molestias similique necessitatibus?
            </p>
          </div>
        </div>
        <div className={styles.ReviewPhotos}>
          <img  src={libraryImg} alt="" />
        </div>
      </div>
    </>
  );
}

export default Reviews;
