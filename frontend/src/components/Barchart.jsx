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

// ✅ REGISTER COMPONENTS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Barchart({ data }) {
  const chartData = {
    labels: ["ECDH", "Kyber", "Hybrid"],
    datasets: [
      {
        label: "Average Time (s)",
        data: [
          data.ecdh.summary.avg_total_time,
          data.kyber.summary.avg_total_time,
          data.hybrid.summary.avg_total_time
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"]
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default Barchart;