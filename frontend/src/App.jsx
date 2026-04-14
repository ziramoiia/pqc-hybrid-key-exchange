import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import "./index.css"; 

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/benchmark")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      {data ? <Dashboard data={data} /> : <p className="loading">Loading...</p>}
    </div>
  );
}

export default App;