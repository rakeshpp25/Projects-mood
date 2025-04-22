import React, { useState, useEffect } from "react";
import styles from "../../css/Business_Dashboard_Css/dashboardOptions.module.css";
// import profile from "../images/profile.png";
import Footer from "../Reuse/Footer";
import {
  OverviewIcon,
  ProfileIcon,
  ProfilePic,
  PhotoIcon,
  ReviewsIcon,
  Addresslocation,
  FeesIcon,
  StatusIcon,
  DocumentIcon,
} from "../Svgs";
import Profile from "./Profile";
import Overview from "./Overview";
// import Amenities from "./Amenities";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Reuse/Navbar";
import axios from "axios";
import Address from "./Address";
import FeeDetails from "./FeeDetails";
import Documents from "./Documents";
import PhotoUploads from "./PhotoUploads";
import Status from "./Status";

function DashboardOptions() {
  const { view } = useParams();
  const [userData, setUserData] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // State to track loading
  const [DashBoardOptions, setDashBoardOptions] = useState([
    {
      id: uuidv4(),
      buttonIcon: <ProfileIcon />,
      buttonName: "PROFILE",
      component: <Profile />,
    },
    {
      id: uuidv4(),
      buttonIcon: <OverviewIcon />,
      buttonName: "OVERVIEW",
      component: <Overview />,
    },
    {
      id: uuidv4(),
      buttonIcon: <Addresslocation />,
      buttonName: "ADDRESS",
      component: <Address />,
    },
    {
      id: uuidv4(),
      buttonIcon: <FeesIcon />,
      buttonName: "FEES",
      component: <FeeDetails />,
    },
    {
      id: uuidv4(),
      buttonIcon: <DocumentIcon />,
      buttonName: "Documents",
      component: <Documents />,
    },
    {
      id: uuidv4(),
      buttonIcon: <PhotoIcon />,
      buttonName: "PHOTOS",
      component: <PhotoUploads />,
    },

    {
      id: uuidv4(),
      buttonIcon: <ReviewsIcon />,
      buttonName: "REVIEWS",
    },
    {
      id: uuidv4(),
      buttonIcon: <StatusIcon />,
      buttonName: "STATUS",
      component: <Status />,
    },
  ]);

  const [activeComponent, setActiveComponent] = useState(
    DashBoardOptions[0].id
  ); // State to track the active component

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Profile", {
          withCredentials: true, // Include cookies for authentication
        });
        setUserData(res.data); // Set the user data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchUserData();
  }, []);

  const renderComponent = () => {
    const activeOption = DashBoardOptions.find(
      (option) => option.id === activeComponent
    );
    return activeOption ? activeOption.component : null;
  };

  return (
    <>
      <Navbar />
      <div className={styles.WholeComponent}>
        <div className={styles.allOptions}>
          {/* profile pic and name starts here  */}
          <div className={styles.profilePicNname}>
            {/* profilepic section starts */}
            <div className={styles.profilePic}>
              <ProfilePic />
            </div>
            {/* profile i.e user name starts */}
            <div className={styles.UserName}>
              <p className={styles.hello}>Hello</p>
              <p className={styles.name}>{userData?.name}</p>
            </div>
          </div>
          {/* profile pic and name ends here  */}

          {/* dashboard options starts from here */}
          <div className={styles.dashboardOptions}>
            <div className={styles.innerDashboardDiv}>
              {DashBoardOptions.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.profile} ${styles.btns} ${
                    item.id === activeComponent ? styles.activeBtn : ""
                  }`}
                  onClick={() => setActiveComponent(item.id)}
                >
                  {item.buttonIcon}
                  <span>{item.buttonName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Render Active Component */}
        <div className={styles.activeComponent}>{renderComponent()}</div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardOptions;
