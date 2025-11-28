//import styles from "./Port.module.css";
import { useState, useEffect } from "preact/hooks";
import { Results } from "../Portfolio/Results/Results.jsx";
import { getBacktest } from "./Simulator/getBacktest.js";

export const PortfolioSummary = ({portfolioJson}) => {
  const portfolio = JSON.parse(portfolioJson);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const InitialDeposit = 1000000;
    const DateStart = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const recalculate = async () => {
    try {
      const { data, labels } = await getBacktest(portfolio.ID, InitialDeposit, DateStart);
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
  }, []);

  return isLoading ? '' : (
    <Results
      portfolio={portfolio}
      data={data}
      labels={labels}
    />
  );
};
