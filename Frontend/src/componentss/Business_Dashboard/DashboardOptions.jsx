import React, { useState, useEffect } from "react";
import styles from "../../css/Business_Dashboard_Css/dashboardOptions.module.css";
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
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Reuse/Navbar";
import axios from "axios";
import Address from "./Address";
import FeeDetails from "./FeeDetails";
import Documents from "./Documents";
import PhotoUploads from "./PhotoUploads";
import Status from "./Status";

function DashboardOptions() {
  const { view } = useParams(); // Get URL param
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [DashBoardOptions, setDashBoardOptions] = useState([
    {
      id: uuidv4(),
      path: "profile",
      buttonIcon: <ProfileIcon />,
      buttonName: "PROFILE",
      component: <Profile />,
    },
    {
      id: uuidv4(),
      path: "overview",
      buttonIcon: <OverviewIcon />,
      buttonName: "OVERVIEW",
      component: <Overview />,
    },
    {
      id: uuidv4(),
      path: "address",
      buttonIcon: <Addresslocation />,
      buttonName: "ADDRESS",
      component: <Address />,
    },
    {
      id: uuidv4(),
      path: "fees",
      buttonIcon: <FeesIcon />,
      buttonName: "FEES",
      component: <FeeDetails />,
    },
    {
      id: uuidv4(),
      path: "documents",
      buttonIcon: <DocumentIcon />,
      buttonName: "Documents",
      component: <Documents />,
    },
    {
      id: uuidv4(),
      path: "photos",
      buttonIcon: <PhotoIcon />,
      buttonName: "PHOTOS",
      component: <PhotoUploads />,
    },
    {
      id: uuidv4(),
      path: "reviews",
      buttonIcon: <ReviewsIcon />,
      buttonName: "REVIEWS",
      component: null, // Add a component if needed
    },
    {
      id: uuidv4(),
      path: "status",
      buttonIcon: <StatusIcon />,
      buttonName: "STATUS",
      component: <Status />,
    },
  ]);

  const [activeComponent, setActiveComponent] = useState(
    DashBoardOptions[0].id
  );

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const res = await axios.get("https://backend-wpv4.onrender.com/Profile", {
  //         withCredentials: true,
  //       });
  //       setUserData(res.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // Sync component with URL param
  useEffect(() => {
    const found = DashBoardOptions.find(
      (opt) => opt.path.toLowerCase() === view?.toLowerCase()
    );
    if (found) setActiveComponent(found.id);
    else setActiveComponent(DashBoardOptions[0].id);
  }, [view, DashBoardOptions]);

  const renderComponent = () => {
    const activeOption = DashBoardOptions.find(
      (option) => option.id === activeComponent
    );
    return activeOption ? activeOption.component : null;
  };

  const handleOptionClick = (item) => {
    navigate(`/dashboard/${item.path}`); // Update URL
    setActiveComponent(item.id); // Optional since useEffect also updates this
  };

  return (
    <>
      <Navbar />
      <div className={styles.WholeComponent}>
        <div className={styles.allOptions}>
          <div className={styles.profilePicNname}>
            <div className={styles.profilePic}>
              <ProfilePic />
            </div>
            <div className={styles.UserName}>
              <p className={styles.hello}>Hello</p>
              <p className={styles.name}>{userData?.name}</p>
            </div>
          </div>

          <div className={styles.dashboardOptions}>
            <div className={styles.innerDashboardDiv}>
              {DashBoardOptions.map((item) => (
                <button
                  key={item.id}
                  className={`${styles.profile} ${styles.btns} ${
                    item.id === activeComponent ? styles.activeBtn : ""
                  }`}
                  onClick={() => handleOptionClick(item)}
                >
                  {item.buttonIcon}
                  <span>{item.buttonName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.activeComponent}>{renderComponent()}</div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardOptions;
