import styles from "./InputAmount.module.css";
import { numToDollar } from "../../../utils";
import { h } from "preact";

export const InputAmount = ({ amount, onUp, onDn}) => {
  return (
    <div className={styles.numberWrapper}>
      <button className={`${styles.arrow} ${styles.up}`} onClick={onUp}>▲</button>
      <span className={styles.amount}>
        {numToDollar(amount)}
      </span>
      <button className={`${styles.arrow} ${styles.down}`} onClick={onDn}>▼</button>
    </div>
  );
};