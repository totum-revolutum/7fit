import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/pages/admin/AdminLayout";

const UsersPage = lazy(() => import("@/pages/admin/UsersPage"));
const SchedulePage = lazy(() => import("@/pages/admin/SchedulePage"));
const BookingsPage = lazy(() => import("@/pages/admin/BookingsPage"));
const StatsPage = lazy(() => import("@/pages/admin/StatsPage"));
const SettingsPage = lazy(() => import("@/pages/admin/SettingsPage"));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
