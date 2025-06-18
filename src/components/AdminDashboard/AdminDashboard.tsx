import { useEffect } from "react";
import styles from "./AdminDashboard.module.scss";
import useAuthStore from "@stores/authStore";
import { AdminSidebar } from "@components/AdminSidebar";

const AdminDashboard = () => {
  const { user, getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className={styles.admin}>
      <div className={`${styles.headline__title} style-h1`}>Sevenfit Admin</div>
      <div className={styles.dashboardWrapper}>
        <AdminSidebar />

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h1>Панель керування</h1>
            <div className={styles.userInfo}>{user?.email}</div>
          </header>

          <section className={styles.overview}>
            <div className={styles.card}>
              Активні користувачі: <strong>128</strong>
            </div>
            <div className={styles.card}>
              Сеансів цього тижня: <strong>254</strong>
            </div>
            <div className={styles.card}>
              Нових записів: <strong>37</strong>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Останні записи</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ім’я</th>
                  <th>Дата</th>
                  <th>Час</th>
                  <th>Тренер</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Іван Петренко</td>
                  <td>2025-05-30</td>
                  <td>10:00</td>
                  <td>Марія</td>
                </tr>
                <tr>
                  <td>Олена Сидорова</td>
                  <td>2025-05-30</td>
                  <td>11:00</td>
                  <td>Ігор</td>
                </tr>
                <tr>
                  <td>Павло Романюк</td>
                  <td>2025-05-30</td>
                  <td>12:00</td>
                  <td>Анна</td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
