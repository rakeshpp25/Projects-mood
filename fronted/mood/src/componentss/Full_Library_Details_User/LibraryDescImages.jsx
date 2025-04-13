import React, { useState } from "react";
import styles from "../css/librarydesimages.module.css";
import image1 from "../images/ball.jpeg";
import image2 from "../images/library.jpg";
import image3 from "../images/MainAfter.jpg";
import image4 from "../images/nature.avif";
import image5 from "../images/new.jpg";

function LibraryDescImages() {
  const images = [image1, image2, image3, image4, image5];
  const [ currentImage , setcurrentImage] = useState(0)

  const changeimage = (e) =>{

  }

  return (
    <>
      <div className={styles.wholeImages}>
        {images.map((image, index) => (
          <img src={image} alt="" key={index} />
        ))}
      </div>
      <div className={styles.carousel}>
          <button className={styles.left}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <rect
                width="48"
                height="48"
                rx="24"
                transform="matrix(-1 0 0 1 48 0)"
                fill="white"
              />
              <path
                d="M28.5969 12.892C28.83 12.6779 29.1379 12.5642 29.4541 12.5755C29.7703 12.5867 30.0694 12.722 30.2867 12.952C30.5039 13.1821 30.6218 13.4884 30.6149 13.8048C30.6081 14.1211 30.4769 14.422 30.2498 14.6424L21.1118 23.273C20.694 23.6676 20.694 24.3324 21.1118 24.727L30.2498 33.3576C30.4769 33.578 30.6081 33.8789 30.6149 34.1953C30.6218 34.5116 30.5039 34.818 30.2867 35.048C30.0694 35.2781 29.7703 35.4134 29.4541 35.4246C29.1379 35.4358 28.83 35.3221 28.5969 35.1081L17.7622 24.8752C17.6431 24.7627 17.5483 24.627 17.4835 24.4765C17.4187 24.326 17.3852 24.1639 17.3852 24C17.3852 23.8362 17.4187 23.674 17.4835 23.5236C17.5483 23.3731 17.6431 23.2374 17.7622 23.1248L28.5969 12.892Z"
                fill="#6439FF"
              />
            </svg>
          </button>

          <button className={styles.right} onClick={changeimage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
            >
              <rect x="0.689453" width="48" height="48" rx="24" fill="white" />
              <path
                d="M20.0925 12.892C19.8595 12.6779 19.5516 12.5642 19.2353 12.5755C18.9191 12.5867 18.62 12.722 18.4028 12.952C18.1855 13.1821 18.0676 13.4884 18.0745 13.8048C18.0814 14.1211 18.2126 14.422 18.4396 14.6424L27.5776 23.273C27.9955 23.6676 27.9955 24.3324 27.5776 24.727L18.4396 33.3576C18.2126 33.578 18.0814 33.8789 18.0745 34.1953C18.0676 34.5116 18.1855 34.818 18.4028 35.048C18.62 35.2781 18.9191 35.4134 19.2353 35.4246C19.5516 35.4358 19.8595 35.3221 20.0925 35.1081L30.9272 24.8752C31.0463 24.7627 31.1412 24.627 31.206 24.4765C31.2708 24.326 31.3042 24.1639 31.3042 24C31.3042 23.8362 31.2708 23.674 31.206 23.5236C31.1412 23.3731 31.0463 23.2374 30.9272 23.1248L20.0925 12.892Z"
                fill="#6439FF"
              />
            </svg>
          </button>
        </div>
    </>
  );
}

export default LibraryDescImages;
