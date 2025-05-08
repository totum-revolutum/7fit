import { useState } from "react";
import styles from "./NavBar.module.scss";
import { Button } from "@components/shared/Button";
import { OPEN_MENU_CLASS } from "@constants/other";
import { NavLink } from "./NavLink";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.classList.add(OPEN_MENU_CLASS);
    } else {
      document.body.classList.remove(OPEN_MENU_CLASS);
    }
  };

  return (
    <section className={styles.hero}>
      <img
        src="/images/logo/logo125.svg"
        alt="SevenFit"
        className={styles.hero__logo}
      />

      <NavLink isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className={styles.hero__auth}>
        {/* <button onClick={handleUserIconCLick} className={styles.theme_toggle}> */}
        <img className={styles.user__icon} src="/icon/user.svg" alt="User" />
        {/* </button> */}
        <Button textType="LOG_IN" />

        <div className={styles.burger__icon} onClick={toggleMenu}>
          <img
            src={isMenuOpen ? "/icon/x.svg" : "/icon/menu.svg"}
            alt="Burger icon"
          />
        </div>
      </div>
    </section>
  );
};

export default NavBar;
