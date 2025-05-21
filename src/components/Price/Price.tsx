import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./Price.module.scss";
import { PriceCard } from "@components/shared/PriceCard";
import { boxingPrices, emsPrices, fitnessPrices } from "@constants/price";
import { GiBoxingGlove } from "react-icons/gi";
import { FaDumbbell, FaHeartbeat } from "react-icons/fa";

const cardData = [
  {
    title: "ДЗЮДО/БОКС",
    icon: <GiBoxingGlove size={32} />,
    prices: boxingPrices,
  },
  {
    title: "EMS",
    icon: <FaHeartbeat size={32} />,
    prices: emsPrices,
  },
  {
    title: "ФІТНЕС",
    icon: <FaDumbbell size={32} />,
    prices: fitnessPrices,
  },
];

const Price = () => {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSliderActive = windowWidth >= 850 && windowWidth < 1240;

  return (
    <section id="price" className={styles.priceSection}>
      <div className={styles.headline}>
        <div className={`${styles.headline__title} style-h1`}>
          Ціни тренувань
        </div>
      </div>
      {isSliderActive && (
        <div className={styles.navigation}>
          <div className={`${styles.navButton} ${styles.prev}`}></div>
          <div className={`${styles.navButton} ${styles.next}`}></div>
        </div>
      )}
      {isSliderActive ? (
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${styles.prev}`,
            nextEl: `.${styles.next}`,
          }}
          loop
          spaceBetween={24}
          slidesPerView={2}
          className={styles.cardsWrapper}
        >
          {cardData.map((card, idx) => (
            <SwiperSlide key={idx}>
              <PriceCard
                title={card.title}
                icon={card.icon}
                prices={card.prices}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.cards}>
          {cardData.map((card, idx) => (
            <PriceCard
              key={idx}
              title={card.title}
              icon={card.icon}
              prices={card.prices}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Price;

// import styles from "./Price.module.scss";
// import { PriceCard } from "@components/shared/PriceCard";
// import { boxingPrices, emsPrices, fitnessPrices } from "@constants/price";
// import { GiBoxingGlove } from "react-icons/gi";
// import { FaDumbbell, FaHeartbeat } from "react-icons/fa";

// const Price = () => {
//   return (
//     <section id="price" className={styles.priceSection}>
//       <div className={styles.headline}>
//         <div className={`${styles.headline__title} style-h1`}>
//           Ціни тренувань
//         </div>
//       </div>
//       <div className={styles.cards}>
//         <PriceCard
//           title="ДЗЮДО/БОКС"
//           icon={<GiBoxingGlove size={32} />}
//           prices={boxingPrices}
//         />
//         <PriceCard
//           title="EMS"
//           icon={<FaHeartbeat size={32} />}
//           prices={emsPrices}
//         />
//         <PriceCard
//           title="ФІТНЕС"
//           icon={<FaDumbbell size={32} />}
//           prices={fitnessPrices}
//         />
//       </div>
//     </section>
//   );
// };

// export default Price;

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
