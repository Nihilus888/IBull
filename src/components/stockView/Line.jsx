import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement);

function LineChart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      await fetch("http://localhost:3001/stock/search", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((json) => {
              console.log(json.data);
              setChart(json.data)
            });
          }
        }).catch((error) => {
          console.log(error);
        });
    };
    fetchStockData()
  }, [])

  let data = {
    labels: ["Price", "Date"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      lables: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} height={400} />
    </div>
  );
}

export default LineChart;
