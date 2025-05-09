import { useState } from "react";
import styles from "./Coaches.module.scss";
import { coaches } from "@constants/coaches";
import { CoachCard } from "./CoachCard";

interface Coach {
  src: string;
  alt: string;
  name: string;
  info: string;
}

const Coaches = () => {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  return (
    <>
      <section id="coaches" className={styles.coachesSection}>
        <div className={styles.headline}>
          <div className={`${styles.headline__title} style-h1`}>
            Наші тренери
          </div>
          <div className={styles.headline__subtitle}></div>
        </div>
        <div className={styles.coaches}>
          {coaches.map((coach, index) => (
            <div className={styles.coach}>
              <img
                src={coach.src}
                key={index}
                alt={coach.alt}
                className={styles.coach__img}
              />

              <button
                onClick={() => setSelectedCoach(coach)}
                className={`${styles.coach__name} style-uppercase-text`}
              >
                {coach.name}
              </button>
            </div>
          ))}
        </div>
      </section>
      {selectedCoach && (
        <CoachCard
          coach={selectedCoach}
          onClose={() => setSelectedCoach(null)}
        />
      )}
    </>
  );
};

export default Coaches;
