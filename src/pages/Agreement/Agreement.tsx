import styles from "./Agreement.module.scss";

const Agreement = () => {
  return (
    <div className={styles.agreement}>
      <div className={styles.agreement__title}>Користувацька угода</div>
      <p>
        Ця угода визначає правила користування нашим сервісом. Використовуючи
        його, ви погоджуєтесь з усіма умовами.
      </p>
      <p>Основні положення:</p>
      <ul>
        <li>Ваші дані зберігаються відповідно до політики конфіденційності.</li>
        <li>Адміністрація може змінювати умови в будь-який момент.</li>
        <li>Порушення умов може призвести до блокування доступу.</li>
      </ul>
    </div>
  );
};

export default Agreement;
