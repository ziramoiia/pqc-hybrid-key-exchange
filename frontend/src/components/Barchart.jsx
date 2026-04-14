import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Barchart({ data }) {
  const chartData = {
    labels: ["ECDH", "Kyber", "Hybrid"],
    datasets: [
      {
        label: "Avg Total Time (s)",
        data: [
          data.ecdh.summary.avg_total_time,
          data.kyber.summary.avg_total_time,
          data.hybrid.summary.avg_total_time
        ]
      }
    ]
  };

  return (
    <div className="card">
      <Bar data={chartData} />
    </div>
  );
}

export default Barchart;