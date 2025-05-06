import { FC } from "react";
import styles from "./BenefitItem.module.scss";
import {
  Zap,
  Flame,
  Timer,
  UserCheck
} from "lucide-react";

interface BenefitItemProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const BenefitItem: FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <h4 className={styles.title}>{title}</h4>
      {aboutText.map((item, index) => (
              <div key={index} className={styles.description}>
                {item}
              </div>
            ))}
      
    </div>
  );
};

export default BenefitItem;
