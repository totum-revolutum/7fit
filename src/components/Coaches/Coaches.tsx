import styles from "./Coaches.module.scss";
import { coaches } from "@constants/coaches";

const Coaches = () => (
  <section className={styles.coachesSection}>
    <div className={styles.headline}>
      <div className={`${styles.headline__title} style-h1`}>Наші тренери</div>
      <div className={styles.headline__subtitle}></div>
    </div>
    <div className={styles.coaches}>
      {coaches.map((coach, index) => (
        <img src={coach.src} key={index} alt={coach.alt} className={styles.coach} />
      ))}
    </div>
  </section>
);

export default Coaches;
