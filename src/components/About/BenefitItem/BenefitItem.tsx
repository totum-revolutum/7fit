import styles from "./BenefitItem.module.scss";

interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => (
  <div className={styles.item}>
    <img src={icon} className={styles.icon} />
    <div className={styles.benefit}>
      <div className={`${styles.benefit__title} style-uppercase-text`}>
        {title}
      </div>
      <div className={`${styles.benefit__description} style-body-text`}>
        {description}
      </div>
    </div>
  </div>
);

export default BenefitItem;
