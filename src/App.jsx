import { Layout } from "@/components/Layout";
import Home from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound";
import { Agreement } from "./pages/Agreement";
import { NavBar } from "@/components/NavBar";
import { LoginModal } from "@components/LoginModals";
import AdminRoutes from "./routes/AdminRoutes";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ProfilePage } from "./pages/profile";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useUIStore from "@/stores/uiStore";
import useAuthStore from "@stores/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserRedirect() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.id) {
      navigate(`/profile/${user.id}`, { replace: true });
    }
  }, [user, navigate]);
  return null;
}

function App() {
  const showLogin = useUIStore((state) => state.showLogin);
  const openLogin = useUIStore((state) => state.openLogin);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  useEffect(() => {
    getCurrentUser();
  }, []);
  console.log("Стан showLogin:", showLogin);

  return (
    <Router>
      <Layout>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute allowedRoles={["admin"]} onAuthFail={openLogin}>
                <AdminRoutes /> {/* Вставляємо роутер з Outlet-структурою */}
              </PrivateRoute>
            }
          />

          <Route
            path="/user"
            element={
              <PrivateRoute
                allowedRoles={["user", "trainer"]}
                onAuthFail={openLogin}
              >
                <UserRedirect />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <PrivateRoute
                allowedRoles={["admin", "user", "trainer"]}
                onAuthFail={openLogin}
              >
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route path="/agreement" element={<Agreement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {showLogin && <LoginModal />}
      </Layout>
    </Router>
  );
}

export default App;
