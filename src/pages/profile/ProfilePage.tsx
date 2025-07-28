import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, isAfter, parseISO } from "date-fns";
import { uk } from "date-fns/locale";
import useAuthStore from "@stores/authStore";
import {
  fetchUserById,
  fetchTrainerById,
  updateUserById,
  updateTrainerById,
} from "../../api/user";
import { fetchEventsForUser, fetchEventsForTrainer } from "../../api/events";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, role, logout } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const canEdit = user?.id === id || role === "admin";
  const isOwnProfile = user?.id === id && role !== "admin";

  useEffect(() => {
    if (id) {
      console.log('ProfilePage відкрито для user_id:', id);
    }
    // Дозволяємо тільки адміну або власнику
    if (role !== "admin" && user?.id !== id) {
      setProfileData(null);
      setLoading(false);
      return;
    }
    const loadProfile = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const isOwner = user?.id === id || role === "admin";
        if (!isOwner) return;

        // Спочатку спробуємо завантажити як тренера
        const trainer = await fetchTrainerById(id);
        if (trainer) {
          setIsTrainer(true);
          setProfileData(trainer);
          setFormData(trainer);
          const events = await fetchEventsForTrainer(id);
          setEvents(events);
          return;
        }

        // Якщо не тренер, то користувач
        const usr = await fetchUserById(id);
        if (usr) {
          setIsTrainer(false);
          setProfileData(usr);
          setFormData(usr);
          const events = await fetchEventsForUser(id);
          setEvents(events);
        }
      } catch (error) {
        console.error("Помилка при завантаженні профілю:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, user, role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      if (isTrainer) {
        await updateTrainerById(id, {
          contact: formData.contact,
          trainer_name: formData.trainer_name,
        });
      } else {
        await updateUserById(id, {
          user_name: formData.user_name,
          user_email: formData.user_email,
          user_main_contact: formData.user_main_contact,
          contact_type: formData.contact_type,
        });
      }
      setIsEditing(false);
      console.log(id);
      
      setProfileData(formData); // optimistic update
    } catch (err) {
      console.error("Помилка при збереженні:", err);
    }
  };

  const upcomingEvents = events
    .filter((e) => isAfter(new Date(e.start_time), new Date()))
    .sort(
      (a, b) =>
        new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
    );

  const pastEvents = events
    .filter((e) => !isAfter(new Date(e.start_time), new Date()))
    .sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    );

  const renderTable = (title: string, data: any[]) => (
    <div className={styles.tableSection}>
      <h3>{title}</h3>
      <table className={styles.scheduleTable}>
        <thead>
          <tr>
            <th>Час</th>
            <th>Користувач</th>
            <th>Тренер</th>
            <th>Тип заняття</th>
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((e) => (
              <tr key={e.id}>
                <td>
                  {format(parseISO(e.start_time), "dd.MM HH:mm", {
                    locale: uk,
                  })}
                </td>
                <td>{e.user_name}</td>
                <td>{e.trainer_name}</td>
                <td>{e.workout_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Немає записів</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.profilePage}>
        <p>Завантаження...</p>
      </div>
    );
  }

  if (!profileData && !loading) {
    return (
      <div className={styles.profilePage}>
        <p>У вас немає доступу до цього профілю.</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <h2>{isTrainer ? "Профіль тренера" : "Профіль користувача"}</h2>

      {canEdit && (
        <button 
          onClick={() => setIsEditing((prev) => !prev)}
          className={styles.editButton}
        >
          {isEditing ? "Скасувати" : "Редагувати"}
        </button>
      )}

      <div className={styles.profileInfo}>
        {isTrainer ? (
          <>
            <label>
              <strong>Ім'я:</strong>{" "}
              {isEditing ? (
                <input
                  name="trainer_name"
                  value={formData.trainer_name || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                profileData.trainer_name
              )}
            </label>
            <label>
              <strong>Контакт:</strong>{" "}
              {isEditing ? (
                <input
                  name="contact"
                  value={formData.contact || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                profileData.contact
              )}
            </label>
          </>
        ) : (
          <>
            <label>
              <strong>Ім'я:</strong>{" "}
              {isEditing ? (
                <input
                  name="user_name"
                  value={formData.user_name || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                profileData.user_name || profileData.full_name
              )}
            </label>
            <label>
              <strong>Email:</strong>{" "}
              {isEditing ? (
                <input
                  name="user_email"
                  value={formData.user_email || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                profileData.user_email
              )}
            </label>
            <label>
              <strong>Контакт:</strong>{" "}
              {isEditing ? (
                <input
                  name="user_main_contact"
                  value={formData.user_main_contact || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              ) : (
                profileData.user_main_contact
              )}
            </label>
            {/*
            <p>
              <strong>Підписка:</strong> {profileData.subscription_id || "—"}
            </p>
            <p>
              <strong>VIP:</strong> {profileData.is_vip ? "Так" : "Ні"}
            </p>
            <p>
              <strong>Тип абонементу:</strong> {profileData.abon_type || "—"}
            </p>
            */}
          </>
        )}
      </div>

      {isOwnProfile && (
        <button className={styles.logoutButton} onClick={logout}>
          Вийти
        </button>
      )}

      {isEditing && (
        <button className={styles.saveButton} onClick={handleSave}>
          Зберегти зміни
        </button>
      )}

      {renderTable("Майбутні заняття", upcomingEvents)}
      {renderTable("Минулі заняття", pastEvents)}
    </div>
  );
};

export default ProfilePage;
