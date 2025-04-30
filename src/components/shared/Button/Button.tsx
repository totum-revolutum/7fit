import styles from "./Button.module.scss";
import { FC } from "react";
import { ButtonTexts } from "@constants/buttonTexts";
import { ButtonTextType } from "../../../types/button";

interface ButtonProps {
  textType: ButtonTextType;
}

const Button: FC<ButtonProps> = ({ textType }) => {
  return <button className={styles.mainButton}>{ButtonTexts[textType]}</button>;
};

export default Button;

//  return <button className={styles["main-button"]}>{ButtonTexts[textType]}</button>;
