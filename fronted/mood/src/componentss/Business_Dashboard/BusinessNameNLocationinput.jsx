import React, { useState } from "react";
import styles from "../../css/Business_Dashboard_Css/overview.module.css";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { setBusinessName ,setBusinessLocation} from "../../Redux/OverviewSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";


function BusinessNameNLocationinput() {
  const dispatch = useDispatch();
  const NameInputValue = useSelector((state) => state.overviewDescription.BusinessNameinputvalue);
  const LocationInputValue = useSelector((state) => state.overviewDescription.BusinessLocationInputValue);

  const [NameNlocation, setNameNlocation] = useState([
    {
      id: uuidv4(),
      title: "Business Name",
      name: "BusinessNameInput",
      isEdit: false,
      inputvalue : ''
    },
    {
      id: uuidv4(),
      title: "Location",
      name: "BusinessLocationInput",
      isEdit: false,
      inputvalue : ''
    },
  ]);
  const handleEditClick = (uuid) => {
    setNameNlocation((prev) =>
      prev.map((item) =>
        item.id === uuid ? { ...item, isEdit: !item.isEdit } : item
      )
    );
  };

  const handleInputChange = (uuid , value) =>{

      setNameNlocation((prev) =>
        prev.map((item) =>
          item.id === uuid ? { ...item, inputvalue: value } : item
        )
      );
      
  }

  const handleSaveClick = (e, uuid) =>{

    e.preventDefault();
    const editedItem = NameNlocation.find((item) => item.id === uuid);


    // validation to not save empty value

    if (!editedItem.inputvalue.trim()) {
      toast.error('Value cannot be empty.');
      return;
    }

    const actionMap = {
      BusinessNameInput: setBusinessName,
      BusinessLocationInput: setBusinessLocation,
    };
  
    dispatch(actionMap[editedItem.name](editedItem.inputvalue));
    toast.success(`${editedItem.title} updated successfully!`);
    handleEditClick(uuid);

    console.log(editedItem.inputvalue)
  };




  return (
    <>
      {NameNlocation.map((item) => (
        <div className={styles.businessName} key={item.id}>
          <div className={styles.titleNedit}>
            <span className={styles.titleName}>{item.title}</span>
            <button
             
              className={styles.edit}
              onClick={() => handleEditClick(item.id)}
            >
              {item.isEdit ? "Cancel" : "Edit"}
            </button>
          </div>
          <form
            action=""
            className={styles.businessInput}
            onSubmit={(e) => handleSaveClick(e, item.id , item.name)}
          >
            <input
              disabled={!item.isEdit}
              name={item.name}
              value={item.inputvalue}
              type="text"
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
            {item.isEdit && (
              <button type="submit" className={styles.save}>
                SAVE
              </button>
            )}
          </form>
        </div>
      ))}
    </>
  );
}

export default BusinessNameNLocationinput;
