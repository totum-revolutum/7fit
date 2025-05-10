import React, { useState } from "react";
import styles from "./Schedule.module.scss";

const hours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);
const days = [
  "понеділок",
  "вівторок",
  "середа",
  "четвер",
  "пʼятниця",
  "субота",
  "неділя",
];

// Тимчасова болванка для стану бронювання: true — зайнято, false — вільно
const initialAvailability = Array.from({ length: 7 }, () =>
  Array.from({ length: 14 }, () => Math.random() < 0.3)
);

export const Schedule = () => {
  const [availability] = useState(initialAvailability);
  const [selectedCell, setSelectedCell] = useState<{
    day: number;
    hour: number;
  } | null>(null);

  const handleClick = (dayIndex: number, hourIndex: number) => {
    if (!availability[dayIndex][hourIndex]) {
      setSelectedCell({ day: dayIndex, hour: hourIndex });
    }
  };

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.headerRow}>
        <div className={styles.cornerCell}></div>
        {days.map((day, i) => (
          <div key={i} className={styles.headerCell}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.grid}>
        {hours.map((hour, hourIndex) => (
          <div key={hour} className={styles.row}>
            <div className={styles.timeCell}>{hour}</div>
            {days.map((_, dayIndex) => {
              const isBusy = availability[dayIndex][hourIndex];
              return (
                <div
                  key={dayIndex}
                  className={`${styles.cell} ${
                    isBusy ? styles.busy : styles.free
                  }`}
                  onClick={() => handleClick(dayIndex, hourIndex)}
                />
              );
            })}
          </div>
        ))}
      </div>
      {selectedCell && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedCell(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Запис на заняття</h2>
            <p>
              День: <strong>{days[selectedCell.day]}</strong>
            </p>
            <p>
              Час: <strong>{hours[selectedCell.hour]}</strong>
            </p>
            <select>
              <option>Тренер 1</option>
              <option>Тренер 2</option>
            </select>
            <button onClick={() => setSelectedCell(null)}>Записатись</button>
          </div>
        </div>
      )}
    </div>
  );
};

// import React, { useState } from "react";
// import styles from "./Schedule.module.scss";

// const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
// const hours = Array.from({ length: 14 }, (_, i) => `${8 + i}:00`);

// // Стан кожної комірки: true — вільне місце, false — зайняте
// const mockSlots: Record<string, boolean> = {
//   "Пн-8:00": true,
//   "Вт-8:00": true,
//   "Вт-9:00": false,
//   "Ср-8:00": true,
// };

// const Schedule = () => {
//   const [selected, setSelected] = useState<{
//     day: string;
//     time: string;
//   } | null>(null);

//   const isFree = (day: string, time: string) =>
//     mockSlots[`${day}-${time}`] ?? false;

//   const handleClick = (day: string, time: string) => {
//     if (isFree(day, time)) {
//       setSelected({ day, time });
//       alert(`Обрано: ${day}, ${time}`);
//     }
//   };

//   return (
//     <div className={styles.schedule}>
//       <div className={styles.time}></div>
//       {days.map((day) => (
//         <div key={day} className={styles.header}>
//           {day}
//         </div>
//       ))}

//       {hours.map((hour) => (
//         <React.Fragment key={hour}>
//           <div className={styles.time}>{hour}</div>
//           {days.map((day) => {
//             const free = isFree(day, hour);
//             return (
//               <div
//                 key={`${day}-${hour}`}
//                 className={`${styles.cell} ${
//                   free ? styles.free : styles.booked
//                 }`}
//                 onClick={() => handleClick(day, hour)}
//               />
//             );
//           })}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// };

export default Schedule;
