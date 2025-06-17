import styles from "./Programs.module.scss";

export const Programs = () => {
  return (
    <section className={styles.programs}>
      <h2 className={styles.programs__title}>
        Реабілітація та спортивна підготовка
      </h2>
      <div className={styles.programs__section}>
        <div
          className={`${styles.programs__card} ${styles["programs__card--athletes"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>
              Для спортсменів
            </div>
            <div className={styles["programs__card-desc"]}>
              • зниження відсотка жиру <br />• покращення результатів у
              змаганнях
            </div>
          </div>
        </div>

        <div
          className={`${styles.programs__card} ${styles["programs__card--injury"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>Після травм</div>
            <div className={styles["programs__card-desc"]}>
              Відновлення та профілактика
            </div>
          </div>
        </div>

        <div
          className={`${styles.programs__card} ${styles["programs__card--postpartum"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>Після пологів</div>
            <div className={styles["programs__card-desc"]}>
              Повернення до активності, відновлення організму
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.programs__title}>Програми тренувань</h2>
      <div className={styles.programs__section}>
        <div
          className={`${styles.programs__card} ${styles["programs__card--fitness"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>Фітнес</div>
            <div className={styles["programs__card-desc"]}>
              Тонус, витривалість, енергія
            </div>
          </div>
        </div>

        <div
          className={`${styles.programs__card} ${styles["programs__card--boxing"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>Бокс та дзюдо</div>
            <div className={styles["programs__card-desc"]}>
              Сила, витривалість, впевненість
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
