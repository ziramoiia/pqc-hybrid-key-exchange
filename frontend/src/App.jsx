import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top nav */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">
            Quantum Hybrid PQC Dashboard
          </h1>
          <span className="text-xs text-slate-400">
            Kyber + X25519 · Qiskit Shor Demo
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-3">
        {/* Left column: overview */}
        <section className="md:col-span-2 space-y-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Project Overview
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              This dashboard will visualise benchmark results for the
              classical, post-quantum, and hybrid key exchanges, as well as
              outputs from the Qiskit-based Shor&apos;s algorithm demo.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Benchmark Results (placeholder)
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Charts comparing handshake latency and throughput for
              X25519, Kyber, and the hybrid scheme will appear here.
            </p>
            <div className="mt-4 h-48 rounded-md border border-dashed border-slate-700 bg-slate-900/70 flex items-center justify-center text-xs text-slate-500">
              Benchmark charts coming soon…
            </div>
          </div>
        </section>

        {/* Right column: quantum demo / status */}
        <section className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              Quantum Threat Demo
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              This panel will display results from the Qiskit Shor demo
              (e.g. factoring 15 into 3 × 5) and explain why Kyber is
              not broken by this attack.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-semibold text-slate-200">
              API Status
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Once the Flask backend is connected, this card can show
              whether benchmark and handshake endpoints are reachable.
            </p>
            <div className="mt-3 inline-flex rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400">
              Backend not connected yet
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
