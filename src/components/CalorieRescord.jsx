import { useState } from "react";
import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyleRecordCell from "./StyleRecordCell";

function CalorieRecord(props) {
  // let currentCalories = props.calories;

  // console.log("Initial props.calories:", props.calories, typeof props.calories);// string
  const [currentCalories, setCurrentCalories] = useState(+props.calories);
  // there is state for each instance + currencCalories will const we will not update it manually
  // this fun return 2 values, getter + setter
  const CalorieClickHandler = () => {
    console.log("Calorie Recored Clicked");

    setCurrentCalories((currentCalories) => currentCalories + 10); // update + Notify parent DOM to reRender
    // this will schedule to update after end of handler not now!

    //console.log({ currentCalories }); // wrong
  };
  console.log({ currentCalories }); // true value not wrong

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      <li className={styles["record-calories"]}>{props.meal}</li>
      <li className={styles["record-calories"]}>{props.content}</li>
      <li className={styles["record-calories"]} onClick={CalorieClickHandler}>
        <StyleRecordCell>{currentCalories}</StyleRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
