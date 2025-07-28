import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { Button } from "@components/shared/Button";
import { OPEN_MENU_CLASS } from "@constants/other";
import { NavLink } from "./NavLink";
import useUIStore from "../../stores/uiStore";
import useAuthStore from "../../stores/authStore";
import { RoutePath } from "@constants/navigation";

const NavBar = () => {
  const openLogin = useUIStore((state) => state.openLogin);
  const showLogin = useUIStore((state) => state.showLogin);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, logout } = useAuthStore();
  const isAuthenticated = false;
  const location = useLocation();
  const navigate = useNavigate();

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.classList.add(OPEN_MENU_CLASS);
    } else {
      document.body.classList.remove(OPEN_MENU_CLASS);
    }
  };

  const handleUserIconCLick = () => {
    console.log("тут відкривається особистий кабінет", user);
  };

  const handleLoginClick = () => {
    console.log("Відкриваємо модалку...");
    openLogin();
    console.log("Після виклику openLogin");
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/admin";
    if (role === "user" || role === "trainer") return "/user";
    return "/404";
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    // Якщо ми на головній сторінці - скролимо на початок
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Якщо ми не на головній сторінці - переходимо туди
    // (стандартна поведінка Link залишається)
  };

  return (
    <section className={styles.hero}>
      <Link to={RoutePath.HOME} onClick={handleLogoClick}>
        <img
          src="/images/logo/logo125.svg"
          alt="SevenFit"
          className={styles.hero__logo}
        />
      </Link>

      <NavLink isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={styles.hero__auth}>
        {!user && <Button textType="LOG_IN" onClick={handleLoginClick} />}
        {user && (
          <Link to={getDashboardPath()}>
            <button
              onClick={handleUserIconCLick}
              className={styles.toProfileBtn}
            >
              <img
                className={styles.toProfileBtn__icon}
                src="/icon/user.svg"
                alt="User"
              />
            </button>
          </Link>
        )}

        <div
          className={`${styles.iconButton} ${styles.burger}`}
          onClick={toggleBurgerMenu}
        >
          <img
            src={isMenuOpen ? "/icon/x.svg" : "/icon/menu.svg"}
            alt="Burger icon"
          />
        </div>
      </div>
      <div className={styles.hero__bg} />
    </section>
  );
};

export default NavBar;
