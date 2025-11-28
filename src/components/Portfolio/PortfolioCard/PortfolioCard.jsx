import styles from "./PortfolioCard.module.css";
import { useState, useEffect } from "preact/hooks";
import { getBacktest } from "./getBacktest.js";
import { Chart } from "./Chart/Chart.jsx";

export const PortfolioCard = ({
  PortfolioID,
  Name,
  Alias,
  ShortDescription,
  Description,
  RiskLevelID,
  InitialDeposit,
  DateStart,
  onBacktestUpdate=()=>{}
}) => {
  const [backtest, setBacktest] = useState({});

  const updateData = async () => {
    try {
      const newBacktest = await getBacktest(
        PortfolioID,
        InitialDeposit,
        DateStart
      );
      setBacktest(newBacktest);
      onBacktestUpdate(newBacktest.data[newBacktest.data.length-1]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    updateData();
  }, [PortfolioID, InitialDeposit, DateStart]);

  return (
    <a href={`./portfolios/${Alias}`} className={styles.container}>
      <h3 class="title">{Name}</h3>
      <p>Risk: {[...Array(RiskLevelID)].map((_) => "🔥").join("")}</p>
      <p>{ShortDescription}</p>
      {Object.hasOwn(backtest, "data") ? (
        <Chart data={backtest.data} labels={backtest.labels} />
      ) : (
        ""
      )}
      <p>{Description}</p>
      <div className={styles.footer}>&rarr;</div>
    </a>
  );
};
