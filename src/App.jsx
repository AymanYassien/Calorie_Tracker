import { useState } from "react";
import CalorieRecord from "./components/CalorieRescord";
import ListingSection from "./components/filters/ListingSection";
import CaloriesRecordEdit from "./components/edit/caloriesRecordEdit";
import Modal from "react-modal";
import styles from "../src/app.module.css";

const Records = [
  {
    id: 1,
    date: new Date(2023, 9, 6),
    meal: "Breakfast",
    component: "Beans",
    calories: 340,
  },
  {
    id: 2,
    date: new Date(2023, 9, 6),
    meal: "Lunch",
    component: "Chiecken",
    calories: 600,
  },
  {
    id: 3,
    date: new Date(2024, 9, 6),
    meal: "Dinner",
    component: "Egg",
    calories: 300,
  },
  {
    id: 4,
    date: new Date(2023, 10, 6),
    meal: "Snacks",
    component: "Choclate",
    calories: 450,
  },
];

function App() {
  const [dynamicRecords, setDynamicRecords] = useState(Records);
  const [nextId, setNextId] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      background: "rgba(0,0,0,.5)",
    },
  };

  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: new Date(record.date),
      id: nextId,
    };

    setNextId((prev) => prev + 1);
    setDynamicRecords((prevRecords) => [formattedRecord, ...prevRecords]);

    handleCloseModal();
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    // Must have one root element
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal} // when user Reques Close as : press esc button .. etc
        contentLabel="Modal"
        style={modalStyles}
      >
        <CaloriesRecordEdit
          onFormSubmit={formSubmitHandler}
          onCancel={handleCloseModal}
        />
      </Modal>

      <ListingSection allRecords={dynamicRecords}></ListingSection>
      <button className={styles["open-modal-button"]} onClick={handleOpenModal}>
        Track food
      </button>
    </div>
  );
}

export default App;

// <CalorieRecord
//         date={new Date(2023, 9, 6)}
//         meal="Breakfast"
//         content="Beans"
//         calories="340"
//       />
//       <CalorieRecord
//         date={new Date(2023, 9, 10)}
//         meal="Lunch"
//         content="Chiecken"
//         calories={600}
//       />
//       <CalorieRecord
//         date={new Date(2024, 10, 28)}
//         meal="Dinner"
//         content="Egg"
//         calories="300"
//       />
//       <CalorieRecord
//         date={new Date(2023, 11, 8)}
//         meal="Snacks"
//         content="Choclate"
//         calories="450"
//       />
