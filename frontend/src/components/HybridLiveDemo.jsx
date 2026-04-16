import { useState } from "react";

export default function HybridLiveDemo() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runHybrid = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/run/hybrid");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-5">
      Post-Quantum Hybrid Key Exchange
      </h2>

      <button
        onClick={runHybrid}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        {loading ? "Running..." : "Run Hybrid Handshake"}
      </button>

      {result && (
        <div className="mt-4 text-left text-sm">
          <p>
            <strong>Status:</strong>{" "}
            {result.success ? "Success" : "Failed"}
          </p>
          <p>
            <strong>ECDH Key Size:</strong> {result.ecdh_key_size} bytes
          </p>
          <p>
            <strong>Kyber Key Size:</strong> {result.kyber_key_size} bytes
          </p>
          <p>
            <strong>Final Key Size:</strong> {result.final_key_size} bytes
          </p>

          <p className="break-all">
            <strong>Shared Key:</strong> {result.shared_key}
          </p>

          {result.error && (
            <p className="text-red-500">
              Error: {result.error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}