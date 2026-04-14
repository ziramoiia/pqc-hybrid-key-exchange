import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import Barchart from "./components/Barchart";
import Linechart from "./components/Linechart";

function Dashboard({ data }) {
  const [includeFirst, setIncludeFirst] = useState(true);

  return (
    <div className="container">
      
      <h1>Post-Quantum Benchmark Dashboard</h1>

      {/* Toggle */}
     <div className="toggle">
        <input
            type="checkbox"
            checked={includeFirst}
            onChange={() => setIncludeFirst(!includeFirst)}
        />
        <span>Include First Iteration (warm-up)</span>
     </div>
      <SummaryCards data={data} />

      <div className="chart-section">
        <h2>Protocol Comparison</h2>
        <Barchart data={data} />
      </div>

      <div className="chart-section">
        <h2>Performance Over Iterations</h2>
        <Linechart data={data} includeFirst={includeFirst} />
      </div>

    </div>
  );
}

export default Dashboard;