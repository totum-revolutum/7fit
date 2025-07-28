import styles from "./NavLink.module.scss";
import cn from "classnames";
import { NAV_ITEMS } from "@constants/navigation";
import { useLocation, useNavigate } from "react-router-dom";

type NavMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

const NavLink = ({ isMenuOpen, setIsMenuOpen }: NavMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    
    // Якщо це хеш-посилання (наприклад, #about, #price)
    if (path.startsWith('#')) {
      const sectionId = path.substring(1); // Видаляємо #
      
      // Якщо це "home" - скролимо на початок сторінки
      if (sectionId === 'home') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/', { state: { scrollTo: 'home' } });
        }
        return;
      }
      
      // Якщо ми вже на головній сторінці
      if (location.pathname === '/') {
        // Скролимо до секції
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Переходимо на головну сторінку і скролимо до секції
        navigate('/', { state: { scrollTo: sectionId } });
      }
    } else {
      // Звичайна навігація
      navigate(path);
    }
  };

  return (
    <nav className={cn(styles.nav, { [styles.menu__open]: isMenuOpen })}>
      <ul className={styles.menu__list}>
        {NAV_ITEMS.map((item) => (
          <li className={`${styles.menu__item} style-nav`} key={item.path}>
            <div
              onClick={() => handleLinkClick(item.path)}
              className={styles.menu__link}
            >
              {item.label}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLink;
