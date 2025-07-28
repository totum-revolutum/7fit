import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import styles from "./AdminTrainersTable.module.scss";
import { fetchAllTrainers, Trainer } from "../../../api/user";

const AdminTrainersTable = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        setLoading(true);
        const trainersData = await fetchAllTrainers();
        setTrainers(trainersData);
      } catch (err) {
        console.error("Помилка при завантаженні тренерів:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  const filteredTrainers = trainers.filter((trainer) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      trainer.trainer_name?.toLowerCase().includes(query) ||
      trainer.contact?.toLowerCase().includes(query) ||
      trainer.trainerRank?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className={styles.adminTrainersTable}>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminTrainersTable}>
      <h2>Тренери</h2>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Пошук за ім'ям або контактом..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Контакт</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
              <tr key={trainer.trainer_id}>
                <td>
                  <Link 
                    to={`/profile/${trainer.trainer_id}`}
                    className={styles.trainerLink}
                  >
                    {trainer.trainer_name || "Без імені"}
                  </Link>
                </td>
                <td>{trainer.contact || "—"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className={styles.emptyRow}>
                {searchQuery ? "Тренерів не знайдено" : "Немає тренерів"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTrainersTable; 