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
import { useScheduleStore } from "../../stores/scheduleStore";
import useAuthStore from "../../stores/authStore";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8:00 - 21:00

const WeeklyCalendar = () => {
  const { user, role } = useAuthStore();
  console.log("role", role);
  const {
    trainers,
    workoutTypes,
    users,
    fetchOptions,
    fetchUsers,
    createNewEvent,
    events,
    fetchEvents,
  } = useScheduleStore();

  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [trainerId, setTrainerId] = useState("");
  const [activeWorkoutTypeId, setActiveWorkoutTypeId] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const currentMonth = format(currentWeekStart, "LLLL", { locale: uk });
  const currentUserId = user ? user.id : null;

  useEffect(() => {
    fetchOptions();
    
    // Завантажуємо користувачів для адміна
    if (role === "admin") {
      console.log("Loading users for admin...");
      fetchUsers().then(() => {
        console.log("Users loaded:", users.length);
      }).catch(error => {
        console.error("Error loading users:", error);
      });
    }
  }, [role, fetchOptions, fetchUsers]);

  // Примусово завантажуємо поточного користувача
  useEffect(() => {
    if (!user && !role) {
      console.log("Loading current user...");
      useAuthStore.getState().getCurrentUser();
    }
  }, [user, role]);

  useEffect(() => {
    if (workoutTypes.length && !activeWorkoutTypeId) {
      const emsWorkout = workoutTypes.find((w) =>
        w.workout_type.toLowerCase().includes("ems")
      );
      if (emsWorkout) {
        setActiveWorkoutTypeId(emsWorkout.workout_id);
      }
    }
  }, [workoutTypes, activeWorkoutTypeId]);

  useEffect(() => {
    const start = currentWeekStart.toISOString();
    const end = addDays(currentWeekStart, 7).toISOString();

    fetchEvents(start, end);
  }, [currentWeekStart, fetchEvents]);

  const handlePrevWeek = () =>
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  const handleNextWeek = () =>
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));

  const handleSubmit = async () => {
    if (!selectedSlot || !trainerId || !activeWorkoutTypeId) return;

    const userIdToUse = role === "admin" ? selectedUserId : currentUserId;
    if (!userIdToUse) {
      if (role === "admin") {
        alert("Будь ласка, оберіть користувача для запису");
      } else {
        alert("Не обрано користувача");
      }
      return;
    }

    const start = new Date(selectedSlot.date);
    start.setHours(selectedSlot.hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    try {
      await createNewEvent(
        start,
        end,
        trainerId,
        activeWorkoutTypeId,
        userIdToUse
      );
      setSelectedSlot(null);
      setTrainerId("");
      setSelectedUserId(null);
      setUserSearchQuery("");
      const startRange = currentWeekStart.toISOString();
      const endRange = addDays(currentWeekStart, 7).toISOString();
      await fetchEvents(startRange, endRange);
    } catch (error: any) {
      console.error("Error submitting event:", error);
      alert("Помилка при створенні запису: " + error.message);
    }
  };

  const handleTodayClick = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const todayIndex = isSameDay(currentWeekStart, new Date())
    ? 0
    : Array.from({ length: 7 }).findIndex((_, i) =>
        isSameDay(addDays(currentWeekStart, i), new Date())
      );

  // Функція для підсвічування пошукового тексту
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  // Фільтрація користувачів для пошуку
  const filteredUsers = users.filter((user) => {
    // Показуємо тільки звичайних користувачів (не адмінів)
    if (user.role === "admin") return false;
    
    if (!userSearchQuery) return true;
    const query = userSearchQuery.toLowerCase();
    return (
      user.user_name?.toLowerCase().includes(query) ||
      user.user_email?.toLowerCase().includes(query)
    );
  });

  // Закриваємо випадаючий список при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.combinedUserInput}`)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                const slotDateTime = new Date(date);
                slotDateTime.setHours(hour, 0, 0, 0);

                const eventsAtThisSlot = events.filter((e) => {
                  const start = new Date(e.start_time);
                  return isSameDay(start, date) && getHours(start) === hour;
                });

                const distinctTypesAtSlot = new Set(
                  eventsAtThisSlot.map((e) => e.workout_id)
                );

                const isSlotFullyBooked = distinctTypesAtSlot.size >= 2;
                const isUserInThisSlot = eventsAtThisSlot.some(
                  (e) => e.user_id === currentUserId
                );
                const isCurrentTypeTaken = eventsAtThisSlot.some(
                  (e) => e.workout_id === activeWorkoutTypeId
                );
                const isBlockedByUserEvent =
                  isUserInThisSlot && !isCurrentTypeTaken;

                const isBusy =
                  isCurrentTypeTaken ||
                  isSlotFullyBooked ||
                  isBlockedByUserEvent;

                const isMyEvent = eventsAtThisSlot.find(
                  (e) =>
                    e.workout_id === activeWorkoutTypeId &&
                    e.user_id === currentUserId
                );

                const isPast = slotDateTime < new Date();

                return (
                  <div
                    key={`${hour}-${dayIdx}`}
                    className={`${styles.schedule__cell} 
              ${isBusy ? styles.busy : ""} 
              ${isSlotFullyBooked ? styles.blocked : ""} 
              ${isMyEvent ? styles.myEvent : ""}`}
                    onClick={() => {
                      if (!isBusy && !isPast) {
                        setSelectedSlot({ date, hour });
                        // Примусово завантажуємо користувачів для адміна
                        if (role === "admin" || user?.role === "admin") {
                          fetchUsers();
                        }
                      }
                    }}
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
                className={styles.modalSelect}
              >
                <option value="">Оберіть тренера</option>
                {trainers.map((t) => {
                  const trainerBusy = events.some((e) => {
                    const start = new Date(e.start_time);
                    return (
                      e.trainer_id === t.trainer_id &&
                      isSameDay(start, selectedSlot.date) &&
                      getHours(start) === selectedSlot.hour
                    );
                  });

                  return (
                    <option
                      key={t.trainer_id}
                      value={t.trainer_id}
                      disabled={trainerBusy}
                    >
                      {t.trainer_name} {trainerBusy ? "(Зайнятий)" : ""}
                    </option>
                  );
                })}
              </select>

              {(role === "admin" || user?.role === "admin") && (
                <div className={styles.userSelection}>
                  <label>Оберіть користувача:</label>
                  <div className={styles.combinedUserInput}>
                    <input
                      type="text"
                      placeholder="Пошук користувача..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      onFocus={() => {
                        setShowUserDropdown(true);
                        // Очищаємо поле при повторному фокусі, якщо користувач вже обраний
                        if (selectedUserId) {
                          setSelectedUserId(null);
                          setUserSearchQuery("");
                        }
                      }}
                      className={styles.userSearchInput}
                    />
                    {showUserDropdown && filteredUsers.length > 0 && (
                      <div className={styles.userDropdown}>
                        {filteredUsers.slice(0, 5).map((u) => (
                          <div
                            key={u.user_id}
                            className={styles.userOption}
                            onClick={() => {
                              setSelectedUserId(u.user_id);
                              setUserSearchQuery(u.user_name);
                              setShowUserDropdown(false);
                            }}
                          >
                            <div 
                              className={styles.userName}
                              dangerouslySetInnerHTML={{
                                __html: highlightText(u.user_name || '', userSearchQuery)
                              }}
                            />
                            <div 
                              className={styles.userEmail}
                              dangerouslySetInnerHTML={{
                                __html: highlightText(u.user_email || '', userSearchQuery)
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {users.length === 0 && (
                    <div style={{ color: '#ff6b6b', fontSize: '12px' }}>
                      Завантаження користувачів...
                    </div>
                  )}
                </div>
              )}

              <Button textType="ENROL" onClick={handleSubmit} />
            </div>
          </div>
        )}

        {showLoginAlert && (
          <div className={styles.alert}>
            Щоб записатись на тренування, спочатку зареєструйтесь
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyCalendar;
