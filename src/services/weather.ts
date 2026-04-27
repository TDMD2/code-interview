// New York City — default coordinate used for all weather API calls
const DEFAULT_LAT =  40.7128;
const DEFAULT_LON = -74.0060;

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const REVALIDATE_SECONDS = 3600;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  precipitationProbability: number;
  conditionCode: number;
  isDay: boolean;
  time: string;
}

export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  conditionCode: number;
}

// ─── Fallbacks ────────────────────────────────────────────────────────────────

/** Fallback used when the current-weather API call fails. */
const CURRENT_WEATHER_FALLBACK: WeatherData = {
  temperature: 18,
  windSpeed: 12,
  precipitationProbability: 80,
  conditionCode: 61, // WMO code: moderate rain
  isDay: true,
  time: new Date().toISOString(),
};

/** Fallback used when the weekly-forecast API call fails. */
const WEEKLY_FORECAST_FALLBACK: ForecastDay[] = [
  { date: '2026-04-25', maxTemp: 18, minTemp: 10, precipitationProbability: 80, conditionCode: 61 },
  { date: '2026-04-26', maxTemp: 22, minTemp: 12, precipitationProbability:  0, conditionCode:  0 },
  { date: '2026-04-27', maxTemp: 20, minTemp: 11, precipitationProbability: 10, conditionCode:  2 },
  { date: '2026-04-28', maxTemp: 19, minTemp: 10, precipitationProbability: 20, conditionCode:  3 },
  { date: '2026-04-29', maxTemp: 24, minTemp: 14, precipitationProbability:  0, conditionCode:  0 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildUrl(params: Record<string, string>): string {
  const query = new URLSearchParams({ latitude: String(DEFAULT_LAT), longitude: String(DEFAULT_LON), ...params });
  return `${BASE_URL}?${query}`;
}

async function apiFetch(url: string) {
  const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetches today's current conditions from Open-Meteo. */
export async function fetchCurrentWeather(): Promise<WeatherData> {
  const url = buildUrl({
    current: 'temperature_2m,precipitation,weather_code,wind_speed_10m,is_day',
    timezone: 'auto',
  });

  try {
    const data = await apiFetch(url);
    const c    = data.current;
    return {
      temperature: Math.round(c.temperature_2m),
      windSpeed: c.wind_speed_10m,
      // Open-Meteo /current lacks precipitation probability — use binary fallback.
      precipitationProbability: c.precipitation > 0 ? 80 : 0,
      conditionCode: c.weather_code,
      isDay: c.is_day === 1,
      time: c.time,
    };
  } catch (error) {
    console.error('fetchCurrentWeather failed, using fallback', error);
    return CURRENT_WEATHER_FALLBACK;
  }
}

/** Fetches the 5-day daily forecast from Open-Meteo. */
export async function fetchWeeklyForecast(): Promise<ForecastDay[]> {
  const url = buildUrl({
    daily:    'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
  });

  try {
    const data = await apiFetch(url);
    return data.daily.time.slice(0, 5).map((time: string, i: number) => ({
      date: time,
      maxTemp: Math.round(data.daily.temperature_2m_max[i]),
      minTemp: Math.round(data.daily.temperature_2m_min[i]),
      precipitationProbability: data.daily.precipitation_probability_max[i],
      conditionCode: data.daily.weather_code[i],
    }));
  } catch (error) {
    console.error('fetchWeeklyForecast failed, using fallback', error);
    return WEEKLY_FORECAST_FALLBACK;
  }
}
