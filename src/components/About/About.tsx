import { aboutBenefits } from "@constants/about";
import styles from "./About.module.scss";
import AboutSlider from "./AboutSlider/AboutSlider";
import { BenefitItem } from "./BenefitItem";

const About = () => (
  <section id="about" className={styles.aboutSection}>
    <div className={styles.headline}>
      <div className={`${styles.headline__title} style-h1`}>
        Переваги <span className={styles.highlight}>EMS:</span> тренувань
      </div>
      <div className={styles.headline__subtitle}></div>
    </div>
    <div className={styles.info}>
      <div className={styles.info__benefits}>
        {aboutBenefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
        {/* {aboutText.map((item, index) => (
          <div key={index} className={styles.info__benefits__item}>
            {item}
          </div>
        ))} */}
      </div>
      <div className={styles.info__slider}>
        <AboutSlider />
      </div>{" "}
    </div>
  </section>
);

export default About;

// <>
// <div className={styles.about}>
//   <div className={styles.headline}>
//   <div className={styles.headline__title}>Переваги EMS тренувань</div>
//   <div className={styles.headline__subtitle}></div>
// </div>
// <div className=""></div>
// </div>
// </>;

// import React from "react";
// import "./AboutSection.css"; // або .scss, залежно від того, що ти використовуєш

// export default function AboutSection() {
//   return (
//     <section className="about-section">
//       <div className="about-container">
//         {/* Що таке EMS */}
//         <div className="about-intro">
//           <h2>
//             ЩО ТАКЕ <span className="highlight">EMS-ТРЕНУВАННЯ?</span>
//           </h2>
//           <h3>ЦЕ НОВЕ НАПРЯМЛЕННЯ У ФІТНЕСІ!</h3>
//           <p>
//             Тренування проходить у спеціальному костюмі, який оснащений електродами.
//             Через них посилаються низькочастотні електричні імпульси, які викликають
//             мікроскорочення м’язів.
//           </p>
//         </div>

//         {/* Переваги */}
//         <div className="about-benefits">
//           <div className="benefit">
//             <h4>1. ГАРНЕ ТІЛО ТА ВІДМІННЕ САМОПОЧУТТЯ</h4>
//             <p>
//               Тренування спалює калорії та підвищує тонус м’язів. Зміцнює тіло та
//               скульптурує його. Покращує стан та якість шкіри.
//             </p>
//           </div>

//           <div className="benefit">
//             <h4>2. ЕКОНОМІЯ ЧАСУ</h4>
//             <p>
//               Лише 20–30хв тренувань в EMS-костюмі замінює 2 години виснажливих
//               тренувань у залі. За тренування пропрацьовується 90% всіх м’язів та
//               одночасно працює до 20 груп м’язів.
//             </p>
//           </div>

//           <div className="benefit">
//             <h4>3. ОСОБИСТИЙ ТРЕНЕР</h4>
//             <p>
//               Всі тренування проходять під наглядом персонального тренера
//               за індивідуально підібраною програмою до ваших фітнес-цілей.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
