import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <h1>404</h1>
      <p>Сторінку не знайдено</p>
      <Link to="/">Повернутись на головну</Link>
    </div>
  );
};

export default NotFound;
