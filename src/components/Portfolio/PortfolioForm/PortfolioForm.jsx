import styles from "./PortfolioForm.module.css";
import { InputAmount } from "./InputAmount/InputAmount";
import { numToDollar } from "../../../utils";

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
          onUp={() => setInitialDeposit(InitialDeposit + 100000)}
          onDn={() => setInitialDeposit(InitialDeposit - 100000)}
        />{" "}
        in{" "}
        <span className={styles.date}>
          {DateStart.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </span>
        <br />
        and added{" "}
        <InputAmount
          amount={MonthlyContribution}
          onUp={() => setMonthlyContribution(MonthlyContribution + 100000)}
          onDn={() => setMonthlyContribution(MonthlyContribution - 100000)}
        />{" "}
        every month
        <br />
        this portfolio would have yielded
      </h4>
      <span className={styles.amount}>{numToDollar(total)}</span>
    </div>
  );
};
