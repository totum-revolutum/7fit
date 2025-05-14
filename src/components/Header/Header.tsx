import style from "./Header.module.scss";
import { HeaderContent } from "@components/HeaderContent";

const Header = () => (
  <>
    <div className={style.header}>
      <div className={style.bg} />

      {/* <img src="/elements/106.png" alt="neon" className={style.subtimg} /> */}
      <HeaderContent />
    </div>
  </>
);

export default Header;
