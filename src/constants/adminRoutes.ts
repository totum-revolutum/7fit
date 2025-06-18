export enum AdminRouteKey {
  Users = "users",
  Schedule = "schedule",
  Bookings = "bookings",
  Stats = "stats",
  Settings = "settings",
}

export const ADMIN_MENU_ITEMS: {
  key: AdminRouteKey;
  label: string;
  path: string;
}[] = [
  { key: AdminRouteKey.Users, label: "Користувачі", path: "/admin/users" },
  { key: AdminRouteKey.Schedule, label: "Розклад", path: "/admin/schedule" },
  { key: AdminRouteKey.Bookings, label: "Записи", path: "/admin/bookings" },
  { key: AdminRouteKey.Stats, label: "Статистика", path: "/admin/stats" },
  {
    key: AdminRouteKey.Settings,
    label: "Налаштування",
    path: "/admin/settings",
  },
];
