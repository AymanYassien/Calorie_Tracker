import { useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit(props) {
  const DEFAULT_VALUES = {
    date: "",
    meal: "Breakfast",
    component: "",
    calories: 0,
  };
  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUES);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Date validation (required)
    if (!mealRecord.date) {
      newErrors.date = "Date is required";
    }

    // Meal validation (required, must select one)
    if (!mealRecord.meal) {
      newErrors.meal = "Please select a meal type";
    }

    // Component validation (required, max 20 characters)
    if (!mealRecord.component.trim()) {
      newErrors.component = "Component name is required";
    } else if (mealRecord.component.length > 20) {
      newErrors.component = "Component name must be less than 20 characters";
    }

    // Calories validation (required, positive number, < 10000)
    if (!mealRecord.calories) {
      newErrors.calories = "Calories is required";
    } else {
      const caloriesNum = Number(mealRecord.calories);
      if (isNaN(caloriesNum) || caloriesNum <= 0) {
        newErrors.calories = "Calories must be a positive number";
      } else if (caloriesNum >= 10000) {
        newErrors.calories = "Calories must be less than 10,000";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onDateChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, date: event.target.value });
  };
  const onMealChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, meal: event.target.value });
  };

  const onComponentChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, component: event.target.value });
  };

  const onCaloriesChangeHandler = (event) => {
    setMealRecord({ ...mealRecord, calories: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      //alert(errors.date, errors.meal, errors.component, errors.calories);
      return; // Stop submission if validation fails
    }

    setErrors({});

    props.onFormSubmit(mealRecord);
    setMealRecord({
      ...mealRecord,
      DEFAULT_VALUES,
    });
  };

  const onCancelHandler = () => {
    setMealRecord({
      ...mealRecord,
      DEFAULT_VALUES,
    });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        value={mealRecord.date}
        id="date"
        onChange={onDateChangeHandler}
        required
      />
      <label htmlFor="meal">Meal: </label>
      <select id="meal" onChange={onMealChangeHandler} value={mealRecord.meal}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="component">component: </label>
      <input
        type="text"
        id="component"
        value={mealRecord.component}
        pattern="^[a-zA-Z\s]{3,15}$"
        title="Please enter a Valid meal's Name "
        onChange={onComponentChangeHandler}
      />
      <label htmlFor="calories">Calories: </label>
      <input
        type="number"
        id="calories"
        value={mealRecord.calories}
        pattern="^[1-9][0-9]{0,3}$"
        min="1"
        max="4999"
        title="Please enter a positive number less than 5,000"
        onChange={onCaloriesChangeHandler}
        className={`${styles["calories-input"]} ${
          mealRecord.calories < 0 ? styles.error : ""
        }`}
      />
      <div className={styles.footer}>
        <button>Add Record</button>
        <button
          type="button"
          className={styles.secondary}
          onClick={onCancelHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
