import { Header } from "../components/Header";
import { About } from "../components/About";
import { Programs } from "../components/Programs";
import { Coaches } from "../components/Coaches";
import { Banner } from "../components/Banner";
import { Price } from "../components/Price";
import { Feedback } from "../components/Feedback";
import { Footer } from "../components/Footer";
import { Schedule } from "../components/Schedule";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Перевіряємо, чи є параметр scrollTo в state
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      
      // Невелика затримка, щоб сторінка встигла завантажитися
      setTimeout(() => {
        if (sectionId === 'home') {
          // Скролимо на початок сторінки
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Скролимо до конкретної секції
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
      
      // Очищаємо state, щоб не скролити при кожному рендері
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <About />
      <Programs />
      <Coaches />
      <Schedule />
      <Banner />
      <Price />
      <Feedback />
      <Footer />
    </>
  );
}

export default Home;
