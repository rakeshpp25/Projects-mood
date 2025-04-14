import React from "react";
import libraryimage from "../../images/library.jpg";
import { SlLocationPin } from "react-icons/sl";
import { IoStar } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";

const NearMeCard = () => {
  return (
    <>
      <div className="flex flex-col justify-between  bg-white shadow-md rounded-lg p-4 m-2">
        <div className="sm:flex m-2 gap-4">
          <div>
            <img className="sm:w-64 " src={libraryimage} alt="" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-3">
                <h1 className="font-semibold">Library Name</h1>

                <div className="flex gap-2  items-center">
                  <SlLocationPin />
                  <p>2.5 km-</p>
                  <span>Knit, near rss building , 1 floor , sultanpur</span>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1 w-12 px-1 text-white bg-red-700 ">
                    {" "}
                    <span>4.5</span>{" "}
                    <span>
                      <IoStar />{" "}
                    </span>
                  </div>
                  <p>(25 Ratings)</p>
                  <h6>Excellent</h6>
                </div>

                <div className="flex gap-2 items-center">
                  <p>Open</p>
                  <p>24 hours</p>
                </div>
              </div>
              <div>
                <p>Amenities </p>
              </div>
            </div>

            <div className="sm:flex justify-between">
              <div className="flex">
                <h3 className="flex gap-2 items-center">
                  <FaRupeeSign />
                  Min
                </h3>
                -{" "}
                <h3 className="flex gap-2 items-center">
                  <FaRupeeSign />
                  Max
                </h3>
              </div>

              <div className="flex gap-2">
                <button className="border-blue-800 border-2 px-2 py-1 text-blue-800">
                  View Details
                </button>
                <button className="bg-blue-800 text-white px-2 py-1">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NearMeCard;