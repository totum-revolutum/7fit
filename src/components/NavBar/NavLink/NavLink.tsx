import styles from "./NavLink.module.scss";
import cn from "classnames";
import { NAV_ITEMS } from "@constants/navigation";

type NavMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

const NavLink = ({ isMenuOpen, setIsMenuOpen }: NavMenuProps) => {
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav className={cn(styles.nav, { [styles.menu__open]: isMenuOpen })}>
      <ul className={styles.menu__list}>
        {NAV_ITEMS.map((item) => (
          <li className={`${styles.menu__item} style-nav`} key={item.path}>
            <a
              href={item.path}
              onClick={handleLinkClick}
              className={styles.menu__link}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLink;
