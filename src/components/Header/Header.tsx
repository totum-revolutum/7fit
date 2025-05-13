import style from "./Header.module.scss";
import { HeaderContent } from "@components/HeaderContent";

const Header = () => (
  <>
    {/* <div className={style.bg}></div> */}
    <div className={style.header}>
      <img src="/elements/106.png" alt="neon" className={style.subtimg} />
      <HeaderContent />
    </div>
    <div className={style.bg}></div>
  </>
);

export default Header;
