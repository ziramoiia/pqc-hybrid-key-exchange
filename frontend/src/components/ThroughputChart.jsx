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
  
  function ThroughputChart({ data, includeFirst }) {
    if (!data) return <p>Loading...</p>;
    const avgProcess = (results) => {
      if (!Array.isArray(results)) return 0;
      // remove first iteration 
      const filtered = includeFirst ? results : results.slice(1);
      if (filtered.length === 0) return 0; // edge case if iterations = 1
      
      // calculate new average
      const sum = filtered.reduce((acc, r) => acc + r.total_time, 0); // collapses array to a single value
      // calculate throughput (invert)
      const throughput = 1 / (sum / filtered.length)
      return throughput;
    };
 
    const chartData = {
      labels: ["ECDH", "Kyber", "Hybrid"],
      datasets: [
        {
          label: "Throughput (ops/sec)",
          data: [
            avgProcess(data.ecdh.results),
            avgProcess(data.kyber.results),
            avgProcess(data.hybrid.results)
          ],
          backgroundColor: [
            "#3b82f6",
            "#10b981", 
            "#f59e0b"  
          ]
        }
      ]
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) =>
              `${context.raw.toFixed(0)} ops/sec`
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Protocol"
          }
        },
        y: {
          title: {
            display: true,
            text: "Operations per Second"
          },
          ticks: {
            callback: (value) => `${value}`
          }
        }
      }
    };
  
    return (
        <Bar data={chartData} options={options} />
    );
  }
  
  export default ThroughputChart;