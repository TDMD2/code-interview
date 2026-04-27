import { describe, it, expect } from 'vitest';
import { getCommuteRecommendation, CommuteMode, Recommendation } from './recommendation';
import { TrafficLevel } from '@/services/traffic';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Calls getCommuteRecommendation with sensible defaults; override only what the test cares about. */
function recommend({
  precip = 0,
  wind   = 10,
  traffic = 'Low' as TrafficLevel,
} = {}): Recommendation {
  return getCommuteRecommendation(precip, wind, traffic);
}

function expectMode(rec: Recommendation, mode: CommuteMode) {
  expect(rec.mode).toBe(mode);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('getCommuteRecommendation', () => {
  describe('bad weather (rain or strong wind)', () => {
    it('recommends Train when raining and traffic is heavy', () => {
      expectMode(recommend({ precip: 80, traffic: 'Heavy' }), 'Train');
    });

    it('recommends Train when extremely windy and traffic is heavy', () => {
      expectMode(recommend({ wind: 30, traffic: 'Heavy' }), 'Train');
    });

    it('recommends Bus when raining and traffic is moderate', () => {
      expectMode(recommend({ precip: 50, traffic: 'Moderate' }), 'Bus');
    });

    it('recommends Bus when raining and traffic is low', () => {
      expectMode(recommend({ precip: 50, traffic: 'Low' }), 'Bus');
    });
  });

  describe('clear weather', () => {
    it('recommends Bike when traffic is heavy', () => {
      expectMode(recommend({ traffic: 'Heavy' }), 'Bike');
    });

    it('recommends Car when traffic is moderate', () => {
      expectMode(recommend({ traffic: 'Moderate' }), 'Car');
    });

    it('recommends Walk when traffic is low', () => {
      expectMode(recommend({ traffic: 'Low' }), 'Walk');
    });
  });
});
