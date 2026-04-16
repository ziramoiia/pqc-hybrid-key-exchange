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

function OperationsChart({ data , includeFirst}) {
  const avgProcess = (results, field) => {
    if (!Array.isArray(results)) return 0;

    const filtered = includeFirst ? results : results.slice(1);
    const valid = filtered.filter(r => r[field] !== undefined);
    if (valid.length === 0) return 0;
  
    const sum = valid.reduce((acc, r) => acc + r[field], 0);
    return sum / valid.length;
  };

  const chartData = {
    labels: ["KeyGen", "Encap", "Decap", "KDF"],
    datasets: [
      {
        label: "ECDH",
        data: [
          convertMs(avgProcess(data.ecdh.results, "keygen_time")),
          0,
          0,
          convertMs(avgProcess(data.ecdh.results, "kdf_time"))
        ],
        backgroundColor: "#3b82f6",

      },
      {
        label: "Kyber",
        data: [
          convertMs(avgProcess(data.kyber.results, "keygen_time")),
          convertMs(avgProcess(data.kyber.results, "encap_time")),
          convertMs(avgProcess(data.kyber.results, "decap_time")),
          0
        ],
        backgroundColor: "#10b981",
      },
      {
        label: "Hybrid",
        data: [
          convertMs(avgProcess(data.hybrid.results, "keygen_time")),
          convertMs(avgProcess(data.hybrid.results, "encap_time")),
          convertMs(avgProcess(data.hybrid.results, "decap_time")),
          convertMs(avgProcess(data.hybrid.results, "kdf_time"))
        ],
        backgroundColor: "#f59e0b"
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default OperationsChart;