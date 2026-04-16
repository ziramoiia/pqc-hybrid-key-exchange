import { createHistogram } from "../utils/histogram";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  } from "chart.js";
  
  import { Bar } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
  );
  
  function ExecutionTimeHistogram({ data, includeFirst }) {
    if (!data) return <p>Loading...</p>;

    const allTimes = data.hybrid.results.map(r => r.total_time);
    const min = Math.min(...allTimes);
    const max = Math.max(...allTimes);
  
    const filteredResults = includeFirst
      ? data.hybrid.results
      : data.hybrid.results.slice(1);
  
    const filteredTimes = filteredResults.map(r => r.total_time);
  
    // Create histogram with fixed bins (unaffected by toggle)
    const { labels, bins } = createHistogram(filteredTimes, 12, min, max);
  
    const chartData = {
      labels,
      datasets: [
        {
          label: "Frequency",
          data: bins,
          backgroundColor: "#3b82f6",
        }
      ]
    };
  
    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Count: ${context.raw}`
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Execution Time (ms)"
          }
        },
        y: {
          title: {
            display: true,
            text: "Frequency"
          },
          beginAtZero: true
        }
      }
    };
  
    return <Bar data={chartData} options={options} />;
  }
  
  export default ExecutionTimeHistogram;