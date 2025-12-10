import style from "./Chart.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import { numToDollar } from "../../../../utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export const Chart = ({ benchmarkBacktest, portfolioBacktest }) => {

  const options = {
    responsive: true,
    plugins: {
      returnPlugin: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value, index, ticks) => numToDollar(value),
        },
      },
    },
    tension: 0.4,
  };

  const portfolioDataset = {
    label: "Portfolio",
    data: Object.values(portfolioBacktest.Values),
    borderColor: "#a77904",
    backgroundColor: "#a77904",
  };
  const benchmarkDataset = {
    label: "Benchmark",
    data: Object.values(benchmarkBacktest.Values),
    borderColor: "#6304a7ff",
    backgroundColor: "#6304a7ff",
  };

  const chartData = { labels: Object.keys(portfolioBacktest.Values).map((key) => new Date(key).toLocaleDateString("en-US", { year: "numeric", month: "short" })), datasets: [portfolioDataset, benchmarkDataset] };

  return <div style={{ position: "relative" }}>
    <Line options={options} data={chartData} className={style.line} />
  </div>;
};
