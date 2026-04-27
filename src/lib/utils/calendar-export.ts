import { ForecastDay } from "@/services/weather";
import { getRecommendedModeForForecast } from "@/lib/utils/forecast-mode";

/**
 * Generates the content of an ICS (iCalendar) file from a weekly forecast.
 * Each day becomes a full-day VEVENT with the recommended commute mode as the summary.
 */
export function generateIcsContent(forecast: ForecastDay[]): string {
  const events = forecast
    .map((day) => {
      const mode    = getRecommendedModeForForecast(day).mode;
      const dateStr = day.date.split('T')[0].replace(/-/g, '');
      return [
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${dateStr}`,
        `SUMMARY:Commute Mode: ${mode}`,
        `DESCRIPTION:Recommended commute mode based on weather forecast (${day.maxTemp}C).`,
        'END:VEVENT',
      ].join('\n');
    })
    .join('\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CommuteFlow//EN',
    events,
    'END:VCALENDAR',
  ].join('\n');
}

/**
 * Triggers a browser download of the given ICS content as a .ics file.
 */
export function downloadIcsFile(content: string, filename = 'commute_forecast.ics'): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url  = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href  = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}
