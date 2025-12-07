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

export const Chart = ({ data, labels }) => {

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

  const dataset = {
    label: "Portfolio Value",
    data: data,
    borderColor: "#a77904",
    backgroundColor: "#a77904",
  };

  const chartData = { labels, datasets: [dataset] };

  return <div style={{ position: "relative" }}>
    <Line options={options} data={chartData} className={style.line} />
  </div>;
};
