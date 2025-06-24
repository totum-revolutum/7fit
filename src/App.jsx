import { Layout } from "@/components/Layout";
import Home from "./pages/Home.tsx";
import { NotFound } from "./pages/NotFound";
import { Agreement } from "./pages/Agreement";
import { NavBar } from "@/components/NavBar";
import { LoginModal } from "@components/LoginModals";
import { AdminDashboard } from "@/components/AdminDashboard";
import { UserDashboard } from "@/components/UserDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useUIStore from "@/stores/uiStore";
import useAuthStore from "@stores/authStore";
import { useEffect } from "react";

function App() {
  const showLogin = useUIStore((state) => state.showLogin);
  const closeLogin = useUIStore((state) => state.closeLogin);
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
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]} onAuthFail={openLogin}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/user"
            element={
              <PrivateRoute allowedRoles={["user"]} onAuthFail={openLogin}>
                <UserDashboard />
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
