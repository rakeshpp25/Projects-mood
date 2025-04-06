import "./App.css";
import { Routes, Route } from "react-router-dom";
import Emailverify from "./componentss/Emailverify";
import Usersignup from "./componentss/Usersignup";
import Login from "./componentss/Login";
import axios from "axios";
import Home from "./screens/Home";
import DesktopCard from "./componentss/DesktopCard";
import DashboardOptions from "./componentss/DashboardOptions";
import Profile from "./componentss/Profile";
import LibraryDescImages from "./componentss/libraryDescImages";
import GetIntouch from "./componentss/GetIntouch";
import Overview from "./componentss/Overview";
import Amenities from "./componentss/Amenities";
import BusinessNameNLocationinput from "./componentss/BusinessNameNLocationinput";
import LibraryHeader from "./componentss/LibraryHeader";
import ShowAmenities from "./componentss/ShowAmenities";
import Time from "./componentss/Time";
import ShowRatings from "./componentss/ShowRatings";
import Reviews from "./componentss/Reviews";
import ReviewInputs from "./componentss/ReviewInputs";
import Footer from "./componentss/Footer";
import Dashboard from "./screens/Dashboard";
import UploadImages from "./componentss/UploadImages";
import DesktopBigCard from "./componentss/DesktopBigCard";
import BusinessSignup from "./componentss/BusinessSignup";
import BusinessModel from "../../../backend/models/BusinessSignup";
import BusinessEmailVerify from "./componentss/BusinessEmailverify";

axios.defaults.withCredentials = true; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/usersignup" element={<Usersignup/>} />
        <Route path="/businessSignup" element={<BusinessSignup/>} />
        <Route path="/emailverify" element={<Emailverify/>} />
        <Route path="/businessemailverify" element={<BusinessEmailVerify/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/uploadImages" element={<UploadImages/> } />
        <Route path="/Nearme" element={<DesktopBigCard/> } />
      </Routes>
    </>
  );
}

export default App;
