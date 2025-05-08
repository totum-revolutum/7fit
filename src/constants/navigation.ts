// тип
export interface NavItem {
  label: string;
  path: string;
}

// enum — для повторного використання path'ів
export enum RoutePath {
  HOME = "/",
  WHY_US = "/why-us",
  COACHES = "/coaches",
  SCHEDULE = "/schedule",
  PRICING = "/pricing",
  CONTACT = "/contact",
}

// масив для рендера
export const NAV_ITEMS: NavItem[] = [
  { label: "Головна", path: "#home" },
  { label: "Чому ми?", path: "#about" },
  { label: "Тренери", path: "#coaches" },
  { label: "Розклад", path: "#1" },
  { label: "Ціни", path: "#2" },
  { label: "Контакти", path: "#3" },
];
