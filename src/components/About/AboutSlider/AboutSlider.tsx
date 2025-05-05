import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { images } from "@constants/about";
import styles from "./AboutSlider.module.scss";

const AboutSlider = () => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        loop={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={30}
        modules={[Navigation]}
        navigation
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutSlider;
