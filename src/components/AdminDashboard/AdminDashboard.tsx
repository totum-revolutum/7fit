import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.scss";
import { AdminSidebar } from "@components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className={styles.admin}>
      <div className={`${styles.headline__title} style-h1`}>Sevenfit Admin</div>
      <div className={styles.dashboardWrapper}>
        <AdminSidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
