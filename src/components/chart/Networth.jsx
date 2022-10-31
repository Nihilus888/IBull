import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(Bar);

function Networth(props) {
  
    let delayed
  
    let data = {
      labels: ["Your networth", "Average Networth"],
      datasets: [
        {
          label: "Networth",
          data: [props.data, 300000],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  
    let options = {
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      legend: {
        labels: {
          fontSize: 45,
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
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 600 + context.datasetIndex * 300;
            }
            return delay;
          },
        },
    
    };
  
    return (
      <div>
        <Bar data={data} options={options} height={400}/>
      </div>
    );
  }
  
  export default Networth;
