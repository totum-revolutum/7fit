import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import AdminSetting from "../pages/admin/AdminSetting/AdminSetting";
// import AdminUsersTable from "../pages/admin/AdminUsersTable/AdminUsersTable";
// import AdminScheduleTable from "../pages/admin/AdminScheduleTable/AdminScheduleTable";
import { AdminDashboard } from "../components/AdminDashboard";

// const AdminDashboard = lazy(() => import("@/components/AdminDashboard"));

const AdminScheduleTable = lazy(
  () => import("../pages/admin/AdminScheduleTable/AdminScheduleTable")
);
const AdminSetting = lazy(
  () => import("../pages/admin/AdminSetting/AdminSetting")
);
const AdminUsersTable = lazy(
  () => import("../pages/admin/AdminUsersTable/AdminUsersTable")
);
const AdminTrainersTable = lazy(
  () => import("../pages/admin/AdminTrainersTable/AdminTrainersTable")
);

export default function AdminRoutes() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Routes>
        <Route path="" element={<AdminDashboard />}>
          <Route index element={<AdminScheduleTable />} />
          <Route path="users" element={<AdminUsersTable />} />
          <Route path="trainers" element={<AdminTrainersTable />} />
          <Route path="settings" element={<AdminSetting />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
