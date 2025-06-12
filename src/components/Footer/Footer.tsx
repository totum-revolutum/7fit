import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import { CONTACTS, SOCIAL_LINKS } from "@constants/footer";

export const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={`${styles.footer__section} ${styles.logoSection}`}>
          <Link to="/" className={styles.footer__logo}>
            <img
              alt="Логотип"
              src="/images/logo/logo124.svg"
              className={styles.footer__img}
            />
          </Link>

          <div className={styles.footer__desc}>
            Твій шлях до ідеального тіла з технологією
            <span className={styles.highlight}> EMS</span>
          </div>

          <div className={styles.footer__socials}>
            {SOCIAL_LINKS.map((social, index) => (
              <a href={social.href} key={index} target="_blank">
                <img
                  src={social.icon}
                  alt={social.name}
                  className={styles.footer__socials__link}
                />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.footer__section}>
          <ul className={styles.footer__section__info}>
            {CONTACTS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.footer__section} ${styles.map}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1508.9899097504747!2d30.51888381375355!3d50.50052342317652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4d39536567fd7%3A0x30dc4c7e26b93c3a!2zU2V2ZW4gRml0IC0g0JXQnNChINCi0YDQtdC90YPQstCw0L3QvdGPINC90LAg0J7QsdC-0LvQvtC90ZY!5e0!3m2!1suk!2suk!4v1747055453766!5m2!1suk!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className={styles.footer__allRight}>
        <p>© 2025 Sevenfit EMS. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
