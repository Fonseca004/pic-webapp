// components/Weather.tsx
"use client";

import { useRegion } from "@/components/context/RegionContext";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Weather() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { region } = useRegion();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${region}.json`
        );

        if (!res.ok) throw new Error("Failed to fetch weather data");

        const json = await res.json();

        const labels = json.data.map((d: any) =>
          d.forecastDate.slice(5)
        ); // Format: MM-DD
        const tMin = json.data.map((d: any) => parseFloat(d.tMin));
        const tMax = json.data.map((d: any) => parseFloat(d.tMax));
        const precipitaProb = json.data.map((d: any) =>
          parseFloat(d.precipitaProb)
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Min Temperature (°C)",
              backgroundColor: "rgba(59, 130, 246, 0.6)", // blue-500
              borderColor: "rgba(59, 130, 246, 1)",
              data: tMin,
              yAxisID: "y",
              borderRadius: 4,
              barPercentage: 0.6,
            },
            {
              label: "Max Temperature (°C)",
              backgroundColor: "rgba(239, 68, 68, 0.6)", // red-500
              borderColor: "rgba(239, 68, 68, 1)",
              data: tMax,
              yAxisID: "y",
              borderRadius: 4,
              barPercentage: 0.6,
            },
            {
              label: "Precipitation Probability (%)",
              type: "bar" as const,
              backgroundColor: "rgba(75, 192, 192, 0.6)", // teal-500
              borderColor: "rgba(75, 192, 192, 1)",
              data: precipitaProb,
              yAxisID: "y1",
              borderRadius: 4,
              barPercentage: 0.6,
            },
          ],
        });
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, // Allows full height control
    indexAxis: "x" as const,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw} ${
              context.dataset.label.includes("Probability") ? "%" : "°C"
            }`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "#333",
        anchor: "end" as const,
        align: "top" as const,
        formatter: (value) => value,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        ticks: {
          beginAtZero: false,
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Precipitation (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          max: 100,
          min: 0,
        },
      },
    },
  };

  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] bg-white rounded-md shadow-md mx-4 overflow-hidden">
      <div className="h-[calc(100vh_-_290px)] mt-8 px-2 pb-2 flex flex-col">
        {loading && (
          <p className="text-center py-8">Loading weather data...</p>
        )}
        {error && (
          <p className="text-center py-8 text-red-500">Error: {error}</p>
        )}
        {!loading && !error && chartData && (
          <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
}