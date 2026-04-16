import React from "react";
import { convertMs } from "../utils/unitConversion";

function Card({ title, metrics, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className={`text-lg font-semibold mb-4 ${color}`}>
        {title}
      </h2>

      <div className="space-y-3">
        {metrics.map((m, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500">{m.label}</p>
            {typeof m.value === "string" ? (
              <p className="text-lg font-semibold">{m.value}</p>
            ) : (
              m.value
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCards({ data, includeFirst, onRunBenchmark, loading }) {
  if (!data) return <p>Loading...</p>;
  const avgProcess = (results) => {
    if (!Array.isArray(results)) return 0;
    // remove first iteration 
    const filtered = includeFirst ? results : results.slice(1);
    if (filtered.length === 0) return 0; // edge case if iterations = 1
    
    // calculate new average
    const sum = filtered.reduce((acc, r) => acc + r.total_time, 0); // collapses array to a single value
    return sum / filtered.length;
  };

  //calculate new success rate after removing initial iteration
  const successProcess = (results) => {
    if (!Array.isArray(results)) return 0;
    const filtered = includeFirst ? results : results.slice(1);
    if (filtered.length === 0) return 0;

    const successes = filtered.filter(r => r.success).length;
    return successes / filtered.length;
  };

  const countProcess = (results) => {
    if (!Array.isArray(results)) return 0; // checks if results is an array
    return includeFirst ? results.length : results.length - 1;
  }
  return (
    <div className="space-y-6">

      {/* 🔹 Protocol Cards */}
      <div className="grid grid-cols-4 gap-4">

        {/* ECDH */}
        <Card
          title="ECDH"
          color="text-blue-500"
          metrics={[
            {
              label: "Avg Time",
              value: `${convertMs(avgProcess(data.ecdh.results)).toFixed(3)} ms`
            },
            {
              label: "Success Rate",
              value: `${(successProcess(data.ecdh.results) * 100).toFixed(1)}%`
            },
            {
              label: "Throughput",
              value: `${(1 / avgProcess(data.ecdh.results)).toFixed(0)} ops/sec`
            }
          ]}
        />

        {/* Kyber */}

        <Card
          title="Kyber"
          color="text-green-500"
          metrics={[
            {
              label: "Avg Time",
              value: `${convertMs(avgProcess(data.kyber.results)).toFixed(3)} ms`
            },
            {
              label: "Success Rate",
              value: `${(successProcess(data.kyber.results) * 100).toFixed(1)}%`
            },
            {
              label: "Throughput",
              value: `${(1 / avgProcess(data.kyber.results)).toFixed(0)} ops/sec`
            }
          ]}
        />

        {/* Hybrid */}
        <Card
          title="Hybrid"
          color="text-orange-500"
          metrics={[
            {
              label: "Avg Time",
              value: `${convertMs(avgProcess(data.hybrid.results)).toFixed(3)} ms`
            },
            {
              label: "Success Rate",
              value: `${(successProcess(data.hybrid.results) * 100).toFixed(1)}%`
            },
            {
              label: "Throughput",
              value: `${(1 / avgProcess(data.hybrid.results)).toFixed(0)} ops/sec`
            }
          ]}
        />
        {/* Global Card */}
        <div className="col-start-4 col-span-1">
          <Card
            title="Global"
            color="text-gray-500"
            metrics={[
              {
                label: "Iterations",
                value: `${countProcess(data.ecdh.results)}` // using results and not iterations as reducing array length of results
              },
              {
                label: "Timestamp",
                value: `${(data.timestamp)}`
              },
              {
                label: "",
                value: (
                  <button
                    onClick={onRunBenchmark}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                  >
                    {loading ? "Running..." : "Run Benchmark"}
                  </button>
                )
              }
            ]}
          />
        </div>

      </div>
    </div>
  );
}

export default SummaryCards;