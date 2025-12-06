import styles from "./DatePicker.module.css";

export const DatePicker = ({ date, onChange, className }) => {
  // Body scroll lock removed as component is now inline

  const today = new Date();
  // Max valid date is the 1st of the previous month
  const maxDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const clampDate = (d) => {
    return d > maxDate ? maxDate : d;
  };

  const handleMonthScroll = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);

    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + delta);
    onChange(clampDate(newDate));
  };

  const handleYearScroll = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);

    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setFullYear(newDate.getFullYear() + delta);
    onChange(clampDate(newDate));
  };

  const getOffsetDate = (baseDate, monthOffset, yearOffset) => {
    const d = new Date(baseDate);
    d.setDate(1);
    if (monthOffset) d.setMonth(d.getMonth() + monthOffset);
    if (yearOffset) d.setFullYear(d.getFullYear() + yearOffset);
    return d;
  };

  const currentMonthName = date.toLocaleDateString("en-US", { month: "short" });
  const currentYear = date.getFullYear();

  const prevMonthDate = getOffsetDate(date, -1, 0);
  const nextMonthDate = getOffsetDate(date, 1, 0);

  const prevMonthName = prevMonthDate.toLocaleDateString("en-US", { month: "short" });
  const nextMonthName = nextMonthDate.toLocaleDateString("en-US", { month: "short" });

  const prevYear = currentYear - 1;
  const nextYear = currentYear + 1;

  // Determine availability
  const isNextMonthValid = nextMonthDate <= maxDate;
  // For year, creating a full date to check validity (e.g., sticking with current month)
  const nextYearDate = getOffsetDate(date, 0, 1);
  const isNextYearValid = nextYearDate <= maxDate;


  // Click handlers for explicit items
  const handleItemClick = (newDate) => {
    onChange(clampDate(newDate));
  };

  // Helper to change year only
  const handleYearChange = (yearDelta) => {
    const d = getOffsetDate(date, 0, yearDelta);
    onChange(clampDate(d));
  };

  return (
    <>
      <div className={styles.popover}>
        <div
          className={styles.column}
          onWheel={handleMonthScroll}
          title="Scroll or click to change month"
        >
          <span
            className={styles.neighbor}
            onClick={() => handleItemClick(prevMonthDate)}
          >
            {prevMonthName}
          </span>
          <span className={styles.value}>{currentMonthName}</span>
          <span
            className={styles.neighbor}
            onClick={() => isNextMonthValid && handleItemClick(nextMonthDate)}
            style={{ visibility: isNextMonthValid ? 'visible' : 'hidden' }}
          >
            {nextMonthName}
          </span>
        </div>
        <div
          className={styles.column}
          onWheel={handleYearScroll}
          title="Scroll or click to change year"
        >
          <span
            className={styles.neighbor}
            onClick={() => handleYearChange(-1)}
          >
            {prevYear}
          </span>
          <span className={styles.value}>{currentYear}</span>
          <span
            className={styles.neighbor}
            onClick={() => isNextYearValid && handleYearChange(1)}
            style={{ visibility: isNextYearValid ? 'visible' : 'hidden' }}
          >
            {nextYear}
          </span>
        </div>
      </div>
    </>
  );
};
