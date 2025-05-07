import React, { useEffect, useState } from "react";
import { FcPrevious, FcNext } from "react-icons/fc";

function LibraryDescImages({ images }) {
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goRight = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
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
    className="min-w-[40%] max-w-[40%] mx-1 rounded-xl overflow-hidden shadow-lg h-[400px]"
  >
    <img
      src={image.url}
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
