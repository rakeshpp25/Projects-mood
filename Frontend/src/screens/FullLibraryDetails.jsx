import React from "react";
import LibraryDescImages from "../componentss/Full_Library_Details_User/LibraryDescImages";
import LibraryHeader from "../componentss/Full_Library_Details_User/LibraryHeader";
import Reviews from "../componentss/Full_Library_Details_User/Reviews";
import ShowAmenities from "../componentss/Full_Library_Details_User/ShowAmenities";
import ShowRatings from "../componentss/Full_Library_Details_User/ShowRatings";

import Navbar from "../componentss/Reuse/Navbar";
import Prices from "../componentss/Full_Library_Details_User/Prices";
import SpecialFeature from "../componentss/Full_Library_Details_User/SpecialFeature";

const FullLibraryDetails = () => {
  return (
    <div className="flex  flex-col gap-2">
      <Navbar />
      <LibraryDescImages />
      <div className="flex justify-between ">
        <div className="flex flex-col w-full m-20 ml-40  gap-10">
          <LibraryHeader />

          <ShowAmenities />
          <SpecialFeature />
          <div>
            <h1 className="text-3xl m-4 font-bold ">About the Library</h1>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              magnam at nulla saepe, minima voluptate cum nemo perspiciatis
              exercitationem quos?{" "}
            </div>
          </div>

          {/* <div></div> */}
          <ShowRatings />

          <Reviews />
        </div>
        <div className="mt-20 w-[30%] mr-52">
          <Prices />
        </div>
      </div>
    </div>
  );
};

export default FullLibraryDetails;
