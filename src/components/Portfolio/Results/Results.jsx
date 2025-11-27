import styles from "./Results.module.css";
import { Chart } from "../Chart/Chart.jsx";

export const Results = ({ portfolio, data, labels }) => {
  const {
    ID: PortfolioID,
    Name,
    Alias,
    ShortDescription,
    Description,
    RiskLevelID,
  } = portfolio;

  return (
    <a href={`./portfolios/${Alias}`} className={styles.container}>
      <h3 class="title">{Name}</h3>
      <p>Risk: {[...Array(RiskLevelID)].map((_) => "🔥").join("")}</p>
      <p>{ShortDescription}</p>
      {data && labels && <Chart data={data} labels={labels} />}
      <p>{Description}</p>
      <div className={styles.footer}>&rarr;</div>
    </a>
  );
};