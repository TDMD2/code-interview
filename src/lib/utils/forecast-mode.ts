import { ForecastDay } from "@/services/weather";
import { CommuteMode } from "@/lib/recommendation";

export interface ForecastModeRecommendation {
  mode: CommuteMode;
  colorClass: string;
}

/**
 * Derives a simple commute mode recommendation from a single forecast day.
 * This is a heuristic — it does not apply traffic data (which is unknown ahead of time).
 */
export function getRecommendedModeForForecast(day: ForecastDay): ForecastModeRecommendation {
  if (day.precipitationProbability > 30) {
    return { mode: 'Bus',  colorClass: 'bg-primary/10 text-primary' };
  }
  if (day.maxTemp > 15) {
    return { mode: 'Bike', colorClass: 'bg-secondary/10 text-secondary' };
  }
  return   { mode: 'Car',  colorClass: 'bg-primary-container/10 text-primary-container' };
}
