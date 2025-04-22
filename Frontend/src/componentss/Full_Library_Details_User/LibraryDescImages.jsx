import React, { useState } from "react";
import image1 from "../../images/firstImage1.jpg";
import image2 from "../../images/firstImage2.jpg";
import image3 from "../../images/firstImage3.jpg";
import image4 from "../../images/firstImage4.webp";
import image5 from "../../images/firstImage5.webp";
import { FcPrevious, FcNext } from "react-icons/fc";

function LibraryDescImages() {
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    if (currentIndex < images.length - 2.5) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="relative w-full max-w-screen mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / 2.5)}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-[40%] max-w-[40%] mx-1 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goLeft}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-100 transition"
      >
        <FcPrevious />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-100 transition"
      >
        <FcNext />
      </button>
    </div>
  );
}

export default LibraryDescImages;
