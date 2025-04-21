import React, { useState } from "react";
import axios from "axios";
import styles from "../../css/FessDetails.module.css";
import EditButton from "../Reuse/EditButton";
import SaveButton from "../Reuse/SaveButton";
import { toast } from "react-toastify";

function FeeDetails() {
  const initialFeeStructure = {
    Hourly: {
      "2 Hours": "",
      "4 Hours": "",
    },
    Weekly: {
      "Half Day": "",
      "Full Day": "",
      "Full Day (Reserved)": "",
      "24 Hours": "",
      "24 Hours (Reserved)": "",
      "Night Hours": "",
    },
    Monthly: {
      "Half Day": "",
      "Full Day": "",
      "Full Day (Reserved)": "",
      "24 Hours": "",
      "24 Hours (Reserved)": "",
      "Night Hours": "",
    },
  };

  const [feeData, setFeeData] = useState(initialFeeStructure);
  const [originalData, setOriginalData] = useState(initialFeeStructure);
  const [isEditing, setIsEditing] = useState(false);
  const [newInputs, setNewInputs] = useState({
    Hourly: [],
    Weekly: [],
    Monthly: [],
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setFeeData(originalData);
      setNewInputs({
        Hourly: [],
        Weekly: [],
        Monthly: [],
      });
    }
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e, type, label) => {
    const value = e.target.value;
    setFeeData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [label]: value,
      },
    }));
  };

  const handleNewInputChange = (e, type, index) => {
    const { name, value } = e.target;
    const updated = [...newInputs[type]];
    updated[index][name] = value;

    setNewInputs((prev) => ({
      ...prev,
      [type]: updated,
    }));
  };

  const handleAddMoreClick = (type) => {
    setNewInputs((prev) => ({
      ...prev,
      [type]: [...prev[type], { label: "", value: "" }],
    }));
  };

  const handleDeleteNewInput = (type, index) => {
    const updated = [...newInputs[type]];
    updated.splice(index, 1);
    setNewInputs((prev) => ({
      ...prev,
      [type]: updated,
    }));
  };

  const transformFeeDataForBackend = (data) => {
    const transformed = {
      Hourly: [],
      Weekly: [],
      Monthly: [],
    };

    Object.entries(data).forEach(([type, durations]) => {
      Object.entries(durations).forEach(([label, value]) => {
        if (value.trim()) {
          transformed[type].push({ label, value });
        }
      });
    });

    return transformed;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // ✅ Validate only new inputs (not predefined ones)
    for (let type in newInputs) {
      for (let item of newInputs[type]) {
        if (!item.label.trim() || !item.value.trim()) {
          toast.error("Title and Fee can't be empty in added fields");
          return;
        }
      }
    }

    const updatedFeeData = { ...feeData };
    for (let type in newInputs) {
      newInputs[type].forEach(({ label, value }) => {
        updatedFeeData[type][label] = value;
      });
    }

    setFeeData(updatedFeeData);
    setOriginalData(updatedFeeData);
    setNewInputs({ Hourly: [], Weekly: [], Monthly: [] });
    setIsEditing(false);

    try {
      const payload = transformFeeDataForBackend(updatedFeeData);
      const res = await axios.put("http://localhost:8000/feesdetails", payload);
      console.log("Saved to backend:", res.data);
      toast.success("Fee details saved successfully!");
    } catch (err) {
      console.error("Error saving fee data:", err);
      toast.error("Failed to save fee data. Try again.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <form onSubmit={handleSave}>
        <div className={styles.titleNEdit}>
          <span>Fee Details</span>
          <EditButton isEditing={isEditing} onClick={handleEditToggle} />
        </div>

        {Object.entries(feeData).map(([type, durations]) => (
          <div key={type} className={styles.hourlySection}>
            <span>{type}</span>
            <div className={styles.InsideHourly}>
              {Object.entries(durations).map(([label, value]) => (
                <div key={label} className={styles.HourlyItem}>
                  <span>{label}</span>
                  <div className={styles.price}>
                    <span>Rs</span>
                    <input
                      className={styles.HourlyFeesInputBox}
                      type="text"
                      value={value}
                      disabled={!isEditing}
                      onChange={(e) => handleInputChange(e, type, label)}
                    />
                  </div>
                </div>
              ))}

              {isEditing &&
                newInputs[type]?.map((item, index) => (
                  <div key={index} className={styles.HourlyItem}>
                    <input
                      type="text"
                      placeholder="New title"
                      name="label"
                      value={item.label}
                      onChange={(e) => handleNewInputChange(e, type, index)}
                      className={styles.HourlyFeesInputBox}
                    />
                    <div className={styles.price}>
                      <span>Rs</span>
                      <input
                        type="text"
                        placeholder="Fee"
                        name="value"
                        value={item.value}
                        onChange={(e) => handleNewInputChange(e, type, index)}
                        className={styles.HourlyFeesInputBox}
                      />
                    </div>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={() => handleDeleteNewInput(type, index)}
                    >
                      🗑️
                    </span>
                  </div>
                ))}
            </div>

            {isEditing && (
              <span
                className={styles.AddMoreText}
                onClick={() => handleAddMoreClick(type)}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  marginTop: "8px",
                  display: "inline-block",
                }}
              >
                + Add more
              </span>
            )}
          </div>
        ))}

        {isEditing && <SaveButton onClick={handleSave} />}
      </form>
    </div>
  );
}

export default FeeDetails;
