import React from "react";
import styles from "../../css/User_view_css/DesktopCard.module.css";
import { Link } from "react-router-dom";
import { LocationIcon } from "../Svgs";

// Replace these image paths with actual image URLs or import them
import library1 from "../../images/library 1.jpeg";
import library2 from "../../images/library 2.jpeg";
import library3 from "../../images/library 3.jpeg";
import library4 from "../../images/library 4.jpeg";
import library5 from "../../images/library 5.jpeg";
import library6 from "../../images/library 6.jpeg";
import library7 from "../../images/library 7.jpeg";
import library8 from "../../images/library 8.jpeg";
import library9 from "../../images/library 9.jpeg";
import library10 from "../../images/library 10.jpeg";
import library11 from "../../images/library 11.jpeg";
import library12 from "../../images/library 12.jpeg";
import library13 from "../../images/library 13.jpeg";
import library14 from "../../images/library 14.jpeg";
import library15 from "../../images/library 15.jpeg";
import library16 from "../../images/library 16.jpeg";

function DesktopCard() {
  const libraryData = [
    { title: "Knowledge Zone Library", location: "Shivaji Nagar, Kamta Chinhat, Lucknow", city: "Lucknow", rating: 4.5, reviews: 25, image: library1 },
    { title: "Study Hub Library", location: "Mahanagar, Lucknow", city: "Lucknow", rating: 4.7, reviews: 30, image: library2 },
    { title: "Mind Space Library", location: "Indira Nagar, Lucknow", city: "Lucknow", rating: 4.6, reviews: 22, image: library3 },
    { title: "Quiet Corner Library", location: "Gomti Nagar, Lucknow", city: "Lucknow", rating: 4.8, reviews: 40, image: library4 },
    { title: "Scholars' Paradise", location: "Hazratganj, Lucknow", city: "Lucknow", rating: 4.3, reviews: 15, image: library5 },
    { title: "Focus Point Library", location: "Aliganj, Lucknow", city: "Lucknow", rating: 4.2, reviews: 18, image: library6 },
    { title: "Reading Nook Library", location: "Vikramshila, Lucknow", city: "Lucknow", rating: 4.4, reviews: 27, image: library7 },
    { title: "Book Haven Library", location: "Krishna Nagar, Sultanpur", city: "Sultanpur", rating: 4.9, reviews: 50, image: library8 },
    { title: "The Study Den", location: "Baba Bhudev Nagar, Lucknow", city: "Lucknow", rating: 4.6, reviews: 33, image: library9 },
    { title: "Academic Oasis Library", location: "Sadar Bazar, Lucknow", city: "Lucknow", rating: 4.7, reviews: 35, image: library10 },
    { title: "Learn & Grow Library", location: "Telibagh, Lucknow", city: "Lucknow", rating: 4.8, reviews: 42, image: library11 },
    { title: "The Book Vault", location: "Jankipuram, Lucknow", city: "Lucknow", rating: 4.5, reviews: 28, image: library12 },
    { title: "The Study Spot", location: "Nawabganj, Lucknow", city: "Lucknow", rating: 4.3, reviews: 19, image: library13 },
    { title: "Eureka Learning Library", location: "Kaiserbagh, Lucknow", city: "Lucknow", rating: 4.6, reviews: 31, image: library14 },
    { title: "Insight Study Library", location: "Ashiyana, Lucknow", city: "Lucknow", rating: 4.7, reviews: 26, image: library15 },
    { title: "The Reading Room", location: "Rahat Colony, Lucknow", city: "Lucknow", rating: 4.4, reviews: 24, image: library16 },
    { title: "Classic Library", location: "Kachahri, Sultanpur", city: "Sultanpur", rating: 4.3, reviews: 19, image: library11 }, // ✅ Fixed: added missing brace
    { title: "Knowledge Arena", location: "Kanpur, Uttar Pradesh", city: "Kanpur", rating: 4.7, reviews: 33, image: library9 },
    { title: "Future Scholars Library", location: "Lalganj, Sultanpur", city: "Sultanpur", rating: 4.6, reviews: 25, image: library1 },
    { title: "Elite Study Hub", location: "Kanpur, Uttar Pradesh", city: "Kanpur", rating: 4.5, reviews: 28, image: library1 },
    { title: "The Book House", location: "Shahganj, Sultanpur", city: "Sultanpur", rating: 4.8, reviews: 40, image: library1 },
    { title: "Study Paradise", location: "Kanpur, Uttar Pradesh", city: "Kanpur", rating: 4.9, reviews: 50, image: library2 },
  ];

  const getStatus = (rating) => {
    if (rating > 4.5) return "Excellent";
    if (rating >= 4) return "Very Good";
    return "Good";
  };

  return (
    <>
      {["Trending Libraries", "Libraries Near You"].map((sectionTitle) => (
        <div className={styles.TrendingLibrariesNCrds} key={sectionTitle}>
          <div className={styles.trendingLibrary}>{sectionTitle}</div>
          <div className={styles.FullCardsSection}>
            {libraryData.map((library, index) => (
              <div className={styles.OuterCard} key={index}>
                <div className={styles.LibraryImage}>
                  <img src={library.image} alt="Library" />
                </div>

                <div className={styles.libraryDeatils}>
                  <div className={styles.upperDetailsDiv}>
                    <div className={styles.libraryTitle}>
                      <span>{library.title}</span>
                    </div>

                    <div className={styles.locationDetails}>
                      <span className={styles.locationIcon}>
                        <LocationIcon />
                      </span>
                      <span className={styles.locationName}>
                        {library.location}, {library.city}
                      </span>
                    </div>

                    <div className={styles.ratingDetails}>
                      <div className={styles.ratingStar}>
                        <div className={styles.rating}>{library.rating}</div>
                        <div className={styles.star}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="11"
                            viewBox="0 0 10 11"
                            fill="none"
                          >
                            <path
                              d="M8.03945 10.4715C7.68369 10.7376 5.40093 9.05103 4.96373 9.04732C4.52653 9.04365 2.21807 10.6914 1.86645 10.4194C1.51483 10.1473 2.34147 7.35315 2.20973 6.9167C2.078 6.48025 -0.13221 4.69082 0.00623934 4.25663C0.144719 3.82245 2.93836 3.78212 3.29413 3.51606C3.6499 3.25003 4.59239 0.496329 5.02963 0.500004C5.4668 0.503711 6.36671 3.27297 6.71833 3.54501C7.06994 3.81702 9.86264 3.90458 9.99441 4.34103C10.1261 4.77748 7.88867 6.52933 7.75019 6.96352C7.61174 7.3977 8.39522 10.2055 8.03945 10.4715Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className={styles.ratingsRiviews}>
                        <span>{library.reviews} Ratings</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="3"
                            height="3"
                            viewBox="0 0 3 3"
                            fill="none"
                          >
                            <path
                              d="M1.39489 2.89475C1.01258 2.89475 0.684528 2.75785 0.410717 2.48404C0.136905 2.21023 0 1.88217 0 1.49987C0 1.11756 0.136905 0.789508 0.410717 0.515697C0.684528 0.241886 1.01258 0.10498 1.39489 0.10498C1.77719 0.10498 2.10525 0.241886 2.37906 0.515697C2.65287 0.789508 2.78977 1.11756 2.78977 1.49987C2.78977 1.75301 2.72519 1.98549 2.59604 2.19731C2.47205 2.40913 2.30415 2.57961 2.09233 2.70877C1.88568 2.83276 1.6532 2.89475 1.39489 2.89475Z"
                              fill="#4D4D4D"
                            />
                          </svg>
                        </span>
                        <span>{getStatus(library.rating)}</span>
                      </div>
                    </div>
                  </div>
                  <button className={styles.btn}>
                    <Link to={"/"}>View Details</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default DesktopCard;
