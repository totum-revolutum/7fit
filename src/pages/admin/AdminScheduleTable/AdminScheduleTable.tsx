import React, { useEffect, useState } from "react";
import styles from "./AdminScheduleTable.module.scss";
import { format, isToday, isAfter, parseISO } from "date-fns";
import { uk } from "date-fns/locale";
import { fetchAllEventsWithDetails } from "../../../api/events";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  start_time: string;
  end_time: string;
  user_id: string;
  trainer_id: string;
  workout_id: string;
  user_name: string;
  trainer_name: string;
  workout_type: string;
  created_at: string;
}

const AdminScheduleTable = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [todayEvents, setTodayEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const start = new Date().toISOString();
        const end = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        ).toISOString();
        
        const eventsData = await fetchAllEventsWithDetails(start, end);
        setEvents(eventsData);
      } catch (err) {
        console.error("Помилка при завантаженні подій:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    if (events && events.length > 0) {
      const today: Event[] = [];
      const upcoming: Event[] = [];

      events.forEach((e) => {
        const start = parseISO(e.start_time);
        if (isToday(start)) {
          today.push(e);
        } else if (isAfter(start, new Date())) {
          upcoming.push(e);
        }
      });

      const sortFn = (a: Event, b: Event) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime();

      setTodayEvents(today.sort(sortFn));
      setUpcomingEvents(upcoming.sort(sortFn));
    } else {
      setTodayEvents([]);
      setUpcomingEvents([]);
    }
  }, [events]);

  const renderTable = (title: string, data: Event[]) => (
    <div className={styles.tableSection}>
      <h3>{title}</h3>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>Час</th>
            <th>Відвідувач</th>
            <th>Тренер</th>
            <th>Тип заняття</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((e) => (
              <tr key={e.id}>
                <td>
                  {format(parseISO(e.start_time), "dd.MM HH:mm", {
                    locale: uk,
                  })}
                </td>
                <td>
                  <Link to={`/profile/${e.user_id}`} className={styles.userLink}>{e.user_name}</Link>
                </td>
                <td>
                  <Link to={`/profile/${e.trainer_id}`} className={styles.userLink}>{e.trainer_name}</Link>
                </td>
                <td>{e.workout_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.emptyRow}>
                Немає записів
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.adminSchedule}>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminSchedule}>
      {renderTable("Сьогоднішні заняття", todayEvents)}
      {renderTable("Майбутні заняття", upcomingEvents)}
    </div>
  );
};

export default AdminScheduleTable;
