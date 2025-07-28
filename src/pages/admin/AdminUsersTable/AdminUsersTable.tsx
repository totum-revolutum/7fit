import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import styles from "./AdminUsersTable.module.scss";
import { fetchAllUsers, User } from "../../../api/user";

const AdminUsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (err) {
        console.error("Помилка при завантаженні користувачів:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      user.user_name?.toLowerCase().includes(query) ||
      user.user_email?.toLowerCase().includes(query) ||
      user.full_name?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className={styles.adminUsersTable}>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminUsersTable}>
      <h2>Відвідувачі</h2>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Пошук за ім'ям або email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Відвідувач</th>
            <th>Email</th>
            <th>Контакт</th>
            <th>Дата реєстрації</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.user_id}>
                <td>
                  <Link 
                    to={`/profile/${user.user_id}`}
                    className={styles.userLink}
                  >
                    {user.user_name || user.full_name || "Без імені"}
                  </Link>
                </td>
                <td>{user.user_email || "—"}</td>
                <td>{user.user_main_contact || "—"}</td>
                <td>
                  {user.created_at ? 
                    format(new Date(user.created_at), "dd.MM.yyyy", {
                      locale: uk,
                    }) : "—"
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className={styles.emptyRow}>
                {searchQuery ? "Відвідувачів не знайдено" : "Немає відвідувачів"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;
