import React, { useEffect, useState } from "react";
import styles from "../css/overview.module.css";
import { toast } from "react-toastify";
import Profile from "./Profile";
import Amenities from "./Amenities";
import BusinessNameNLocationinput from "./BusinessNameNLocationinput";

function Overview() {
return (
  <>
  <BusinessNameNLocationinput/>
  <Amenities/>
  
  </>
)
}

export default Overview;


