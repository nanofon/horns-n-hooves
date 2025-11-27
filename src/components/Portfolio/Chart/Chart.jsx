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
import { numToDollar } from "../../../utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

export const Chart = ({ data, labels }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
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

  return <Line options={options} data={chartData} className={style.line} />;
};
