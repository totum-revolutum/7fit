import { Button } from "@components/shared/Button";
import styles from "./NavBar.module.scss";
import { NAV_ITEMS } from "@constants/navigation";

const NavBar = () => {
  return (
    <section className={styles.hero}>
      <img
        src="/images/logo/logo125.svg"
        alt="SevenFit"
        className={styles["hero__logo"]}
      />
      <nav>
        <ul className={styles["hero__nav"]}>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <a href={item.path}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Button textType="LOG_IN" />
    </section>
  );
};

export default NavBar;

{
  /* <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">
          Твій <span className="highlight">EMS-фітнес</span> — новий рівень
          тренувань
        </h1>
        <p className="hero__subtitle">
          Безпечні й ефективні тренування з електроміостимуляцією. Максимальний
          результат за мінімум часу.
        </p>
        <a href="#pricing" className="hero__cta">
          Записатися на перше заняття
        </a>
      </div> */
}
