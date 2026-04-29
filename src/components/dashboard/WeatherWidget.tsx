import { Droplets, Wind } from "lucide-react";
import { WeatherData } from "@/services/weather";
import { getWeatherIcon, getWeatherLabel } from "@/components/ui/weather-codes";

interface WeatherWidgetProps {
  weather: WeatherData;
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-headline-md text-on-surface">Weather</h2>
          <p className="font-body-sm text-outline">Current conditions</p>
        </div>
        {getWeatherIcon(weather.conditionCode)}
      </div>

      <div className="flex-1 flex flex-col justify-center items-center py-4 border-b border-surface-variant mb-4">
        <div className="font-headline-lg text-[48px] leading-none text-on-surface">
          {weather.temperature}°
        </div>
        <div className="font-body-sm text-outline mt-1">
          {getWeatherLabel(weather.conditionCode)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <WeatherStat icon={<Droplets className="w-5 h-5 text-outline mb-1" />} value={`${weather.precipitationProbability}%`} label="Precip" />
        <WeatherStat icon={<Wind     className="w-5 h-5 text-outline mb-1" />} value={`${weather.windSpeed} km/h`}            label="Wind"  />
      </div>
    </div>
  );
}

// ─── Private sub-components ───────────────────────────────────────────────────

interface WeatherStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function WeatherStat({ icon, value, label }: WeatherStatProps) {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <span className="font-data-mono text-on-surface">{value}</span>
      <span className="font-label-caps text-outline">{label}</span>
    </div>
  );
}
