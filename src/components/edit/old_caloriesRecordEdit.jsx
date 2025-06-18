import { useState } from "react";
import "./calorieRecordEdit.css";
import styled from "styled-components";

const Form = styled.form`
  /* Form styles */

  background-color: #d4e0ff;
  padding: 20px;
  border-radius: 10px;

  & label {
    color: #333;
    margin-right: 30px;
    margin-bottom: 10px;
    margin-right: 0px;
  }

  & input[type="text"],
  & input[type="number"],
  & input[type="date"] {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    min-width: 255px;
    margin-bottom: 20px;
    font-size: 16px;
    display: block;
    box-sizing: border-box;
  }

  & select {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    min-width: 255px;
    margin-bottom: 20px;
    display: block;
    box-sizing: border-box;
  }

  & .footer {
    display: flex;
  }

  & #calories {
    border: ${(props) => props.caloriescount < 0 && `1px solid red`};
    background-color: ${(props) => props.caloriescount < 0 && `white`};
    color: ${(props) => props.caloriescount < 0 && "red"};
  }

  & .footer button {
    background-color: white;
    color: #012367;
    display: block;
    border: 3px solid #012367;
    border-radius: 15px;
    padding: 10px;
    cursor: pointer;
    flex-grow: 1;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;

    & input[type="text"],
    & input[type="number"],
    & input[type="date"],
    & select {
      width: 30%;
    }

    & .input-row {
      margin: 0;
      display: flex;
      justify-content: space-between;
      margin-right: 5%;
    }
    & .footer {
      grid-column-end: -1;
      grid-area: 3 / 1 / 4 / 3;
      margin: 0 25%;
    }

    & .footer button {
      display: flex;
      justify-content: center;
    }
  }
`;

// why not say : fullRecord.date = ..., cause that mean into same location of obj update value x by bla bla bla,
//  but same location => so react indicate this is same, so you  must add new obj,
//  one of popular way to do this "spread operator!"

function CaloriesRecordEdit(props) {
  const DEFAULT_VALUE = {
    date: "",
    component: "",
    calories: 0,
    meal: "",
  };
  //   let dateValue, mealValue, componentValue, caloriesValue;
  const [dateValue, setDateValue] = useState();
  const [mealValue, setMealValue] = useState();
  const [componentValue, setComponentValue] = useState();
  const [caloriesValue, setCaloriesValue] = useState();
  const [fullRecord, setFullRecord] = useState(DEFAULT_VALUE);

  const onDateChangeHandler = (event) => {
    // setDateValue(event.target.value);
    setFullRecord({
      ...fullRecord,
      date: event.target.value,
    });
  };

  const onMealChangeHandler = (event) => {
    // setMealValue(event.target.value);
    setFullRecord({
      ...fullRecord,
      meal: event.target.value,
    });
  };

  const onComponentChangeHandler = (event) => {
    // setComponentValue(event.target.value);
    setFullRecord({
      ...fullRecord,
      component: event.target.value,
    });
  };

  const onCaloriesChangeHandler = (event) => {
    // setCaloriesValue(event.target.value);
    setFullRecord({
      ...fullRecord,
      calories: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log({ dateValue, mealValue, componentValue, caloriesValue });
    console.log(fullRecord);
    props.onformSubmit(fullRecord);
    setFullRecord(DEFAULT_VALUE);
  };
  return (
    <Form caloriescount={fullRecord.calories} onSubmit={onSubmitHandler}>
      <div className="input-row">
        <label htmlFor="date">Date: </label>
        <input
          type="date"
          name="date"
          id="date"
          value={fullRecord.date}
          onChange={onDateChangeHandler}
        ></input>
      </div>

      <div className="input-row">
        <label htmlFor="meal">Male:</label>
        <select
          name="meal"
          id="meal"
          value={fullRecord.meal}
          onChange={onMealChangeHandler}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Launch">Launch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div className="input-row">
        <label htmlFor="component">Component:</label>
        <input
          type="text"
          name="component"
          id="component"
          // 2 way binding ...
          value={fullRecord.component} // 2- then set value here into this value box!
          onChange={onComponentChangeHandler} // 1- take input here, fire event
        />
      </div>

      <div className="input-row">
        <label htmlFor="calories">Calories:</label>
        <input
          type="number"
          name="calories"
          id="calories"
          value={fullRecord.calories}
          onChange={onCaloriesChangeHandler}
        />
      </div>

      <div className="footer">
        <button>Add Record</button>
      </div>
    </Form>
  );
}

export default CaloriesRecordEdit;
