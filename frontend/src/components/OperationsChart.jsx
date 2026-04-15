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

function OperationsChart({ data }) {
  const avg = (results, field) => {
    const valid = results.filter(r => r[field] !== undefined);
    if (valid.length === 0) return 0;
  
    const sum = valid.reduce((acc, r) => acc + r[field], 0);
    return sum / valid.length;
  };
  // const process = (results) => {
  //   const filtered = includeFirst ? results : results.slice(1); // remove first iteration 

  //   if (filtered.length === 0) return 0; // edge case if iterations = 1

  //   const sum = filtered.reduce((acc, r) => acc + r.total_time, 0); // collapses array to a single value
  //   return sum / filtered.length;
  // };

  const chartData = {
    labels: ["KeyGen", "Encap", "Decap", "KDF"],
    datasets: [
      {
        label: "ECDH",
        data: [
          convertMs(avg(data.ecdh.results, "keygen_time")),
          0,
          0,
          convertMs(avg(data.ecdh.results, "kdf_time"))
        ]
      },
      {
        label: "Kyber",
        data: [
          convertMs(avg(data.kyber.results, "keygen_time")),
          convertMs(avg(data.kyber.results, "encap_time")),
          convertMs(avg(data.kyber.results, "decap_time")),
          0
        ]
      },
      {
        label: "Hybrid",
        data: [
          convertMs(avg(data.hybrid.results, "keygen_time")),
          convertMs(avg(data.hybrid.results, "encap_time")),
          convertMs(avg(data.hybrid.results, "decap_time")),
          convertMs(avg(data.hybrid.results, "kdf_time"))
        ]
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default OperationsChart;