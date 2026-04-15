function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function SummaryCards({ data }) {
  return (
    <div className="grid grid-cols-6 gap-4">

      <Card
        title="ECDH Avg Time"
        value={`${data.ecdh.summary.avg_total_time.toFixed(6)} s`}
      />

      <Card
        title="Kyber Avg Time"
        value={`${data.kyber.summary.avg_total_time.toFixed(6)} s`}
      />

      <Card
        title="Hybrid Avg Time"
        value={`${data.hybrid.summary.avg_total_time.toFixed(6)} s`}
      />

      {/* <Card
        title="ECDH Success Rate"
        value={`${(data.ecdh.summary.success_rate * 100).toFixed(1)}%`}
      />

      <Card
        title="Kyber Success Rate"
        value={`${(data.kyber.summary.success_rate * 100).toFixed(1)}%`}
      /> */}
      <div className="col-start-5 col-span-2">
        <Card
          title="Global iterations"
          value={`${data.iterations}`}
        />
      </div>

    </div>
  );
}

export default SummaryCards;