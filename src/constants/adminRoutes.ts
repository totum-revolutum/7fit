export enum AdminRouteKey {
  Users = "users",
  Trainers = "trainers",
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
  { key: AdminRouteKey.Schedule, label: "Розклад", path: "/admin" },
  {
    key: AdminRouteKey.Users,
    label: "Відвідувачі",
    path: "/admin/users",
  },
  {
    key: AdminRouteKey.Trainers,
    label: "Тренери",
    path: "/admin/trainers",
  },
  // { key: AdminRouteKey.Bookings, label: "Записи", path: "/admin/bookings" },
  // { key: AdminRouteKey.Stats, label: "Статистика", path: "/admin/stats" },
  {
    key: AdminRouteKey.Settings,
    label: "Налаштування",
    path: "/admin/settings",
  },
];
