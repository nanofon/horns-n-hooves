import { useState, useEffect } from "preact/hooks";
import { getAllPortfolios, Portfolio } from "../../../api/portfolio";
import styles from "./index.module.css";
import { PortfolioCard } from "../Card";

export const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [benchmarks, setBenchmarks] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPortfolios().then(({ portfolios, benchmarks }) => {
      setPortfolios(portfolios);
      setBenchmarks(benchmarks);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading Portfolios and Benchmarks...</div>;
  }

  const backtestInputs = {
    InitialDeposit: 10000,
    MonthlyContribution: 1000,
    DateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
  };

  return (
    <section className={`${styles.portfolioSummaries} snap-section`}>
      {portfolios.map((portfolio) => (
        <a
          href={`./portfolios?alias=${encodeURIComponent(portfolio.Alias)}`}
          className={styles.container}
        >
          <PortfolioCard
            portfolio={portfolio}
            benchmarks={benchmarks}
            backtestInputs={backtestInputs}
            onBacktestUpdate={() => {}}
          />
        </a>
      ))}
    </section>
  );
};
