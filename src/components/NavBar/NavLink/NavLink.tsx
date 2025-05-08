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
      {/* {NAV_ITEMS.map((item) => (
        <a
          key={item.path}
          href={item.path}
          onClick={handleLinkClick}
          className={styles.nav__item}
        >
          {item.label}
        </a>
      ))} */}
      <ul className={styles.menu__list}>
        {NAV_ITEMS.map((item) => (
          <li className={styles.menu__item} key={item.path}>
            <a
              href={item.path}
              onClick={handleLinkClick}
              className={styles.nav__item}
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
