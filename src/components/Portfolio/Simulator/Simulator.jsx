import styles from "./Simulator.module.css";
import { useState } from "preact/hooks";
import { PortfolioForm } from "../../Portfolio/PortfolioForm/PortfolioForm.jsx";
import { PortfolioCard } from "../PortfolioCard/PortfolioCard.jsx";

export const Simulator = ({
  PortfolioID,
  Name,
  Alias,
  ShortDescription,
  Description,
  RiskLevelID
}) => {
  const [InitialDeposit, setInitialDeposit] = useState(1000000);
  const [MonthlyContribution, setMonthlyContribution] = useState(100000);
  const [DateStart, setDateStart] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );
  const [total, setTotal] = useState(InitialDeposit);

  return (
    <section className={styles.container}>
      <PortfolioForm
        InitialDeposit={InitialDeposit}
        MonthlyContribution={MonthlyContribution}
        DateStart={DateStart}
        setInitialDeposit={setInitialDeposit}
        setMonthlyContribution={setMonthlyContribution}
        setDateStart={setDateStart}
        total={total}
      />
      <PortfolioCard
        PortfolioID={PortfolioID}
        Name={Name}
        Alias={Alias}
        ShortDescription={ShortDescription}
        Description={Description}
        RiskLevelID={RiskLevelID}
        InitialDeposit={InitialDeposit}
        MonthlyContribution={MonthlyContribution}
        DateStart={DateStart}
        onBacktestUpdate={(value) => setTotal(value)}
      />
    </section>
  );
};
