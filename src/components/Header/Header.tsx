import style from "./Header.module.scss";
import { HeaderContent } from "@components/HeaderContent";

const Header = () => (
  <>
    {/* <div className={style.bg}></div> */}
    <div className={style.header}>
    <div className={style.bg}></div>

      <HeaderContent />
    </div>
  </>
);

export default Header;
