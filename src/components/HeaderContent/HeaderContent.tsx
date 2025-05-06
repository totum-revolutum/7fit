import styles from "./HeaderContent.module.scss";
import Button from "../shared/Button/Button";
import { landingSubtitle } from "@constants/subtitleText";

const HeaderContent = () => (
  <div className={styles.landingText}>
    <div className="style-main_title">
      <span className={styles.highlight}>EMS:</span>
      <br />
      Виведи свої тренування на рівень
    </div>
    <div className={`${styles.landingText__subtitle} style_main_subtitle`}>
      {landingSubtitle.map((line, index) => (
        <div key={index} className={styles.landingText__subtitle__line}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="your-custom-class"
          >
            <path d="M13 2 L3 14 H12 L11 22 L21 10 H13 Z" />
          </svg>
          <span>{line}</span>
        </div>
      ))}
    </div>
    <Button textType="GET_STARTED" />
  </div>
);

export default HeaderContent;
