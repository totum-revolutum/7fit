import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./Price.module.scss";
import { PriceCard } from "@components/shared/PriceCard";
import { GiBoxingGlove } from "react-icons/gi";
import { FaDumbbell, FaHeartbeat } from "react-icons/fa";
import { usePricesStore } from "@stores/pricesStore";

const categoryIcons: Record<string, JSX.Element> = {
  "ДЗЮДО/БОКС": <GiBoxingGlove size={32} />,
  "EMS": <FaHeartbeat size={32} />,
  "EMS-massage": <FaDumbbell size={32} />,
};

const Price = () => {
  const { prices, fetchPrices } = usePricesStore();
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSliderActive = windowWidth >= 850 && windowWidth < 1240;

  // групування по категоріям
  const grouped = prices.reduce<Record<string, typeof prices>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // сортування всередині категорії
  const sortedCategories = Object.entries(grouped).map(([category, items]) => {
    const sorted = [...items].sort((a, b) => {
      if (a.name.includes("Пробне")) return -1;
      if (b.name.includes("Пробне")) return 1;
      const numA = parseInt(a.name);
      const numB = parseInt(b.name);
      return (numA || 0) - (numB || 0);
    });
    return { category, prices: sorted };
  });

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
          {sortedCategories.map(({ category, prices }) => (
            <SwiperSlide key={category}>
              <PriceCard
                title={category}
                icon={categoryIcons[category]}
                prices={prices}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.cards}>
          {sortedCategories.map(({ category, prices }) => (
            <PriceCard
              key={category}
              title={category}
              icon={categoryIcons[category]}
              prices={prices}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Price;
