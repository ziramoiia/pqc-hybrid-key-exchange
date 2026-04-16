import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Scatter } from "react-chartjs-2";
import { convertMs } from "../utils/unitConversion";

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

function EncapDecapScatter({ data, includeFirst }) {
    if (!data) return <p>Loading...</p>;

    // Filter results to give encap and decap time to pass as (x, y) 
    const process = (results) => {
        const filtered = includeFirst ? results : results.slice(1);

        return filtered.map(r => ({
            x: convertMs(r.encap_time),
            y: convertMs(r.decap_time)
        }));
    };
    const allPoints = [
        ...process(data.kyber.results),
        ...process(data.hybrid.results)
    ];

    const xValues = allPoints.map(p => p.x);
    const yValues = allPoints.map(p => p.y);

    const min = Math.min(...xValues, ...yValues);
    const max = Math.max(...xValues, ...yValues);
    
    const chartData = {
        datasets: [
            {
                label: "Kyber",
                data: process(data.kyber.results),
                backgroundColor: "#10b981"
            },
            {
                label: "Hybrid",
                data: process(data.hybrid.results),
                backgroundColor: "#f59e0b"
            },
            // y = x reference line
            {
                label: "y = x",
                type: "line",
                data: [
                    { x: min, y: min },
                    { x: max, y: max }
                ],
                borderColor: "#6b7280",
                borderWidth: 2,
                borderDash: [5, 5],   // dashed line
                pointRadius: 0        // no dots
            }
        ]
    };
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Encapsulation Time (ms)"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Decapsulation Time (ms)"
                }
            }
        }
    };

    return <Scatter data={chartData} options={options} />;
}

export default EncapDecapScatter;