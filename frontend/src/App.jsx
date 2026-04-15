import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/benchmark")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading benchmark data...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Dashboard data={data} />
    </div>
  );
}

export default App;