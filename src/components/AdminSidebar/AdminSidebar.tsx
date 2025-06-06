import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_MENU_ITEMS } from "@/constants/adminRoutes";
import useAuthStore from "@stores/authStore";

const AdminSidebar = () => {
  const { logout, role } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (role !== "admin") return null; // 🔒 Базова перевірка

  return (
    <aside>
      <nav>
        <ul>
          {ADMIN_MENU_ITEMS.map((item) => (
            <li key={item.key}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          ))}
          <li>
            <button onClick={handleLogout}>Вийти</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
