import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { images } from "@constants/about";
import "../AboutSlider/AboutSlider.scss";

import { useImageStore } from "@/stores/imageStore";

const AboutSlider = () => {
  const { ems, fetchEmsImg } = useImageStore();

  useEffect(() => {
    fetchEmsImg();
  }, []);
  return (
    <div className="sliderWrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        cssMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        className="swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img.src} alt={img.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutSlider;
