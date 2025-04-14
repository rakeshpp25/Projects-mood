import React from "react";
import styles from "../../css/time.module.css";
import { DownArrow } from "../Svgs";

function Time({ days, setDays, isEditing }) {
  // Toggle the display of options when the day input box is clicked.
  const toggleOptions = (index) => {
    if (!isEditing) return;

    setDays((prevDays) =>
      prevDays.map((item, i) =>
        i === index
          ? { ...item, showOptions: !item.showOptions }
          : { ...item, showOptions: false }
      )
    );
  };

  // Handle the change in selected status (24 hours, close, custom).
  const handleOptionChange = (index, status) => {
    if (!isEditing) return;

    const updatedDays = [...days];
    updatedDays[index].status = status;
    // Clear custom time when '24 hours' or 'close' is selected
    if (status !== "custom") {
      updatedDays[index].customTime = "";
    }
    setDays(updatedDays);
  };

  // Handle the custom time input change.
  const handleCustomTimeChange = (index, value) => {
    if (!isEditing) return;

    const updatedDays = [...days];
    updatedDays[index].customTime = value;
    setDays(updatedDays);
  };

  return (
    <div className={styles.FullTimeSection}>
      <div className={styles.title}>Time</div>

      {days.map((item, index) => (
        <div key={item.day} className={styles.AllDays}>
          <div className={styles.ParticularDay}>
            <div
              className={styles.InputBoxDiv}
              onClick={() => toggleOptions(index)}
              style={{
                cursor: isEditing ? "pointer" : "not-allowed",
                pointerEvents: isEditing ? "auto" : "none",
              }}
            >
              <input
                className={styles.InputBox}
                type="text"
                value={
                  item.status === "24"
                    ? `${item.day} - 24 Hours Open`
                    : item.status === "close"
                    ? `${item.day} - Close`
                    : item.status === "custom" && item.customTime
                    ? `${item.day} - ${item.customTime}`
                    : item.day
                }
                readOnly
              />
              <span className={styles.arrowIcon}>
                <DownArrow />
              </span>
            </div>

            {item.showOptions && (
              <div className={styles.insideDate}>
                <div className={styles.openNClose}>
                  <label className={styles.open}>
                    <input
                      type="radio"
                      name={`time-${index}`}
                      checked={item.status === "24"}
                      onChange={() => handleOptionChange(index, "24")}
                      disabled={!isEditing}
                    />
                    <span>24 Hours Open</span>
                  </label>

                  <label className={styles.close}>
                    <input
                      type="radio"
                      name={`time-${index}`}
                      checked={item.status === "close"}
                      onChange={() => handleOptionChange(index, "close")}
                      disabled={!isEditing}
                    />
                    <span>Close</span>
                  </label>
                </div>

                <div className={styles.CustomTime}>
                  <label className={styles.custom}>
                    <input
                      type="radio"
                      name={`time-${index}`}
                      checked={item.status === "custom"}
                      onChange={() => handleOptionChange(index, "custom")}
                      disabled={!isEditing}
                    />
                    <input
                      className={styles.customTimeInput}
                      type="text"
                      placeholder="Custom Time (e.g. 10 AM - 5 PM)"
                      value={item.customTime}
                      onChange={(e) =>
                        handleCustomTimeChange(index, e.target.value)
                      }
                      disabled={!isEditing || item.status !== "custom"}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Time;
