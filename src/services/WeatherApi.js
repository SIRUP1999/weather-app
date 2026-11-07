const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export class CityNotFoundError extends Error {
  constructor(city) {
    super(`No city found for "${city}"`);
    this.name = "CityNotFoundError";
  }
}

async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function fetchWeather(request, signal) {
  // Request 1: city name -> coordinates
  const geoParams = new URLSearchParams({
    name: request.city,
    count: "1",
    language: "en",
    format: "json",
  });
  const geo = await getJson(`${GEOCODING_URL}?${geoParams}`, signal);

  if (!geo.results || geo.results.length === 0) {
    throw new CityNotFoundError(request.city);
  }
  const place = geo.results[0];

  // Request 2: coordinates -> weather
  const forecastParams = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 5,
  });
  const forecast = await getJson(`${FORECAST_URL}?${forecastParams}`, signal);

  // Reshape the API's data into what our UI wants
  return {
    place: {
      name: place.name,
      region: place.admin1 ?? "",
      country: place.country ?? "",
    },
    current: {
      temperature: forecast.current.temperature_2m,
      feelsLike: forecast.current.apparent_temperature,
      humidity: forecast.current.relative_humidity_2m,
      windSpeed: forecast.current.wind_speed_10m,
      windUnit: forecast.current_units.wind_speed_10m,
      weatherCode: forecast.current.weather_code,
    },
    daily: forecast.daily.time.map((date, index) => ({
      date,
      weatherCode: forecast.daily.weather_code[index],
      max: forecast.daily.temperature_2m_max[index],
      min: forecast.daily.temperature_2m_min[index],
    })),
  };
}
