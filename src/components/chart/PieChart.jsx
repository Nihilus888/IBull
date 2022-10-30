import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function PieChart() {
  let delayed;

  let data = {
    labels: ["Tech", "Financials", "Energy", "Medical", "Consumer Directories"],
    datasets: [
      {
        label: "Price",
        data: [1, 3, 5, 3, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 4,
        hoverOffset: 3,
        borderRadius: 2,
        weight: 3,
        borderJoinStyle: 'bevel',
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "cursive",
      },
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 5;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 600 + context.datasetIndex * 300;
        }
        return delay;
      },
    },
  };

  return (
    <div>
      <PolarArea data={data} options={options} height={475} width={600} ml={200} />
    </div>
  );
}

export default PieChart;
