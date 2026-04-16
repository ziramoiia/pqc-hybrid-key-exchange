import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { convertMs } from "../utils/unitConversion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AvgExecutionTimeChart({ data, includeFirst }) {
  const process = (results) => {
    // remove first iteration 
    const filtered = includeFirst ? results : results.slice(1); 

    if (filtered.length === 0) return 0; // edge case if iterations = 1
    // calculate new average
    const sum = filtered.reduce((acc, r) => acc + r.total_time, 0); // collapses array to a single value
    return sum / filtered.length;
  };
  // const labels = data.ecdh.results.map(r => r.ID);
  const chartData = {
    // labels: includeFirst ? labels : labels.slice(1),
    labels: ["ECDH", "Kyber", "Hybrid"],
    datasets: [
      {
        label: "Average Time (ms)",
        // label: includeFirst
        //   ? "Average Time (s) (All Runs)"
        //   : "Average Time (s) (Excluding First Run)",
        data: [
          convertMs(process(data.ecdh.results)),
          convertMs(process(data.kyber.results)),
          convertMs(process(data.hybrid.results))
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"]
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default AvgExecutionTimeChart;