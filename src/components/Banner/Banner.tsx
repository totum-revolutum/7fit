import styles from "./Banner.module.scss";

export const Banner = () => {
  return (
    <section className={styles.bannerSection}>
      <img src="/neon/logo.png" alt="neon" className={styles.subimg} />
      <img src="/images/justfoto.png" alt="Banner" className={styles.banner} />
    </section>
  );
};

export default Banner;
