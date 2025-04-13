import React, { useState } from "react";
import styles from "../css/time.module.css";
import { DownArrow } from "../Svgs";

function Time() {
  const [days, setDays] = useState([
    {
      day: "Monday",
      from: "",
      to: "",
    },
    {
      day: "Tuesday",
      from: "",
      to: "",

    },
    {
      day: "Wednesday",
      from: "",
      to: "",
    },
    {
      day: "Thursday",
      from: "",
      to: "",
    },
    {
      day: "Friday",
      from: "",
      to: "",
    },
    {
      day: "Saturday",
      from: "",
      to: "",
    },
    {
      day: "Sunday",
      from: "",
      to: "",
    },
  ]);


  const [downArrowClick , setDownArrowClick] = useState(false)
  const [OpenTimeClick ,setOpenTimeClick] = useState(false)

  const MainHandleDownArrow = () =>{
      setDownArrowClick(!downArrowClick)
  }

  const HandleTimeOpen = () =>{
      setOpenTimeClick(!OpenTimeClick)
  }



  return (
    <>
    <div className={styles.FullDivTimeNChoose}>
      <div className={styles.FullTimeOuterDiv}>
        <div className={styles.titleNedit}>
          <span className={styles.titleName}>Time</span>
          <button
            className={styles.edit}
            //   onClick={() => handleEditClick(item.id)}
          >
            {/* {item.isEdit ? "Cancel" : "Edit"} */}
            Edit
          </button>
        </div>
        <div className={styles.InputDivNSave}>
          <div className={styles.inputDiv}>
            <div className={styles.InputBoxDiv}>
              <input className={styles.InputBox} type="text" />
            </div>
            <button className={styles.DownArrow} onClick={MainHandleDownArrow}>
              <DownArrow />
            </button>
          </div>
          <button className={styles.save} type="submit">
            Save
          </button>
        </div>
      </div>

      {
            downArrowClick && (
                  <div className={styles.FullChooseDayNTime}>
        {days.map((item) => (
          <div className={styles.OuterTimeDiv}>
            <div className={styles.dayName}>{item.day}</div>

            <div className={styles.ChooseTime}>
              <div className={styles.OpenNClose}>
                <div className={styles.open}>
                  <input type="radio" />
                  <span>Open</span>
                  <button onClick={HandleTimeOpen}>
                    <DownArrow />
                  </button>
                </div>
                <div className={styles.close}>
                  <input type="radio" />
                  <span>Close</span>
                </div>
              </div>

             {
                  OpenTimeClick && (
                        <div className={styles.TimeFromToDiv}>
                        <div className={styles.Hours}>
                          <input type="radio" />
                          <span>24 hours</span>
                        </div>
                        <div className={styles.TimeNTo}>
                          <input type="radio" />
                          <span>hello ji</span>
                        </div>
                      </div>
                  )
             }
            </div>
          </div>
        ))}
      </div>
            )
      }
    </div>
    </>
  );
}

export default Time;
