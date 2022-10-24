import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

function BarChart() {
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

  let delayed

  let data = {
    labels: ["Google", "Tesla", "JP Morgan", "Chevron Corp", "Nvidia"],
    datasets: [
      {
        label: "Price",
        data: [109, 300, 114, 173, 124],
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
        borderWidth: 2,
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
      labels: {
        fontSize: 30,
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
      <Bar data={data} options={options} height={400} ml={200}/>
    </div>
  );
}

export default BarChart;
