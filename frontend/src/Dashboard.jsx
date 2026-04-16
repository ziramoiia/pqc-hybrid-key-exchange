import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import AvgExecutionTimeChart from "./components/AvgExecutionTimeChart";
import IterationsChart from "./components/IterationsChart";
import OperationsChart from "./components/OperationsChart";
import HybridLiveDemo from "./components/HybridLiveDemo";
import ExecutionTimeHistogram from "./components/ExecutionTimeHistogram";
import DistributionBoxPlot from "./components/DistributionBoxPlot";
import EncapDecapScatter from "./components/EncapDecapScatter";
import ThroughputChart from "./components/ThroughputChart";

function Dashboard({ data, refreshData }) {
  const [includeFirst, setIncludeFirst] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };
  const [loading, setLoading] = useState(false);

  const handleRunBenchmark = async () => {
    setLoading(true);

    try {
      // To re-run benchmark and update json
      await fetch("http://127.0.0.1:5000/api/benchmark");
      await refreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // <Line data={chartData} options={options} />
  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-2 text-center">
        Hybrid Post-Quantum Key Exchange Dashboard
      </h1>
      {/* <h2 className="text-xl mb-6 text-center">
      Performance benchmarking of ECDH-X25519, ML-KEM (Kyber) and Hybrid Protocols
      </h2> */}
      <p className="text-xl text-gray-500 text-center">
        Performance benchmarking of ECDH, Kyber, and Hybrid protocols
      </p>

      {/* Toggle */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={includeFirst}
          onChange={() => setIncludeFirst(!includeFirst)}
        />
        <span className="text-gray-600 text-sm">
          Include first iteration
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-6 gap-4">

        {/* Summary Cards */}
        <div className="col-span-4">
          <SummaryCards data={data} includeFirst={includeFirst} onRunBenchmark={handleRunBenchmark} loading={loading} />
        </div>

        {/* Hybrid Live Demo */}
        <div className="col-span-2">
          <HybridLiveDemo />
        </div>

        {/* Average Execution Time Barchart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Average Execution Time by Protocol</h2>
          <AvgExecutionTimeChart data={data} includeFirst={includeFirst} />
        </div>

        {/* Execution Time Line graph */}
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Execution Time per Iteration</h2>
          <IterationsChart data={data} includeFirst={includeFirst} />
        </div>

        {/* Encapsulation vs Decapsulation Scatter */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Encapsulation vs Decapsulation Time</h2>
          <EncapDecapScatter data={data} includeFirst={includeFirst} />
        </div>

        {/* Average Operation Cost Barchart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Average Operation Cost Breakdown</h2>
          <OperationsChart data={data} includeFirst={includeFirst} />
        </div>

        {/* Protocol Throughput Barchart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Protocol Throughput Comparison (s) </h2>
          <ThroughputChart data={data} includeFirst={includeFirst} />
        </div>
        {/* Execution Time Distribution Boxplots */}
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Execution Time Distribution</h2>
          <DistributionBoxPlot data={data} includeFirst={includeFirst} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Hybrid Performance Distribution</h2>
          <ExecutionTimeHistogram data={data} includeFirst={includeFirst} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;