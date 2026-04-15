import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";
import { convertMs } from "../utils/unitConversion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Linechart({ data, includeFirst }) {
  const process = (results) => {
    let filtered = includeFirst ? results : results.slice(1);
    return filtered.map(r => convertMs(r.total_time));
  };

  const labels = data.ecdh.results.map(r => r.ID);

  const chartData = {
    labels: includeFirst ? labels : labels.slice(1),
    datasets: [
      {
        label: "ECDH",
        data: process(data.ecdh.results),
        borderColor: "#3b82f6"
      },
      {
        label: "Kyber",
        data: process(data.kyber.results),
        borderColor: "#10b981"
      },
      {
        label: "Hybrid",
        data: process(data.hybrid.results),
        borderColor: "#f59e0b"
      }
    ]
  };

  return <Line data={chartData} />;
}

export default Linechart;