import styles from "./PriceCard.module.scss";
import type { PriceItem } from "@constants/price";

interface PriceCardProps {
  title: string;
  icon: React.ReactNode;
  prices: PriceItem[];
}

const PriceCard = ({ title, icon, prices }: PriceCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.prices}>
        {prices.map(({ name, price }) => (
          <div className={styles.priceRow} key={name}>
            <span className={styles.name}>{name}</span>
            <span className={styles.amount}>{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
