import { useState } from "react";
import RecordList from "../RecordList";
import styles from "./listingSection.module.css";

export default function listingSection(props) {
  const { allRecords } = props; // Destructure
  allRecords?.length &&
    localStorage.setItem("mealList", JSON.stringify(allRecords));
  const [currentDate, setCurrentDate] = useState(new Date());

  const dateChangeHandler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  const dateFilter = (record) =>
    record.date.getMonth === currentDate.getMonth &&
    record.date.getDate() === currentDate.getDate() &&
    record.date.getFullYear() === currentDate.getFullYear();

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Choose Date
      </label>
      <input
        id="listingDate"
        type="date"
        className={styles["listing-picker-input"]}
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHandler}
      ></input>

      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );

  return;
}
