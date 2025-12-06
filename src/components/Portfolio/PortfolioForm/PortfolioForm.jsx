import styles from "./PortfolioForm.module.css";
import { InputAmount } from "./InputAmount/InputAmount";
import { numToDollar } from "../../../utils";
import { DatePicker } from "./DatePicker/DatePicker";
import { moreInt, lessInt } from "../../../utils";

export const PortfolioForm = ({
  InitialDeposit,
  MonthlyContribution,
  DateStart,
  setInitialDeposit,
  setMonthlyContribution,
  setDateStart,
  total,
}) => {
  return (
    <div className={styles.container}>
      <h4>
        If you invested{" "}
        <InputAmount
          amount={InitialDeposit}
          onUp={() => setInitialDeposit(moreInt(InitialDeposit))}
          onDn={() => setInitialDeposit(lessInt(InitialDeposit))}
          onChange={setInitialDeposit}
        />{" "}
        in{" "}
        <DatePicker 
            date={DateStart} 
            onChange={setDateStart} 
            className={styles.date} 
        />
        <br />
        and added{" "}
        <InputAmount
          amount={MonthlyContribution}
          onUp={() => setMonthlyContribution(moreInt(MonthlyContribution))}
          onDn={() => setMonthlyContribution(lessInt(MonthlyContribution))}
          onChange={setMonthlyContribution}
        />{" "}
        every month
        <br />
        this portfolio would have yielded
      </h4>
      <span className={`${styles.amount} ${styles.numberWrapper}`}>{numToDollar(total)}</span>
    </div>
  );
};
