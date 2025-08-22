import styles from "./AdminSetting.module.scss";
import { PricesAdmin } from "@pages/admin/PricesAdmin";

const AdminSetting = () => {
  return (
    <div className={styles.adminSetting}>
      <h2>Налаштування адміністратора</h2>
      <p>Тут будуть налаштування для адміністратора.</p>
      <PricesAdmin />
      {/* Інші компоненти адміністрування можна додати тут */}
    </div>
  );
};

export default AdminSetting;
