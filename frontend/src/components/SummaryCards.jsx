// function SummaryCards({ data }) {
//     return (
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        
//         <div style={cardStyle}>
//           <h3>ECDH Avg Time</h3>
//           <p>{data.ecdh.summary.avg_total_time.toFixed(6)} s</p>
//         </div>
  
//         <div style={cardStyle}>
//           <h3>Kyber Avg Time</h3>
//           <p>{data.kyber.summary.avg_total_time.toFixed(6)} s</p>
//         </div>
  
//         <div style={cardStyle}>
//           <h3>Hybrid Avg Time</h3>
//           <p>{data.hybrid.summary.avg_total_time.toFixed(6)} s</p>
//         </div>
  
//       </div>
//     );
//   }
  
//   const cardStyle = {
//     padding: "15px",
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     width: "200px",
//     textAlign: "center",
//     backgroundColor: "#f9f9f9"
//   };
  
//   export default SummaryCards;
function SummaryCards({ data }) {
    return (
      <div className="flex">
        <div className="card summary-card">
          <h3>ECDH Avg Time</h3>
          <p>{data.ecdh.summary.avg_total_time.toFixed(6)} s</p>
        </div>
  
        <div className="card summary-card">
          <h3>Kyber Avg Time</h3>
          <p>{data.kyber.summary.avg_total_time.toFixed(6)} s</p>
        </div>
  
        <div className="card summary-card">
          <h3>Hybrid Avg Time</h3>
          <p>{data.hybrid.summary.avg_total_time.toFixed(6)} s</p>
        </div>
      </div>
    );
  }
  
  export default SummaryCards;