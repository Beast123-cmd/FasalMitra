// Existing interfaces and functions
export interface CurrentWeather {
  temperatureC: number;
  humidityPct?: number;
  precipitationMm?: number;
}

export async function fetchOpenMeteo(lat: number, lon: number): Promise<CurrentWeather> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current_weather", "true");
  url.searchParams.set("hourly", "relativehumidity_2m,precipitation");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  const temperatureC = data?.current_weather?.temperature ?? 0;
  const humiditySeries = data?.hourly?.relativehumidity_2m as number[] | undefined;
  const precipitationSeries = data?.hourly?.precipitation as number[] | undefined;

  return {
    temperatureC,
    humidityPct: humiditySeries?.[0],
    precipitationMm: precipitationSeries?.[0],
  };
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  tempMaxC: number;
  tempMinC: number;
  precipitationMm: number;
  weatherCode: number; // Open-Meteo weather code
}

export async function fetch7DayForecast(lat: number, lon: number): Promise<DailyForecast[]> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch 7-day forecast");

  const data = await res.json();
  const dates: string[] = data.daily.time;
  const tempMax: number[] = data.daily.temperature_2m_max;
  const tempMin: number[] = data.daily.temperature_2m_min;
  const precipitation: number[] = data.daily.precipitation_sum;
  const codes: number[] = data.daily.weathercode;

  return dates.map((date, idx) => ({
    date,
    tempMaxC: tempMax[idx],
    tempMinC: tempMin[idx],
    precipitationMm: precipitation[idx],
    weatherCode: codes[idx],
  }));
}

export interface SoilData {
  soilMoistureVol?: number; // m3/m3
  soilTemperatureC?: number;
}

export async function fetchSoil(lat: number, lon: number): Promise<SoilData> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", "soil_temperature_0cm,soil_moisture_0_to_1cm");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch soil data");

  const data = await res.json();
  const t = data?.hourly?.soil_temperature_0cm as number[] | undefined;
  const m = data?.hourly?.soil_moisture_0_to_1cm as number[] | undefined;

  return {
    soilTemperatureC: t?.[0],
    soilMoistureVol: m?.[0],
  };
}

// -----------------------
// New: Real-time weather alerts
// -----------------------

export interface WeatherAlertAPI {
  id: string;
  title: string;
  description: string;
  severity: string; // 'high' | 'medium' | 'low'
  event: string;
  start: number;
  end: number;
}

export async function fetchWeatherAlerts(lat: number, lon: number): Promise<WeatherAlertAPI[]> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("alerts", "true");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch weather alerts");

  const data = await res.json();
  return data?.alerts?.map((alert: any, idx: number) => ({
    id: String(idx),
    title: alert.event ?? 'Weather Alert',
    description: alert.description ?? '',
    severity: alert.severity ?? 'medium',
    event: alert.event ?? '',
    start: alert.start ?? 0,
    end: alert.end ?? 0,
  })) ?? [];
}
