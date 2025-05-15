import styles from "./Footer.module.scss";
import {
  CONTACTS,
  NAVIGATION_LINKS,
  CLIENT_LINKS,
  SOCIAL_LINKS,
} from "../../constants/footer";

export const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__section}>
          <a href="/" className={styles.footer__logo}>
            Sevenfit EMS
          </a>
          <p className={styles.footer__desc}>
            Твій шлях до ідеального тіла з технологією EMS
          </p>
        </div>

        <div className={styles.footer__section}>
          <h4>Контакти</h4>
          <ul>
            {CONTACTS.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__section}>
          <h4>Навігація</h4>
          <ul>
            {NAVIGATION_LINKS.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__section}>
          <h4>Клієнтам</h4>
          <ul>
            {CLIENT_LINKS.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer__section}>
          <h4>Ми в соцмережах</h4>
          <div className={styles.footer__socials}>
            {SOCIAL_LINKS.map((social, index) => (
              <a href={social.href} key={index} target="_blank">
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <p>© 2025 Sevenfit EMS. Всі права захищені.</p>
      </div>
    </footer>
  );
};

export default Footer;
