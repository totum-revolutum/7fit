import styles from "./HeaderContent.module.scss";
import Button from "../shared/Button/Button";

function HeaderContent() {
  return (
    <>
      <div className={styles.landingText}>
        <div className="ssss">
          Твій <span className={styles.highlight}>EMS-фітнес</span> — новий
          рівень тренувань
        </div>
        {/* <div className="ssss">
          <span className={styles.highlight}>EMS:</span>
          <br />
          Новий рівень фітнесу
        </div> */}
        <p className={`${styles.landingText__subtitle} style-h4`}>
          Безпечні й ефективні тренування з електроміостимуляцією. Максимальний
          результат за мінімум часу.
        </p>
        <Button textType="GET_STARTED" />
      </div>
    </>
  );
}

export default HeaderContent;
