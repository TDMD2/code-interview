import { TrafficLevel } from "@/services/traffic";

export type CommuteMode = 'Bike' | 'Bus' | 'Car' | 'Walk' | 'Train';

export interface Recommendation {
  mode: CommuteMode;
  advisory: string;
  travelTime: string;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────

const PRECIPITATION_THRESHOLD = 30; // % — above this is considered "rainy"
const WIND_SPEED_THRESHOLD    = 20; // km/h — above this is considered "windy"

// ─── Recommendation rules ────────────────────────────────────────────────────

/**
 * Returns the optimal commute recommendation for today based on current
 * weather conditions and live traffic level.
 */
export function getCommuteRecommendation(
  precipitationProb: number,
  windSpeed: number,
  trafficLevel: TrafficLevel,
): Recommendation {
  const isBadWeather = precipitationProb > PRECIPITATION_THRESHOLD || windSpeed > WIND_SPEED_THRESHOLD;

  if (isBadWeather) {
    return trafficLevel === 'Heavy'
      ? { mode: 'Train', travelTime: '35m', advisory: 'Inclement weather and heavy traffic. The train is the fastest and most reliable option today.' }
      : { mode: 'Bus',   travelTime: '45m', advisory: 'Inclement weather expected. Public transit is recommended to avoid elevated traffic congestion.' };
  }

  if (trafficLevel === 'Heavy')   return { mode: 'Bike', travelTime: '25m', advisory: 'Clear skies but heavy traffic. Biking will bypass the congestion on major routes.' };
  if (trafficLevel === 'Moderate') return { mode: 'Car',  travelTime: '30m', advisory: 'Pleasant weather and manageable traffic. Driving is a comfortable option today.' };

  return { mode: 'Walk', travelTime: '55m', advisory: 'Perfect weather and no rush. Enjoy a refreshing walk to the office!' };
}
