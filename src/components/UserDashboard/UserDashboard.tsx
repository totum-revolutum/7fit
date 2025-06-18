import useAuthStore from "@stores/authStore";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { logout, role } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <>
      <div>ololo</div>
      <div>sss</div>
      <button onClick={handleLogout}>Вийти</button>
    </>
  );
};
export default UserDashboard;
