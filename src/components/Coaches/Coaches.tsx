import styles from "./Coaches.module.scss";

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
          
        </div>
      </section>
    </>
  );
}

export default Coaches;
