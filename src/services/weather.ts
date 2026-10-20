import { Location } from '../state/types';
export interface Weather {
  temperature: number;
  precipitation: number;
  speed: number;
  direction: string;
  time: string;
}
export async function getWeather(
  location: Location,
  signal: AbortSignal,
): Promise<Weather> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m&timezone=auto`,
    { signal },
  );
  if (!response.ok) {
    throw new Error('Weather is temporarily unavailable.');
  }
  const data = await response.json();
  const current = data.current;
  if (
    !current ||
    ![
      current.temperature_2m,
      current.precipitation,
      current.wind_speed_10m,
      current.wind_direction_10m,
    ].every(value => typeof value === 'number' && Number.isFinite(value))
  ) {
    throw new Error('Weather data is unavailable for this location.');
  }
  return {
    temperature: current.temperature_2m,
    precipitation: current.precipitation,
    speed: current.wind_speed_10m,
    direction: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][
      Math.round(current.wind_direction_10m / 45) % 8
    ],
    time: current.time,
  };
}
