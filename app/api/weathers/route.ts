import parseWeatherData from "@/lib/data-parser";
import { WeatherJson } from "@/lib/weather";

export async function GET() {
  const weathers = await parseWeatherData();

  const weathersJson = weathers.map((weather): WeatherJson => {
    return {
      date: weather.getDate(),
      minTemperature: weather.getMinTemperature(),
      maxTemperature: weather.getMaxTemperature(),
      wind: {
        speed: weather.getWind().getSpeed(),
        direction: weather.getWind().getDirection(),
      },
      humidity: weather.getHumidity(),
      state: weather.getState(),
      description: weather.getDescription(),
    };
  });

  return Response.json({ weathers: weathersJson, timestamp: Date.now() });
}
