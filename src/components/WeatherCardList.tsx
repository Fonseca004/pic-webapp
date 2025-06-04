// components/WeatherCardList.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRegion } from "@/components/context/RegionContext";
import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard"; // Import the WeatherCard component

// Map region ID to human-readable name
const REGION_NAMES: Record<string, string> = {
  "1110600": "Lisboa",
  "1010500": "Porto",
  "1030300": "Coimbra",
};

export default function WeatherCardList() {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { region } = useRegion();

  const regionName = REGION_NAMES[region] || "Desconhecido";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/${region}.json` 
        );

        if (!res.ok) throw new Error("Failed to fetch weather data");

        const json = await res.json();
        setWeatherData(json.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [region]);

  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] bg-white rounded-md shadow-md mx-4 overflow-hidden">
      <div className="h-[calc(100vh_-_290px)] mt-8 px-2 pb-2 flex flex-col">
        {/* Header Section */}
        <div className="p-1">
          <h2 className="text-lg font-bold text-center text-gray-800">
            Previsão para: <span className="text-blue-600">{regionName}</span>
          </h2>
        </div>

        {loading && (
          <p className="text-center py-8">Loading weather data...</p>
        )}
        {error && (
          <p className="text-center py-8 text-red-500">Error: {error}</p>
        )}
        {!loading && !error && weatherData.length > 0 && (
          <div>
            {/* Weather Cards */}
            <div className="space-y-2 pt-4">
              {weatherData.map((day, index) => (
                <WeatherCard key={index} day={day} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}