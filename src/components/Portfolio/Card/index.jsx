import styles from "./index.module.css";
import { useState, useEffect } from "preact/hooks";
import { getBacktest } from "../../../api/backtest";
import { Chart } from "./Chart/Chart.jsx";

export const PortfolioCard = ({
  portfolio,
  benchmarks,
  backtestInputs,
  onBacktestUpdate
}) => {
  const [portfolioBacktest, setPortfolioBacktest] = useState({
    "TotalInvestment": 0,
    "Values": {},
    "CAGR": 0,
    "MaxDrawdown": 0,
    "Cashflows": {}
  });
  const [activeBenchmark, setActiveBenchmark] = useState(benchmarks?.length > 0 ? benchmarks[0] : {
    ID: 0,
    Name: "",
    Alias: "",
    ShortDescription: "",
    RiskLevelID: 0,
  });
  const [benchmarksBacktest, setBenchmarksBacktest] = useState({
    "TotalInvestment": 0,
    "Values": {},
    "CAGR": 0,
    "MaxDrawdown": 0,
    "Cashflows": {}
  });

  const { ID: PortfolioID, Alias, Name, ShortDescription, RiskLevelID } = portfolio;

  useEffect(() => {
    getBacktest(PortfolioID, backtestInputs).then((backtest) => {
      setPortfolioBacktest(backtest);
      const amounts = Object.values(backtest.Values)
      onBacktestUpdate(amounts[amounts.length - 1]);
    });
  }, [PortfolioID, backtestInputs]);

  useEffect(() => {
    if (activeBenchmark.ID === 0) { return };
    getBacktest(activeBenchmark.ID, backtestInputs).then((backtest) => {
      setBenchmarksBacktest(backtest);
    });
  }, [activeBenchmark, backtestInputs]);

  return (
    <div className={styles.container}>
      <h3 class="title">{Name}</h3>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <p>Risk:
          <span style={{ whiteSpace: "nowrap" }} >
            {[...Array(RiskLevelID)].map((_) => "🔥").join("")}
          </span>
        </p>
        <p>Return:{" "}
          <span className={styles.number}>
            {Number(portfolioBacktest.CAGR * 100).toFixed(2)}%
          </span>
        </p>
        <p>Drawdown:{" "}
          <span className={styles.number}>
            {Number(portfolioBacktest.MaxDrawdown * 100).toFixed(2)}%
          </span>
        </p>
        <p>Benchmark: <select name="active-benchmark" onChange={
          (e) => {
            e.stopPropagation();
            setActiveBenchmark(benchmarks.find((benchmark) => benchmark.ID === Number(e.target.value)));
          }}>
          {benchmarks.map((benchmark) => (
            <option key={benchmark.ID} value={benchmark.ID}>{benchmark.Name}</option>
          ))}
        </select></p>
      </div>
      <Chart portfolioBacktest={portfolioBacktest} benchmarkBacktest={benchmarksBacktest} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>{ShortDescription}</p>
        <div className={styles.footer}>&rarr;</div>
      </div>
    </div>
  );
};
