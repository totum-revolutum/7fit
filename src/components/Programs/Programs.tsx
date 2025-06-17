import styles from "./Programs.module.scss";

export const Programs = () => {
  return (
    <section className={styles.programs}>
      <div className={`${styles.programs__title} style-h2`}>
        Реабілітація та спортивна підготовка
      </div>
      <div className={styles.programs__section}>
        {/* велика картка зліва */}
        <div
          className={`${styles.programs__card} ${styles["programs__card--athletes"]}`}
        >
          <div className={styles["programs__card-content"]}>
            <div className={styles["programs__card-title"]}>
              Для спортсменів
            </div>
            <div className={styles["programs__card-desc"]}>
              • покращення фізичної форми
              <br />
              • зниження відсотка жиру
              <br />
              • розвиток спортивних навичок і вмінь
              <br />
              • покращення результатів у змаганнях
              <br />• збільшення шансів на професійну кар'єру в спорті
            </div>
          </div>
        </div>

        {/* 2 картки в колонці справа */}
        <div className={styles.programs__column}>
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
              <div className={styles["programs__card-title"]}>
                Після пологів
              </div>
              <div className={styles["programs__card-desc"]}>
                Повернення до активності, відновлення організму
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.programs__title} style-h2`}>
        Програми тренувань
      </div>
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
