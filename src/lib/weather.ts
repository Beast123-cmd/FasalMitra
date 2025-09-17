export interface CurrentWeather {
  temperatureC: number;
  humidityPct?: number;
  precipitationMm?: number;
}

export async function fetchOpenMeteo(lat: number, lon: number): Promise<CurrentWeather>
{
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current_weather", "true");
  url.searchParams.set("hourly", "relative_humidity_2m,precipitation");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();

  const temperatureC = data?.current_weather?.temperature ?? 0;
  const humiditySeries = data?.hourly?.relative_humidity_2m as number[] | undefined;
  const precipitationSeries = data?.hourly?.precipitation as number[] | undefined;

  return {
    temperatureC,
    humidityPct: humiditySeries?.[0],
    precipitationMm: precipitationSeries?.[0],
  };
}

export interface SoilData {
  soilMoistureVol?: number; // m3/m3
  soilTemperatureC?: number;
}

export async function fetchSoil(lat: number, lon: number): Promise<SoilData>
{
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


