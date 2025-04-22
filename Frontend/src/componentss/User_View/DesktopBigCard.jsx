import React from "react";

// import { LocationIcon , DotIcon } from './svgs'
import { useLocation } from "react-router-dom";
import Navbar from "../Reuse/Navbar";
import NearMeCard from "../libraryDetail/NearMeCard";

function DesktopBigCard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const formattedAddress = params.get("address");

  return (
    <>
      <Navbar />
      <NearMeCard />
      <NearMeCard />
      <NearMeCard />
      <NearMeCard />
      <NearMeCard />
      <NearMeCard />
    </>
  );
}

export default DesktopBigCard;
