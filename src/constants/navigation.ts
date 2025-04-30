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
  { label: "Головна", path: RoutePath.HOME },
  { label: "Чому ми?", path: RoutePath.WHY_US },
  { label: "Тренери", path: RoutePath.COACHES },
  { label: "Розклад", path: RoutePath.SCHEDULE },
  { label: "Ціни", path: RoutePath.PRICING },
  { label: "Контакти", path: RoutePath.CONTACT },
];
