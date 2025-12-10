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
        You would have <span className={`${styles.amount} ${styles.numberWrapper}`}>
          {numToDollar(total)}
        </span><br />
        if you invested{" "}
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
        and added{" "}
        <InputAmount
          amount={MonthlyContribution}
          onUp={() => setMonthlyContribution(moreInt(MonthlyContribution))}
          onDn={() => setMonthlyContribution(lessInt(MonthlyContribution))}
          onChange={setMonthlyContribution}
        />{" "}
        monthly
      </h4>
    </div>
  );
};
