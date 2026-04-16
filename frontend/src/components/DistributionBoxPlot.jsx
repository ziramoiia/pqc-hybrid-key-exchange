// 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import {
    BoxPlotController,
    BoxAndWiskers
} from "@sgratzl/chartjs-chart-boxplot";

import { Chart } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    BoxPlotController,
    BoxAndWiskers
);

function DistributionBoxPlot({ data, includeFirst }) {
    if (!data) return <p>Loading...</p>;

    const getValues = (results) => {
        const filtered = includeFirst ? results : results.slice(1);
        return filtered.map(r => r.total_time * 1000);
    };

    const chartData = {
        labels: ["ECDH", "Kyber", "Hybrid"],
        datasets: [
            {
                label: "Execution Time (ms)",
                data: [
                    getValues(data.ecdh.results),
                    getValues(data.kyber.results),
                    getValues(data.hybrid.results)
                ],
                backgroundColor: [
                    "rgba(59, 130, 246, 0.3)",
                    "rgba(16, 185, 129, 0.3)",
                    "rgba(245, 158, 11, 0.3)"
                ],
                borderColor: [
                    "rgb(59, 130, 246)",
                    "rgb(16, 185, 129)",
                    "rgb(245, 158, 11)"
                ],
                borderWidth: 2,
                outlierColor: "#ef4444",
                outlierBorderColor: "#7f1d1d",
                outlierRadius: 2,
                outlierBorderWidth: 1,

                meanBackgroundColor: "#111827",   // dark (almost black)
                meanBorderColor: "#111827",
                meanRadius: 2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14
                    }
                }
            }
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Execution Time (ms)"
                }
            }
        }
    };
    return (
        <Chart type="boxplot" data={chartData} options={options} />
    );
}

export default DistributionBoxPlot;