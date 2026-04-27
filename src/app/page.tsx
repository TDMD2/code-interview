import Navigation from "@/components/Navigation";
import HeroRecommendation from "@/components/HeroRecommendation";
import WeatherWidget from "@/components/WeatherWidget";
import TrafficCard from "@/components/TrafficCard";
import WeeklyForecast from "@/components/WeeklyForecast";

import { fetchCurrentWeather, fetchWeeklyForecast } from "@/services/weather";
import { getMockTraffic } from "@/services/traffic";
import { getCommuteRecommendation } from "@/lib/recommendation";

// Revalidate page data every hour
export const revalidate = 3600;

export default async function Home() {
  // Fetch data on the server
  const currentWeather = await fetchCurrentWeather();
  const weeklyForecast = await fetchWeeklyForecast();
  const trafficStatus = getMockTraffic();
  
  // Compute recommendation
  const recommendation = getCommuteRecommendation(
    currentWeather.precipitationProbability,
    currentWeather.windSpeed,
    trafficStatus.level
  );

  return (
    <>
      <Navigation />
      <div className="flex pt-16">
        <main className="flex-1 p-margin grid grid-cols-12 gap-gutter w-full">
          <HeroRecommendation recommendation={recommendation} />
          <WeatherWidget weather={currentWeather} />
          <TrafficCard traffic={trafficStatus} />
          <WeeklyForecast forecast={weeklyForecast} />
        </main>
      </div>
    </>
  );
}
