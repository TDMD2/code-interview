'use client';

import { ForecastDay } from "@/services/weather";
import { getWeatherIcon } from "@/lib/utils/weather-codes";
import { getSmallCommuteModeIcon } from "@/lib/utils/commute-icons";
import { getRecommendedModeForForecast } from "@/lib/utils/forecast-mode";
import { generateIcsContent, downloadIcsFile } from "@/lib/utils/calendar-export";

interface WeeklyForecastProps {
  forecast: ForecastDay[];
}

export default function WeeklyForecast({ forecast }: WeeklyForecastProps) {
  const handleExport = () => {
    const content = generateIcsContent(forecast);
    downloadIcsFile(content);
  };

  return (
    <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-md text-on-surface">Weekly Commute Forecast</h2>
        <button
          onClick={handleExport}
          className="bg-primary text-on-primary font-label-caps py-sm px-md rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
        >
          Export to Calendar (.ics)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, i) => (
          <ForecastDayCard key={day.date} day={day} highlight={i === 0 || i === 3} />
        ))}
      </div>
    </div>
  );
}

// ─── Private sub-components ───────────────────────────────────────────────────

interface ForecastDayCardProps {
  day: ForecastDay;
  highlight: boolean;
}

function ForecastDayCard({ day, highlight }: ForecastDayCardProps) {
  const rec     = getRecommendedModeForForecast(day);
  const dateObj = new Date(day.date);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const bgClass = highlight ? 'bg-surface-container-low' : 'bg-surface-container-lowest';

  return (
    <div className={`flex flex-col items-center p-sm border border-surface-variant rounded-lg ${bgClass} hover:-translate-y-1 transition-transform duration-200 hover:shadow-sm cursor-pointer`}>
      <div className="font-label-caps text-on-surface mb-2">{dayName} ({monthDay})</div>

      <div className="mb-2">
        {getWeatherIcon(day.conditionCode)}
      </div>

      <div className="font-data-mono text-on-surface mb-4">
        {day.maxTemp}°
      </div>

      <div className={`${rec.colorClass} px-3 py-1 rounded-full flex items-center gap-1`}>
        {getSmallCommuteModeIcon(rec.mode)}
        <span className="font-label-caps text-[10px]">{rec.mode}</span>
      </div>
    </div>
  );
}
