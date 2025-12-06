import styles from "./InputAmount.module.css";
import { numToDollar, dollarToNum } from "../../../../utils";
import { useState, useRef, useEffect } from "preact/hooks";

export const InputAmount = ({ amount, onUp, onDn, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(numToDollar(amount));
  const inputRef = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(numToDollar(amount));
    }
  }, [amount, isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    // setTimeout to ensure render
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    let newVal = dollarToNum(inputValue);
    onChange(newVal);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current) inputRef.current.blur();
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    // Threshold of 30px
    if (Math.abs(deltaY) > 30) {
      // Swipe Up (negative) -> Increase
      // Swipe Down (positive) -> Decrease
      if (deltaY < 0) {
        onUp();
      } else {
        onDn();
      }
    }
    touchStartY.current = null;
  };

  return (
    <div
      className={styles.numberWrapper}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className={`${styles.arrow} ${styles.up}`} onClick={onUp}>▲</button>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className={styles.amountInput}
          value={inputValue}
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