import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function Linechart({ data, includeFirst }) {
    //Filter logic
    const ecdhResults = includeFirst
      ? data.ecdh.results
      : data.ecdh.results.slice(1);
  
    const kyberResults = includeFirst
      ? data.kyber.results
      : data.kyber.results.slice(1);
  
    const hybridResults = includeFirst
      ? data.hybrid.results
      : data.hybrid.results.slice(1);
  
    const labels = ecdhResults.map(r => r.ID);
  
    const chartData = {
      labels,
      datasets: [
        {
          label: "ECDH",
          data: ecdhResults.map(r => r.total_time)
        },
        {
          label: "Kyber",
          data: kyberResults.map(r => r.total_time)
        },
        {
          label: "Hybrid",
          data: hybridResults.map(r => r.total_time)
        }
      ]
    };
  
    return (
      <div className="card">
        <Line data={chartData} />
      </div>
    );
  }
export default Linechart;