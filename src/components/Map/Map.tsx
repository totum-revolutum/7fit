import styles from "./Map.module.scss";

export const Map = () => {
  return (
    <section id="Map" className={styles.mapSection}>
      <div className={styles.headline}>
        <div className={`${styles.headline__title} style-h1`}>Ми на карті</div>
        <div className={styles.headline__subtitle}></div>
      </div>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1508.9899097504747!2d30.51888381375355!3d50.50052342317652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d39536567fd7%3A0x30dc4c7e26b93c3a!2zU2V2ZW4gRml0IC0g0JXQnNChINCi0YDQtdC90YPQstCw0L3QvdGPINC90LAg0J7QsdC-0LvQvtC90ZY!5e0!3m2!1sru!2sru!4v1747055453766!5m2!1sru!2sru"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Map;
