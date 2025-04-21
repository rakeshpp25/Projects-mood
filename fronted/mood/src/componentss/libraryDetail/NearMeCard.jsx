import React from "react";
import library1 from "../../images/library 1.jpeg";
import library2 from "../../images/library 2.jpeg";
import library3 from "../../images/library 3.jpeg";
import library4 from "../../images/library 4.jpeg";
import library5 from "../../images/library 5.jpeg";
import { SlLocationPin } from "react-icons/sl";
import { IoStar } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router";

const libraries = [
  {
    name: "Bright Minds Library",
    location: "1.2 km - Near Civil Lines, Allahabad",
    rating: 4.7,
    reviews: 45,
    status: "Open 9am - 9pm",
    image: library1,
  },
  {
    name: "Scholars' Den",
    location: "0.8 km - Opp. Polytechnic, Lucknow",
    rating: 4.3,
    reviews: 30,
    status: "Open 24 hours",
    image: library2,
  },
  {
    name: "Focus Zone Library",
    location: "3.5 km - Behind HBTU, Kanpur",
    rating: 4.8,
    reviews: 60,
    status: "Open 8am - 11pm",
    image: library3,
  },
  {
    name: "StudyHub Corner",
    location: "2.1 km - Near IT Crossing, Lucknow",
    rating: 4.2,
    reviews: 22,
    status: "Open 10am - 8pm",
    image: library4,
  },
  {
    name: "Peaceful Minds Library",
    location: "1.0 km - Close to RSS Building, Sultanpur",
    rating: 4.5,
    reviews: 25,
    status: "Open 24 hours",
    image: library5,
  },
];

const NearMeCard = () => {
  return (
    <>
      {libraries.map((lib, index) => (
        <div
          key={index}
          className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 m-2"
        >
          <div className="sm:flex m-2 gap-4">
            <div>
            <img className="sm:w-64 h-40 object-cover rounded-md" src={lib.image} alt={lib.name} />
            </div>

            <div className="flex flex-col justify-between w-full">
              <div>
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-lg">{lib.name}</h1>

                  <div className="flex gap-2 items-center text-gray-700">
                    <SlLocationPin />
                    <span>{lib.location}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-1 w-14 px-2 py-0.5 text-white bg-green-700 rounded">
                      <span>{lib.rating}</span>
                      <IoStar />
                    </div>
                    <p className="text-sm text-gray-600">({lib.reviews} Ratings)</p>
                    <h6 className="text-sm">
                      {lib.rating >= 4.5 ? "Excellent" : lib.rating >= 4 ? "Good" : "Average"}
                    </h6>
                  </div>

                  <div className="flex gap-2 items-center text-sm text-green-700">
                    <p>{lib.status.split(" ")[0]}</p>
                    <p>{lib.status.replace("Open ", "")}</p>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <p>Amenities: Wi-Fi, AC, Charging Ports</p>
                </div>
              </div>

              <div className="sm:flex justify-between items-center mt-4">
                <div className="flex gap-2 items-center text-sm">
                  <h3 className="flex gap-1 items-center">
                    <FaRupeeSign /> 30
                  </h3>
                  -
                  <h3 className="flex gap-1 items-center">
                    <FaRupeeSign /> 80
                  </h3>
                </div>

                <div className="flex gap-2 mt-2 sm:mt-0">
                  <Link
                    to="/libraryDetails"
                    className="border-blue-800 border-2 px-3 py-1 text-blue-800 rounded"
                  >
                    View Details
                  </Link>
                  <button className="bg-blue-800 text-white px-3 py-1 rounded">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NearMeCard;
