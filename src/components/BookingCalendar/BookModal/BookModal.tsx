import React, { useState } from "react";
import styles from "./BookModal.module.scss";

const times = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);
const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const trainers = ["Олег", "Ірина", "Марина", "Дмитро"];

const BookModal = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const handleSlotClick = (day, time) => {
    setSelectedSlot({ day, time });
  };

  const handleTrainerSelect = (e) => {
    setSelectedTrainer(e.target.value);
  };

  const handleBookingConfirm = () => {
    console.log(
      `Бронь: ${selectedSlot.day} ${selectedSlot.time} - Тренер: ${selectedTrainer}`
    );
    setSelectedSlot(null);
    setSelectedTrainer("");
  };

  const isSlotBooked = (day, time) => {
    return Math.random() > 0.7; // Random booked for demo
  };

  return (
    <div className={styles.scheduleWrapper}>
      <div className={styles.grid}>
        <div className={styles.header}></div>
        {days.map((day) => (
          <div key={day} className={styles.header}>
            {day}
          </div>
        ))}

        {times.map((time) => (
          <React.Fragment key={time}>
            <div className={styles.time}>{time}</div>
            {days.map((day) => {
              const booked = isSlotBooked(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  className={`${styles.slot} ${
                    booked ? styles.booked : styles.available
                  }`}
                  onClick={() => !booked && handleSlotClick(day, time)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {selectedSlot && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              Бронювання: {selectedSlot.day}, {selectedSlot.time}
            </h3>
            <select value={selectedTrainer} onChange={handleTrainerSelect}>
              <option value="">Оберіть тренера</option>
              {trainers.map((trainer) => (
                <option key={trainer} value={trainer}>
                  {trainer}
                </option>
              ))}
            </select>
            <button onClick={handleBookingConfirm}>Підтвердити</button>
            <button onClick={() => setSelectedSlot(null)}>Скасувати</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookModal;
