import React, { lazy, Suspense } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import libraryData from "../../libraryData.json";
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

const imageMap = {
  library1,
  library2,
  library3,
  library4,
  library5,
  library6,
  library7,
  library8,
  library9,
  library10,
  library11,
  library12,
  library13,
  library14,
  library15,
  library16,
};

const LibraryCard = lazy(() => import('./LibraryCard'));

const TrendingLibraries = () => {
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <h2 className="text-3xl ml-10 font-bold my-6">Trending Libraries</h2>
      <div className="w-[95%] mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Slider {...settings}>
            {libraryData.slice(0, 12).map((lib, idx) => (
              <div key={idx} className="px-2">
                <LibraryCard
                  title={lib.title}
                  location={lib.location}
                  rating={lib.rating}
                  reviews={lib.reviews}
                  image={imageMap[lib.image]}
                />
              </div>
            ))}
          </Slider>
        </Suspense>
      </div>
    </>
  );
};

export default TrendingLibraries;
