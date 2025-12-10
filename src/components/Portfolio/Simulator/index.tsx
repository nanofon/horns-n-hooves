import styles from "./index.module.css";
import { useState, useEffect } from "preact/hooks";
import { PortfolioForm } from "../PortfolioForm/PortfolioForm";
import { Portfolio, getAllPortfolios } from "../../../api/portfolio";
import { PortfolioCard } from "../Card";

export const Simulator = ({ alias }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(null);
  const [benchmarks, setBenchmarks] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [InitialDeposit, setInitialDeposit] = useState(1000000);
  const [MonthlyContribution, setMonthlyContribution] = useState(100000);
  const [DateStart, setDateStart] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  );
  const [total, setTotal] = useState(InitialDeposit);

  useEffect(() => {
    getAllPortfolios().then(({ portfolios, benchmarks }) => {
      setPortfolio(portfolios.find((portfolio) => portfolio.Alias === alias));
      setBenchmarks(benchmarks);
      setIsLoading(false);
    });
  }, [alias]);

  if (isLoading) {
    return <div>Loading Portfolios and Benchmarks...</div>;
  }

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
        portfolio={portfolio}
        benchmarks={benchmarks}
        backtestInputs={{
          InitialDeposit,
          MonthlyContribution,
          DateStart,
        }}
        onBacktestUpdate={(value: number) => setTotal(value)}
      />
    </section>
  );
};
