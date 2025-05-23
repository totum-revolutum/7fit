import { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
