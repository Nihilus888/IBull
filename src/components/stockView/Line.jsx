import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement);

function LineChart(props) {
 const lineData = {
    labels: ["Price", "Date"],
    datasets: [
      {
        label: "# of Votes",
        data: props.data,
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
        borderWidth: 1,
      },
    ],
  };

  let delayed

  // useEffect(() => {
  //   const fetchStockData = async () => {
  //     await fetch("http://localhost:3001/stock/search", {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           response.json().then((json) => {
  //             const c = {...chart}
  //             c.data = json.data
  //             setChart(c)
  //           });
  //         }
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   fetchStockData()
  // }, [])

  // let data = {
  //   labels: ["Price", "Date"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },

    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 5;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
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
