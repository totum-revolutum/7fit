import style from "./Header.module.scss";
import { HeaderContent } from "@components/HeaderContent";
// import { NavBar } from "@components/NavBar";

const Header = () => (
  <>
    <div className={style.bg}></div>
    <div className={style.header}>
      {/* <NavBar /> */}
      <HeaderContent />
    </div>
  </>
);

export default Header;
