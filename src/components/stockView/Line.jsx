import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement);

function LineChart(props) {
  const lineData = {
    labels: ["Price", "Hour"],
    datasets: [
      {
        label: "Stock price over the trading day",
        data: props.data,
        backgroundColor: ["red"],
        borderColor: ["green"],
        fill: true,
        tension: 0.1,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        borderCapStyle: "butt",
        pointBorderColor: "rgba(192,192,192,1)",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointRadius: 5,
        pointHitRadius: 20,
      },
    ],
  };

  let delayed;

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        stacked: true,
      },
      x: {
        beginAtZero: true,
        stacked: false,
        labels: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
        ],
      },
    },
    legend: {
      labels: {
        fontSize: 30,
        fontWeight: 'bold',
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
      <Line data={lineData} options={options} height={600} />
    </div>
  );
}

export default LineChart;
