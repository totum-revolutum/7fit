import { aboutBenefits } from "@constants/about";
import styles from "./About.module.scss";
import AboutSlider from "./AboutSlider/AboutSlider";
import { BenefitItem } from "./BenefitItem";

const About = () => (
  <section id="about" className={styles.aboutSection}>
    <div className={styles.headline}>
      <div className={`${styles.headline__title} style-h1`}>
        Переваги <span className={styles.highlight}>EMS:</span> тренувань
      </div>
      <div className={styles.headline__subtitle}></div>
    </div>
    <div className={styles.info}>
      <div className={styles.info__benefits}>
        {aboutBenefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
        {/* {aboutText.map((item, index) => (
          <div key={index} className={styles.info__benefits__item}>
            {item}
          </div>
        ))} */}
      </div>
      <div className={styles.info__slider}>
        <AboutSlider />
      </div>{" "}
    </div>
  </section>
);

export default About;