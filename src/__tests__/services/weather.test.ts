import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCurrentWeather, fetchWeeklyForecast } from '../../services/weather';

describe('Weather Service - Open-Meteo API Integration', () => {
  // Save the original fetch function so we can restore it later
  const originalFetch = global.fetch;

  beforeEach(() => {
    // Mock the global fetch function before each test
    global.fetch = vi.fn();
  });

  afterEach(() => {
    // Restore the original fetch function after each test
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it('successfully fetches and maps current weather data', async () => {
    // 1. Create a fake response that looks exactly like what Open-Meteo returns
    const mockApiResponse = {
      current: {
        time: "2026-04-27T10:00",
        temperature_2m: 18.4,
        precipitation: 1.5,
        weather_code: 61,
        wind_speed_10m: 14.2,
        is_day: 1
      }
    };

    // 2. Tell our mocked fetch to return this fake response
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });

    // 3. Call our service function
    const result = await fetchCurrentWeather();

    // 4. Verify the fetch was called with the correct Open-Meteo URL
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.open-meteo.com/v1/forecast'),
      expect.any(Object)
    );

    // 5. Verify that our service correctly parsed the raw API data into our app's format
    expect(result).toEqual({
      temperature: 18, // 18.4 rounded down
      windSpeed: 14.2,
      precipitationProbability: 80, // Because precipitation > 0
      conditionCode: 61,
      isDay: true, // Because is_day === 1
      time: "2026-04-27T10:00",
    });
  });

  it('falls back to default mock data if the API call fails', async () => {
    // 1. Force the fetch to fail (e.g. simulating a network outage or 500 error)
    (global.fetch as any).mockRejectedValue(new Error('Network error'));

    // 2. Call the service
    const result = await fetchCurrentWeather();

    // 3. Verify it gracefully caught the error and returned the fallback mock data
    expect(result).toBeDefined();
    expect(result.temperature).toBe(18); // Our hardcoded fallback temp
    expect(result.conditionCode).toBe(61);
  });
});
