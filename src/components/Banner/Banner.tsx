import styles from "./Banner.module.scss";

export const Banner = () => {
  <section>
    <div className={styles.headline}>
      <div className={`${styles.headline__title} style-h1`}>
        Розклад тренувань
      </div>
      <div className={styles.headline__subtitle}></div>
    </div>
  </section>;
};

export default Banner;
