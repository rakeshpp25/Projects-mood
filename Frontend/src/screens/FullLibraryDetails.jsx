import React, { useEffect, useState } from "react";
import axios from "axios";
import LibraryDescImages from "../componentss/Full_Library_Details_User/LibraryDescImages";
import LibraryHeader from "../componentss/Full_Library_Details_User/LibraryHeader";
import Reviews from "../componentss/Full_Library_Details_User/Reviews";
import ShowAmenities from "../componentss/Full_Library_Details_User/ShowAmenities";
import ShowRatings from "../componentss/Full_Library_Details_User/ShowRatings";
import Navbar from "../componentss/Reuse/Navbar";
import Prices from "../componentss/Full_Library_Details_User/Prices";
import SpecialFeature from "../componentss/Full_Library_Details_User/SpecialFeature";
import { useParams } from "react-router-dom";

const FullLibraryDetails = () => {
  const [images, setImages] = useState([]);
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);
  const [overview, setOverview] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch overview data
        // const overviewRes = await axios.get(
        //   `http://localhost:8000/dashboard/overview/${id}`
        // );
        // if (overviewRes.data) {
        //   setOverview(overviewRes.data);
        //   console.log("Overview:", overviewRes.data);
        // }

        // Fetch profile data
        // const profileRes = await axios.get(
        //   `http://localhost:8000/dashboard/profile/${id}`
        // );
        // if (profileRes.data) {
        //   const { library_name, city, mobile_no } = profileRes.data;
        //   setProfile({ library_name, city, mobile_no });
        //   console.log("Profile:", profileRes.data);
        // }

        // Fetch address data
        // const addressRes = await axios.get(
        //   `http://localhost:8000/dashboard/address/${id}`
        // );
        // if (addressRes.data) {
        //   const { building_name, area_name, landmark, pin_code } =
        //     addressRes.data;
        //   setAddress({ building_name, area_name, landmark, pin_code });
        //   console.log("Address:", addressRes.data);
        // }

        // Fetch images
        const imageRes = await axios.get(
          `http://localhost:8000/dashboard/imageuploads/${id}`
        );
        if (imageRes.data) {
          setImages(imageRes.data);
          console.log("Images:", imageRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch library details:", error);
      }
    };

    if (id) {
      fetchAllData();
    }
  }, [id]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <LibraryDescImages images={images} />
      <div className="flex justify-between mx-[4%] mt-8">
        <div className="flex flex-col w-[800px] gap-10">
          <LibraryHeader
            profile={profile}
            address={address}
            overview={overview}
          />
          <ShowAmenities overview={overview} />
          <SpecialFeature overview={overview} />
          <div className="flex flex-col gap-4">
            <h1 className="text-[26px] font-bold">About the Library</h1>
            <div className="text-[#303030] text-[18px]">
              {overview?.about_library}
            </div>
          </div>
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
