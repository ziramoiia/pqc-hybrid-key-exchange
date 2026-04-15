import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import Barchart from "./components/Barchart";
import Linechart from "./components/Linechart";

function Dashboard({ data }) {
  const [includeFirst, setIncludeFirst] = useState(true);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };
  <Line data={chartData} options={options} />
  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        PQC Benchmark Dashboard
      </h1>

      {/* Toggle */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={includeFirst}
          onChange={() => setIncludeFirst(!includeFirst)}
        />
        <span className="text-gray-600 text-sm">
          Include first iteration (warm-up)
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-6 gap-4">

        {/* Summary Cards */}
        <div className="col-span-6">
          <SummaryCards data={data} />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Average Performance</h2>
          <Barchart data={data} />
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow col-span-3">
          <h2 className="font-semibold mb-2">Iteration Performance</h2>
          <Linechart data={data} includeFirst={includeFirst} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;