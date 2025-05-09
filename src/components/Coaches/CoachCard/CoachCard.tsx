import styles from "./CoachCard.module.scss";

interface Coach {
  src: string;
  alt: string;
  name: string;
  info: string;
}

interface CoachModalProps {
  coach: Coach;
  onClose: () => void;
}

const CoachCard = ({ coach, onClose }: CoachModalProps) => {
  const handleBackdropClick = () => onClose();
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <img src={coach.src} alt={coach.alt} className={styles.modal__img} />
        <h2 className={`${styles.coach__name} style-uppercase-text`}>
          {coach.name}
        </h2>
        <p className={`${styles.coach__name} .style-body-text`}>{coach.info}</p>
        <button onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default CoachCard;
