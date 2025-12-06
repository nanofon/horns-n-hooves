import styles from "./InputAmount.module.css";
import { numToDollar } from "../../../../utils";
import { useState, useRef, useEffect } from "preact/hooks";

export const InputAmount = ({ amount, onUp, onDn, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.numberWrapper}>
      <button className={`${styles.arrow} ${styles.up}`} onClick={onUp}>▲</button>
      {isEditing ? (
        <input
          ref={inputRef}
          type="number"
          className={styles.amountInput}
          value={amount}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={styles.amount}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          {numToDollar(amount)}
        </span>
      )}
      <button className={`${styles.arrow} ${styles.down}`} onClick={onDn}>▼</button>
    </div>
  );
};