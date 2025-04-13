import React, { useEffect, useState } from "react";
import styles from "../../css/Business_Dashboard_Css/overview.module.css";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { ACIcon, CheckAmenityIcon, CheckIcon, CrossIcon, DeleteIcon, WaterIcon, WifiIcon } from "../Svgs";

function Amenities() {

// isedit is used to make toggle between edit and cancel button , also used in different parts 
  const [isEdit, setisEdit] = useState(false);

  const [inputData , setInputData] = useState('')

  const [tempData , settempData] = useState('')

// this amenities and setamenities is used to make amenities input in which three inputs are already predefined
      const [amenities, setAmenities] = useState([
          {id: uuidv4(), icon: <WifiIcon/> , value: "Wifi" , checkIcon : <CheckIcon/>, crossIcon : <CrossIcon/> , isNew : false},
          {id: uuidv4(),icon: <ACIcon/>, value: "AC", checkIcon : <CheckIcon/>, crossIcon : <CrossIcon/>,isNew : false},
          {id: uuidv4(),icon: <WaterIcon />, value: "RO Water", checkIcon : <CheckIcon/>, crossIcon : <CrossIcon/>,isNew : false},
          ]);

// this function handles when we click edit button 
            const handleEditClick = (e) => {
              settempData(inputData)
               setisEdit(!isEdit)
             };

            //  this function call when we type something in input boxes
             const handleInputChange = (id, value) => {
              setAmenities((prev) =>
                prev.map((amenity) =>
                  // this means it target particular input box with id 
                  amenity.id === id ? { ...amenity, value } : amenity
                )
              );
            };

            const handleCancelClick = () => {
              // Reset inputData to previous valid data (tempData)
              setInputData(tempData);
              setisEdit(false);
          
              // Remove new amenities (those that have isNew set to true)
              const updatedAmenities = amenities.filter((amenity) => !amenity.isNew);
              setAmenities(updatedAmenities); // Update the amenities state
            };

            const handleAddMore = () =>{
              const newAmenityInput = {
                id: uuidv4(),
                icon : <CheckAmenityIcon/>,
                value : '',
                deleteIcon : <DeleteIcon/>,
                isNew : true
                
              }
              setAmenities([...amenities , newAmenityInput])
            }
            const handleDeleteInput = (id) => {
              console.log("Deleting at id:", id);  
              const updatedAmenities = amenities.filter((amenity) => amenity.id !== id);
              setAmenities(updatedAmenities);
            };

            const handleSaveClick = (e) => {
                e.preventDefault();
                let hasEmptyNewAmenity = false;
                for (const amenity of amenities) {
                  if (amenity.isNew && !amenity.value.trim()) {
                    hasEmptyNewAmenity = true;
                    break;
                  }
                }
                if (hasEmptyNewAmenity) {
                  toast.error("Please fill out all new amenity fields before saving.");
                  return;
                }


                const values = amenities.map((amenity) => amenity.value.trim());
                const uniqueValues = new Set(); // Initialize an empty Set
            
                let hasDuplicate = false;
            
                for (const value of values) {
                  if (uniqueValues.has(value)) {
                    hasDuplicate = true; // Duplicate found
                    break; // Exit the loop early
                  }
                  uniqueValues.add(value); // Add the value to the Set
                }
            
                if (hasDuplicate) {
                  toast.error("Duplicate amenity values are not allowed.");
                  return;
                }
            
                // Save if no duplicates or empty fields
                toast.success("Your data has been saved.");
                setisEdit(false);
              };

  return (
    <>
      <div className={styles.businessAmenities}>
      
        <div className={styles.titleNedit}>
          <span className={styles.titleName}>Amenities</span>
          <button
            className={styles.edit}
            onClick={isEdit ? handleCancelClick : handleEditClick}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className={styles.amenitiesInputNaddmore}>
          <div className={styles.amenitiesINputNsavebtn}>
            <div className={styles.amenitiesInputs}>
              {
                amenities.map((amenity ) =>(
                  <div key={amenity.id} className={styles.amenitiesInputDiv}>
                <div className={styles.iconNInput}>
                  {amenity.icon}
                  <input
                   disabled =  {!isEdit || !amenity.isNew}
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => handleInputChange(amenity.id, e.target.value)}
                    placeholder={amenity.value}
                    className={styles.amenitiesInputbox}
                    value={amenity.value}
                  />
                </div>
                <div className={styles.checkNcrossButtons}>
                  {!amenity.isNew && (
                    <>
                    <button className={styles.checkButton}>
{amenity.checkIcon}
                  </button>
                  <button className={styles.crossButton}>
                  {amenity.crossIcon}
                  </button>
                  </>
                  )}
                  {amenity.isNew && (
                    <button
                    disabled = {!isEdit}
                      className={styles.deleteButton} // Add your delete button styles here
                      onClick={() => handleDeleteInput(amenity.id)} // Handle delete functionality
                    >
                      {amenity.deleteIcon}
                    </button>
                  )}
                </div>
              </div>
                ))
              }
            </div>
            {isEdit && (
              <button
                type="submit"
                className={styles.save}
                onClick={handleSaveClick}
              >
                SAVE
              </button>
            )}
          </div>
          <button disabled={!isEdit} className={styles.addMorebtn} onClick={handleAddMore}>
            + Add more
          </button>
        </div>
      </div>
    </>
  );
}

export default Amenities;


// import React, { useState } from "react";
// import styles from "../css/overview.module.css";
// import { v4 as uuidv4 } from "uuid";
// import { toast } from "react-toastify";
// import { ACIcon, CheckAmenityIcon, CheckIcon, CrossIcon, DeleteIcon, WaterIcon, WifiIcon } from "./Svgs";

// function Amenities() {
//   const [isEdit, setIsEdit] = useState(false);
//   const [inputData, setInputData] = useState("");
//   const [tempData, setTempData] = useState("");

//   const [amenities, setAmenities] = useState([
//     { id: uuidv4(), icon: <WifiIcon />, value: "Wifi", checkIcon: <CheckIcon />, crossIcon: <CrossIcon />, isNew: false, saved: true },
//     { id: uuidv4(), icon: <ACIcon />, value: "AC", checkIcon: <CheckIcon />, crossIcon: <CrossIcon />, isNew: false, saved: true },
//     { id: uuidv4(), icon: <WaterIcon />, value: "RO Water", checkIcon: <CheckIcon />, crossIcon: <CrossIcon />, isNew: false, saved: true },
//   ]);

//   const handleEditClick = () => {
//     setTempData(inputData);
//     setIsEdit(!isEdit);
//   };

//   const handleInputChange = (id, value) => {
//     setAmenities((prev) =>
//       prev.map((amenity) =>
//         amenity.id === id ? { ...amenity, value } : amenity
//       )
//     );
//   };

//   const handleCancelClick = () => {
//     // Reset inputData to previous valid data (tempData)
//     setInputData(tempData);
//     setIsEdit(false);

//     // Remove only newly added amenities (those that have isNew set to true) or reset the flag
//     const updatedAmenities = amenities.filter((amenity) => amenity.saved); // Keep saved amenities only
//     setAmenities(updatedAmenities); // Update the amenities state
//   };

//   const handleAddMore = () => {
//     const newAmenityInput = {
//       id: uuidv4(),
//       icon: <CheckAmenityIcon />,
//       value: "",
//       deleteIcon: <DeleteIcon />,
//       isNew: true,
//       saved: false, // New amenity is not saved yet
//     };
//     setAmenities([...amenities, newAmenityInput]);
//   };

//   const handleDeleteInput = (id) => {
//     const updatedAmenities = amenities.filter((amenity) => amenity.id !== id);
//     setAmenities(updatedAmenities);
//   };

//   const handleSaveClick = (e) => {
//     e.preventDefault();

//     // Check for empty new amenities
//     let hasEmptyNewAmenity = false;
//     for (const amenity of amenities) {
//       if (amenity.isNew && !amenity.value.trim()) {
//         hasEmptyNewAmenity = true;
//         break;
//       }
//     }
//     if (hasEmptyNewAmenity) {
//       toast.error("Please fill out all new amenity fields before saving.");
//       return;
//     }

//     // Check for duplicates
//     const values = amenities.map((amenity) => amenity.value.trim());
//     const uniqueValues = new Set(); // Initialize an empty Set

//     let hasDuplicate = false;

//     for (const value of values) {
//       if (uniqueValues.has(value)) {
//         hasDuplicate = true; // Duplicate found
//         break; // Exit the loop early
//       }
//       uniqueValues.add(value); // Add the value to the Set
//     }

//     if (hasDuplicate) {
//       toast.error("Duplicate amenity values are not allowed.");
//       return;
//     }

//     // If no validation errors, save the data and set isNew to false and saved to true
//     const updatedAmenities = amenities.map((amenity) =>
//       amenity.isNew ? {...amenity, isNew: false, saved: true } : amenity
//     );
//     setAmenities(updatedAmenities);
//     toast.success("Your data has been saved.");
//     setIsEdit(false);
//   };

//   return (
//     <div className={styles.businessAmenities}>
//       <div className={styles.titleNedit}>
//         <span className={styles.titleName}>Amenities</span>
//         <button className={styles.edit} onClick={isEdit ? handleCancelClick : handleEditClick}>
//           {isEdit ? "Cancel" : "Edit"}
//         </button>
//       </div>

//       <div className={styles.amenitiesInputNaddmore}>
//         <div className={styles.amenitiesINputNsavebtn}>
//           <div className={styles.amenitiesInputs}>
//             {amenities.map((amenity) => (
//               <div key={amenity.id} className={styles.amenitiesInputDiv}>
//                 <div className={styles.iconNInput}>
//                   {amenity.icon}
//                   <input
//                     disabled={!isEdit || amenity.saved} // Only disable if it's saved and edit mode is off
//                     type="text"
//                     onChange={(e) => handleInputChange(amenity.id, e.target.value)}
//                     placeholder={amenity.value}
//                     className={styles.amenitiesInputbox}
//                     value={amenity.value}
//                   />
//                 </div>
//                 <div className={styles.checkNcrossButtons}>
//                   {!amenity.isNew && (
//                     <>
//                       <button className={styles.checkButton}>{amenity.checkIcon}</button>
//                       <button className={styles.crossButton}>{amenity.crossIcon}</button>
//                     </>
//                   )}
//                   {amenity.isNew && (
//                     <button
//                       disabled={!isEdit}
//                       className={styles.deleteButton}
//                       onClick={() => handleDeleteInput(amenity.id)}
//                     >
//                       {amenity.deleteIcon}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {isEdit && (
//             <button type="submit" className={styles.save} onClick={handleSaveClick}>
//               SAVE
//             </button>
//           )}
//         </div>
//         <button disabled={!isEdit} className={styles.addMorebtn} onClick={handleAddMore}>
//           + Add more
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Amenities;