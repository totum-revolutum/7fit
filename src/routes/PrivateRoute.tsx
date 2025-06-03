import { Navigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { useEffect } from "react";

const PrivateRoute = ({
  children,
  allowedRoles,
  onAuthFail,
}: PrivateRouteProps) => {
  const { user, role, loading } = useAuthStore();
  console.log("user:", user, "role:", role, "loading:", loading);

  useEffect(() => {
    if (!user && onAuthFail) {
      onAuthFail();
    }
  }, [user, onAuthFail]);

  if (loading) return <div>Завантаження...</div>;
  if (!user) return null;
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
