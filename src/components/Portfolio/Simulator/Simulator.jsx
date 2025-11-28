import styles from "./Simulator.module.css";
import { useState, useEffect } from "preact/hooks";
import { PortfolioForm } from "../../Portfolio/PortfolioForm/PortfolioForm.jsx";
import { Results } from "../../Portfolio/Results/Results.jsx";
import { getBacktest } from "./getBacktest.js";

export const Simulator = ({ portfolio }) => {
  const { ID: PortfolioID } = portfolio;
  const [InitialDeposit, setInitialDeposit] = useState(1000000);
  const [MonthlyContribution, setMonthlyContribution] = useState(100000);
  const [DateStart, setDateStart] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );

  const [labels, setLabels] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const recalculate = async () => {
    try {
      const { data, labels } = await getBacktest(
        PortfolioID,
        InitialDeposit,
        DateStart
      );
      setData(data);
      setLabels(labels);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    recalculate();
  }, [PortfolioID, InitialDeposit, DateStart]);

  return (
    <div className={styles.container}>
      <PortfolioForm
        InitialDeposit={InitialDeposit}
        MonthlyContribution={MonthlyContribution}
        DateStart={DateStart}
        setInitialDeposit={setInitialDeposit}
        setMonthlyContribution={setMonthlyContribution}
        setDateStart={setDateStart}
        total={data ? data[data.length - 1] : InitialDeposit}
      />
      <Results portfolio={portfolio} data={data} labels={labels} />
    </div>
  );
};
