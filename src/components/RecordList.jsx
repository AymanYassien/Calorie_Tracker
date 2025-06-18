import styled from "styled-components";
import CalorieRecord from "./CalorieRescord";
import styles from "./RecordList.module.css";
// import "./RecordList.css";

const List = styled.ul`
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 10px;

  & li {
    margin: 10px;
  }
`;
// not use <List> , to try modules

function RecordList({ records }) {
  return records?.length ? (
    <ul className={styles.list}>
      {records.map((record) => (
        <li className={styles.listItem} key={record.id}>
          <CalorieRecord
            date={record.date}
            meal={record.meal}
            content={record.component}
            calories={record.calories}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );
}

export default RecordList;
