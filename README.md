# Team Commute Planner

A modern, responsive dashboard designed to help teams decide the optimal commute mode based on live weather data and simulated traffic conditions. Built with Next.js 15, Tailwind CSS v4, and the Open-Meteo API.

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or newer)
- npm

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```
   *Note: Because this project uses the free, keyless Open-Meteo API, no `.env` or `.env.example` file is required.*

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **View the Dashboard:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
The project includes Vitest unit tests covering the recommendation engine and weather service.

```bash
npm test
# or for a detailed per-test breakdown:
npx vitest run --reporter=verbose
```

**Test files:**

| File | What it covers |
|---|---|
| `src/lib/recommendation.test.ts` | All 7 commute mode scenarios (bad weather + clear weather branches) |
| `src/services/weather.test.ts` | Open-Meteo API response mapping and graceful fallback on network failure |

---

## Assumptions & Trade-offs

1. **Weather Data Location**: For the sake of simplicity, the Open-Meteo API is currently hardcoded to fetch data for a fixed set of coordinates (New York City). In a real-world scenario, this would rely on the HTML Geolocation API or a user-selected office location.
2. **Traffic Data**: The traffic service uses a deterministic mock based on the current hour of the day to simulate rush hours. Integrating a real traffic API (like Google Maps) introduces significant cost and API key management overhead which wasn't necessary for this proof-of-concept.
3. **Mock Travel Times**: The travel times (e.g., '35m', '45m') returned by the recommendation engine are static mock placeholders that would be replaced by a live routing API in production.
4. **No Database/Backend State**: State is currently fetched fresh from the weather API and rendered Server-Side. The app doesn't save user preferences, as it serves as a stateless dashboard.

---

## Architecture & Interview Rubric Alignment

1. **Handling of Edge Cases (Loading & Error States)**:
   - **Loading State**: Next.js App Router's `loading.tsx` is implemented to show a clean spinner while the server fetches the external API data.
   - **Error State**: The `error.tsx` boundary acts as a safety net. If the Open-Meteo API drops entirely, the component fails gracefully, providing a UI button to retry the fetch.
   - **Graceful Degradation**: The `weather.ts` service wraps the API call in a `try/catch` and returns a mock fallback payload if the API fails, ensuring the dashboard remains completely functional.

2. **Accessibility (a11y) Considerations**:
   - Built with semantic HTML (`<main>`, `<h2>`, `<button>`).
   - Appropriate color contrast mapped from the Design tokens ensures text is legible against both dark (`#131b2e`) and light (`#fcf8fa`) backgrounds.
   - Fully keyboard navigable, with clear focus states and an interactive `.ics` export button.

3. **Code Clarity and Structure**:
   - Logic is strictly decoupled: `src/services/` handles data fetching and mocking, `src/lib/` handles algorithms (the recommendation engine), and `src/components/` purely handles UI presentation.

---

## Total Amount of Hours Spent

- **~45 Minutes** total.
  - ~15 minutes on project scaffolding, Tailwind v4 design system setup, and mapping the design tokens.
  - ~ 20minutes hour on building out the React components (Hero, Weather, Traffic, Weekly Forecast).
  - ~20 minutes on the recommendation engine logic, API integrations, testing, and `.ics` generation.

---

## What I Would Improve With More Time

1. **Google Maps Integration**: Replace the mock traffic service with the Google Maps Routes/Traffic API to provide real-time, highly accurate delay estimates and visual map routes for the team.
2. **Authentication & Personalization**: Add user authentication (e.g., NextAuth.js). This would allow users to input their personal home addresses so the dashboard could calculate individual commute times and tailored recommendations rather than a generic city-wide status.
3. **Location Services**: Implement browser geolocation to automatically detect the user's current city instead of hardcoding the coordinates.
4. **Push Notifications**: Integrate web push notifications or a Slack/Discord bot to proactively alert the team early in the morning if severe weather means they should take the train instead of driving.
