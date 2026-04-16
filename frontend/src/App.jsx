import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const [data, setData] = useState(null);
  // so fetchData can be called anytime not just at page load
  const fetchData = async () => { 
    try {
      const res = await fetch("http://127.0.0.1:5000/api/benchmarkjson");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
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
      <Dashboard data={data} refreshData={fetchData} />;
    </div>
  );
}

export default App;