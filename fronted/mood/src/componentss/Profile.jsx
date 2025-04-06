import React, { useState } from "react";
import styles from "../css/profile.module.css";
import EditButton from "./EditButton";
import { useSelector } from 'react-redux';
import SaveButton from "./SaveButton";

function Profile() {

  const isEditing = useSelector((state) => state.edit.editStates);

  const [selectedGender, setSelectedGender] = useState("");
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <>
      {/* full profile starts here  */}
      <div className={styles.wholeProfle}>
        {/* personal information and gender starts here */}
        <div className={styles.informationNinputs}>
          <div className={styles.personalInformation}>
            <div className={styles.title}>
              <span className={styles.titleName}>Personal Information</span>
              <EditButton id={"Personal_information"} />
            </div>

            <form action="" className={styles.nameInputs}>
              <div className={styles.firstNameDetails}>
                <div className={styles.firstNameTittle}>First Name</div>
                <div className={styles.firstNameInput}>
                  <input disabled= {!isEditing["Personal_information"]} type="text" />
                </div>
              </div>

              <div className={styles.lastNameDetails}>
                <div className={styles.lastNameTittle}>Last Name</div>
                <div className={styles.lastNameInput}>
                  <input disabled= {!isEditing["Personal_information"]}  type="text" />
                </div>
              </div>
             {
              isEditing["Personal_information"] && (
<SaveButton/>
              )
             }
            </form>
          </div>
          {/* gender starts  */}
          <div className={styles.gender}>
            <div className={styles.yourGender}>Your Gender</div>
            <form className={styles.maleNfemale} >
              <p>
                <input
                disabled= {!isEditing["Personal_information"]}
                  type="radio"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                />
                <span className={styles.whichGender}>Male</span>
              </p>
              <p>
                <input
                disabled= {!isEditing["Personal_information"]}
                  type="radio"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                />
                <span className={styles.whichGender}>Female</span>
              </p>
            </form>
          </div>
          {/* gender ends here */}
        </div>
        {/* personal information and gender ends here */}

        {/* emai address title and its input start here  */}
        <div className={styles.EmailOuterDiv}>
          <div className={styles.title}>
            <span className={styles.titleName}>Email address</span>
            <EditButton id={"Email_address"} />
          </div>
          <form action="" className={styles.emailForminput}>
            <input disabled= {!isEditing["Email_address"]} type="text" />
            {
              isEditing["Email_address"] && (
<SaveButton/>
              )
             }
          </form>
        </div>
        {/* email address title and its input ends here */}

        {/* mobile number and its input stats here */}
        <div className={styles.EmailOuterDiv}>
          <div className={styles.title}>
            <span className={styles.titleName}>Mobile Number</span>
            <EditButton id={"contact_number"} />
          </div>
          <form action="" className={styles.mobileForminput}>
            <input disabled= {!isEditing["contact_number"]} type="text" />
            {
              isEditing["contact_number"] && (
<SaveButton/>
              )
             }
          </form>
        </div>
        {/* mobile number and its input ends here */}
      </div>
    </>
  );
}

export default Profile;
