import { FiThermometer, FiDroplet } from 'react-icons/fi';
import type { FC } from 'react';

interface WeatherDay {
  forecastDate: string;
  tMin: string;
  tMax: string;
  precipitaProb: string;
  weatherType: number;
}

type WeatherCardProps = {
  day: WeatherDay;
};

const WeatherCard: FC<WeatherCardProps> = ({ day }) => {
  const forecastDate = new Date(day.forecastDate);
  const dayOfWeek = forecastDate.toLocaleDateString("pt-PT", { weekday: "short" }).toUpperCase(); // Uppercase

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200">
      {/* Weekday */}
      <span className="font-medium text-gray-700 whitespace-nowrap w-[80px]"> {/* Fixed width */}
        {dayOfWeek}
      </span>

      {/* Thermometer Icon */}
      <FiThermometer size={20} className="text-red-500 ml-4" />

      {/* Temperature Values */}
      <div className="ml-auto mr-2 flex items-center space-x-2">
        <span className="text-sm text-gray-500">{day.tMin}°</span>
        <span className="font-semibold text-xl">{day.tMax}°</span>
      </div>

      {/* Precipitation Info */}
      <div className="flex items-center space-x-1 text-right ml-4">
        <FiDroplet size={14} className="text-blue-500" />
        <span className="text-xs text-gray-500">{day.precipitaProb || '0'}%</span>
      </div>
    </div>
  );
};

export default WeatherCard;