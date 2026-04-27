import { CloudRain, Sun, Cloud, Wind, Snowflake, CloudLightning } from "lucide-react";

/**
 * Returns a Lucide icon component matching the WMO weather interpretation code.
 * @see https://open-meteo.com/en/docs#weathervariables
 */
export function getWeatherIcon(code: number) {
  if (code === 0)                         return <Sun className="w-10 h-10 text-[#eab308]" />;
  if (code >= 1  && code <= 3)            return <Cloud className="w-10 h-10 text-outline" />;
  if (code >= 51 && code <= 67)           return <CloudRain className="w-10 h-10 text-secondary" />;
  if (code >= 71 && code <= 77)           return <Snowflake className="w-10 h-10 text-secondary-fixed-dim" />;
  if (code >= 80 && code <= 82)           return <CloudRain className="w-10 h-10 text-secondary" />;
  if (code >= 95)                         return <CloudLightning className="w-10 h-10 text-error" />;
  return                                         <Cloud className="w-10 h-10 text-outline" />;
}

/**
 * Returns a human-readable label for a WMO weather interpretation code.
 */
export function getWeatherLabel(code: number): string {
  if (code === 0)               return "Clear skies";
  if (code >= 1  && code <= 3)  return "Partly cloudy";
  if (code >= 51 && code <= 67) return "Light Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95)               return "Thunderstorm";
  return                               "Cloudy";
}
