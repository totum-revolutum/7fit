import styles from "./Coaches.module.scss";
import { coaches } from "@constants/coaches";

function Coaches() {
  return (
    <>
      <section className={styles.coachesSection}>
        <div className={styles.headline}>
          <div className={`${styles.headline__title} style-h1`}>
            Наші тренери
          </div>
          <div className={styles.headline__subtitle}></div>
        </div>
        <div className={styles.coach}>
          {coaches.map((coach, index) => (
            <img src={coach.src} key={index} alt={coach.alt} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Coaches;
