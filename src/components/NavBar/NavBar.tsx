import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { Button } from "@components/shared/Button";
import { OPEN_MENU_CLASS } from "@constants/other";
import { NavLink } from "./NavLink";
import useUIStore from "@/stores/uiStore";
import useAuthStore from "@/stores/authStore";
import { RoutePath } from "@constants/navigation";

const NavBar = () => {
  const openLogin = useUIStore((state) => state.openLogin);
  const showLogin = useUIStore((state) => state.showLogin);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();
  console.log("user", user);
  const isAuthenticated = false;

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.classList.add(OPEN_MENU_CLASS);
    } else {
      document.body.classList.remove(OPEN_MENU_CLASS);
    }
  };

  const handleUserIconCLick = () => {
    console.log("тут відкривається особистий кабінет");
  };

  const handleLoginClick = () => {
    console.log("Відкриваємо модалку...");
    openLogin();
    console.log("Після виклику openLogin");
  };

  return (
    <section className={styles.hero}>
      <Link to={RoutePath.HOME}>
        <img
          src="/images/logo/logo125.svg"
          alt="SevenFit"
          className={styles.hero__logo}
        />
      </Link>

      <NavLink isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={styles.hero__auth}>
        {/* <button onClick={handleUserIconCLick}>
          <img className={styles.iconButton} src="/icon/user.svg" alt="User" />
          {isAuthenticated && <span className={styles.username}>ololo</span>}
        </button> */}

        {/* {!isAuthenticated && <Button textType="LOG_IN" onClick={openLogin} />} */}
        <Button textType="LOG_IN" onClick={handleLoginClick} />

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
