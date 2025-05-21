import styles from "./Button.module.scss";
import { FC } from "react";
import { ButtonTexts } from "@constants/buttonTexts";
import { ButtonTextType } from "../../../types/button";

interface ButtonProps {
  textType: ButtonTextType;
  onClick?: () => void;
}

const Button = ({ textType, onClick }: ButtonProps) => (
  <button onClick={onClick} className={styles.mainButton}>
    {ButtonTexts[textType]}
  </button>
);
export default Button;

//  return <button className={styles["main-button"]}>{ButtonTexts[textType]}</button>;
