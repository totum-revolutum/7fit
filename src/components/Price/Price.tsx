import styles from "./Price.module.scss";
import { PriceCard } from "@components/shared/PriceCard";
import { boxingPrices, emsPrices, fitnessPrices } from "@constants/price";
import { GiBoxingGlove } from "react-icons/gi";
import { FaDumbbell, FaHeartbeat } from "react-icons/fa";

const Price = () => {
  return (
    <section id="price" className={styles.priceSection}>
      <div className={styles.headline}>
        <div className={`${styles.headline__title} style-h1`}>
          Ціни тренувань
        </div>
      </div>
      <div className={styles.cards}>
        <PriceCard
          title="ДЗЮДО/БОКС"
          icon={<GiBoxingGlove size={32} />}
          prices={boxingPrices}
        />
        <PriceCard
          title="EMS"
          icon={<FaHeartbeat size={32} />}
          prices={emsPrices}
        />
        <PriceCard
          title="ФІТНЕС"
          icon={<FaDumbbell size={32} />}
          prices={fitnessPrices}
        />
      </div>
    </section>
  );
};

export default Price;

// import styles from "./Price.module.scss";

// export const Price = () => {
//   return (
//     <section>
//       <div className={styles.headline}>
//         <div className={`${styles.headline__title} style-h1`}>
//           Ціни тренувань
//         </div>
//         <div className={styles.headline__subtitle}></div>
//       </div>
//       <div className={styles.priceWrapper}>
//         <div className={styles.fitnes}></div>
//         <div className={styles.ems}></div>
//         <div className={styles.box}></div>
//       </div>
//     </section>
//   );
// };

// export default Price;
