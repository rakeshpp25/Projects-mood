import React, { useEffect, useState } from "react";
import Amenities from "./Amenities";
import BusinessNameNLocationinput from "./BusinessNameNLocationinput";

function Overview() {
  return (
    <>
      <BusinessNameNLocationinput />
      <Amenities />
    </>
  );
}

export default Overview;
