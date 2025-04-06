import React, { useState } from "react";
import styles from "../css/dashboardOptions.module.css";
import profile from "../images/profile.png";
import { OverviewIcon, ProfileIcon, ProfilePic, VideoIcon ,PhotoIcon ,ReviewsIcon } from "./Svgs";
import Profile from "./Profile";
import Overview from "./Overview";
import Amenities from './Amenities'
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";

function DashboardOptions() {
    const { view } = useParams(); 

  const [DashBoardOptions, setDashBoardOptions] = useState([
    {
id  :uuidv4(),
      buttonIcon: <ProfileIcon />,
      buttonName: "PROFILE",
      component: <Profile />,
    },
    {
      id  :uuidv4(),
      buttonIcon: <OverviewIcon/>,
      buttonName: "OVERVIEW",
      component: <Overview/> ,
    },
    {
      id  :uuidv4(),
      buttonIcon: <PhotoIcon/>,
      buttonName: "PHOTOS",
    },
    {
      id  :uuidv4(),
      buttonIcon: <ReviewsIcon/>,
      buttonName: "REVIEWS",
    },
  ]);

  const [activeComponent, setActiveComponent] = useState(DashBoardOptions[0].id);// State to track the active component

  const renderComponent = () => {
    const activeOption = DashBoardOptions.find((option) => option.id === activeComponent);
    return activeOption ? activeOption.component : null;
  };

  return (
    <>
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
            <p className={styles.name}>Rakesh Pal</p>
          </div>
        </div>
        {/* profile pic and name ends here  */}

        {/* dashboard options starts from here */}
        <div className={styles.dashboardOptions}>
          <div className={styles.innerDashboardDiv}>
            {DashBoardOptions.map((item) => (
              <button
              key={item.id}
               className={`${styles.profile} ${styles.btns}`}
              onClick={() => setActiveComponent(item.id)} >
                {item.buttonIcon}
                <span>{item.buttonName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

        {/* Render Active Component */}
        <div className={styles.activeComponent}>
        {renderComponent()}
      </div>
  </div>
    </>
  );
}

export default DashboardOptions;
