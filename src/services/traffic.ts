export type TrafficLevel = 'Low' | 'Moderate' | 'Heavy';

export interface TrafficStatus {
  level: TrafficLevel;
  description: string;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const RUSH_HOUR_MORNING_START = 7;
const RUSH_HOUR_MORNING_END   = 9;
const RUSH_HOUR_EVENING_START = 16;
const RUSH_HOUR_EVENING_END   = 18;
const MIDDAY_END              = 16;

const TRAFFIC_STATUSES: Record<TrafficLevel, TrafficStatus> = {
  Heavy: {
    level: 'Heavy',
    description: 'Major delays on all arterial routes. High congestion entering the city center. Public transit recommended.',
    color: 'bg-error',
  },
  Moderate: {
    level: 'Moderate',
    description: 'Overall traffic is moderate across major routes. Some minor slow downs observed near the city center, but no major incidents reported. Public transit is running on schedule.',
    color: 'bg-[#eab308]',
  },
  Low: {
    level: 'Low',
    description: 'Traffic is light. All major routes are clear and operating at normal speeds.',
    color: 'bg-[#22c55e]',
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the current hour (0–23) in US Eastern Time.
 * Forces Eastern Time so mock rush-hour windows are consistent across
 * server environments (e.g., Vercel defaults to UTC).
 */
function getEasternHour(): number {
  const str  = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false });
  const hour = parseInt(str, 10);
  return hour === 24 ? 0 : hour; // midnight edge-case: toLocaleString returns "24"
}

function isMorningRush(hour: number): boolean {
  return hour >= RUSH_HOUR_MORNING_START && hour <= RUSH_HOUR_MORNING_END;
}

function isEveningRush(hour: number): boolean {
  return hour >= RUSH_HOUR_EVENING_START && hour <= RUSH_HOUR_EVENING_END;
}

function isMidday(hour: number): boolean {
  return hour > RUSH_HOUR_MORNING_END && hour < MIDDAY_END;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Returns simulated traffic conditions based on the current time of day. */
export function getMockTraffic(): TrafficStatus {
  const hour = getEasternHour();

  if (isMorningRush(hour) || isEveningRush(hour)) return TRAFFIC_STATUSES.Heavy;
  if (isMidday(hour))                              return TRAFFIC_STATUSES.Moderate;
  return                                                  TRAFFIC_STATUSES.Low;
}
