import React, { useState, useEffect } from "react";
import styles from "./Schedule.module.scss";
import Button from "../shared/Button/Button";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  setHours,
  getHours,
  isSameDay,
  parseISO,
} from "date-fns";
import { uk } from "date-fns/locale";
import { useScheduleStore } from "@/stores/scheduleStore";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8:00 - 21:00

const WeeklyCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const {
    trainers,
    workoutTypes,
    fetchOptions,
    createNewEvent,
    events,
    fetchEvents,
  } = useScheduleStore();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [trainerId, setTrainerId] = useState("");
  const [activeWorkoutTypeId, setActiveWorkoutTypeId] = useState(null);

  const currentMonth = format(currentWeekStart, "LLLL", { locale: uk });

  // 1. Завантажити тренерів і типи тренувань один раз
  useEffect(() => {
    fetchOptions();
  }, []);

  // 2. Встановити EMS тип тренування, якщо він є
  useEffect(() => {
    if (workoutTypes.length && !activeWorkoutTypeId) {
      const emsWorkout = workoutTypes.find((w) =>
        w.workout_type.toLowerCase().includes("ems")
      );
      if (emsWorkout) {
        setActiveWorkoutTypeId(emsWorkout.workout_id);
      }
    }
  }, [workoutTypes]);

  // 3. Завантажити події при зміні активного типу тренування
  useEffect(() => {
    if (activeWorkoutTypeId) {
      fetchEvents(activeWorkoutTypeId);
    }
  }, [activeWorkoutTypeId]);

  const eventsForThisWorkout = events.filter(
    (e) => e.workout_id === activeWorkoutTypeId
  );

  const handleTodayClick = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const handlePrevWeek = () =>
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  const handleNextWeek = () =>
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));

  const handleSubmit = async () => {
    if (!selectedSlot || !trainerId || !activeWorkoutTypeId) return;

    // Створюємо час початку та завершення
    const start = new Date(selectedSlot.date);
    start.setHours(selectedSlot.hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    try {
      await createNewEvent(start, end, trainerId, activeWorkoutTypeId);

      setSelectedSlot(null);
      setTrainerId("");
      await fetchEvents(activeWorkoutTypeId);
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("Помилка при створенні запису: " + error.message);
    }
  };

  const todayIndex = isSameDay(currentWeekStart, new Date())
    ? 0
    : Array.from({ length: 7 }).findIndex((_, i) =>
        isSameDay(addDays(currentWeekStart, i), new Date())
      );
  return (
    <section id="schedule" className={styles.scheduleSection}>
      <div className={styles.headline}>
        <div className={`${styles.headline__title} style-h1`}>
          Розклад тренувань
        </div>
        <div className={styles.headline__subtitle}></div>
      </div>

      <div className={styles.schedule}>
        <div className={styles.schedule__nav}>
          <div className={styles.schedule__nav__left}>
            <button onClick={handlePrevWeek}>←</button>
            <div className="style-uppercase-text">{currentMonth}</div>
            <button onClick={handleNextWeek}>→</button>
            <button onClick={handleTodayClick}>Сьогодні</button>
          </div>

          <div className={styles.schedule__navRight}>
            {workoutTypes.map((w) => (
              <button
                key={w.workout_id}
                className={`${styles.filterButton} ${
                  activeWorkoutTypeId === w.workout_id
                    ? styles.activeWorkout
                    : ""
                }`}
                onClick={() => setActiveWorkoutTypeId(w.workout_id)}
              >
                {w.workout_type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.schedule__wrapper}>
          <div className={styles.cornerCell}></div>
          {daysOfWeek.map((day, i) => {
            const date = addDays(currentWeekStart, i);
            return (
              <div
                key={i}
                className={`${styles.schedule__headerCell} ${
                  i === todayIndex ? styles.today : ""
                }`}
              >
                {day}
                <div>{format(date, "dd")}</div>
              </div>
            );
          })}
        </div>

        <div>
          {hours.map((hour) => (
            <div key={hour} className={styles.schedule__row}>
              <div className={styles.schedule__timeCell}>{hour}:00</div>
              {daysOfWeek.map((_, dayIdx) => {
                const date = addDays(currentWeekStart, dayIdx);
                const isBusy = eventsForThisWorkout.some((e) => {
                  const start = new Date(e.start_time);
                  return isSameDay(start, date) && getHours(start) === hour;
                });
                return (
                  <div
                    key={`${hour}-${dayIdx}`}
                    className={`${styles.schedule__cell} ${
                      isBusy ? styles.busy : ""
                    }`}
                    onClick={() => !isBusy && setSelectedSlot({ date, hour })}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {selectedSlot && (
          <div
            className={styles.modalOverlay}
            onClick={() => setSelectedSlot(null)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h3>Запис на заняття</h3>
              <p>
                Дата:{" "}
                {format(
                  setHours(selectedSlot.date, selectedSlot.hour),
                  "eeee, dd.MM в HH:00",
                  { locale: uk }
                )}
              </p>
              <div>
                Тип тренування:{" "}
                <strong>
                  {workoutTypes.find(
                    (w) => w.workout_id === activeWorkoutTypeId
                  )?.workout_type || "—"}
                </strong>
              </div>
              <select
                value={trainerId}
                onChange={(e) => setTrainerId(e.target.value)}
              >
                <option value="">Оберіть тренера</option>
                {trainers.map((t) => (
                  <option key={t.trainer_id} value={t.trainer_id}>
                    {t.trainer_name}
                  </option>
                ))}
              </select>
              <Button textType="ENROL" onClick={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyCalendar;
