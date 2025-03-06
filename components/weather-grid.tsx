import { WeatherJson, WeatherState } from "@/lib/weather";

type WeatherGridProps = {
  weathers: WeatherJson[];
  timestamp: Date;
};

const icons: { [key in WeatherState]: string } = {
  Sunny: "☀️",
  Rainy: "🌧️",
  Snowy: "❄️",
  Windy: "💨",
  Stormy: "⛈️",
  SevereWindstorm: "🌪️",
  Hurricane: "🌀",
  Tornado: "🌪️",
  ExtremeHeat: "🔥",
  ExtremeCold: "🥶",
  ExtremelyHumid: "💦",
};

export default function WeatherGrid({ weathers, timestamp }: WeatherGridProps) {
  return (
    <>
      <span className="mb-4">
        Last Updated: {timestamp.toLocaleTimeString()}
      </span>
      <div className="flex max-w-5/6 overflow-x-scroll">
        {weathers.map((weather, idx) => (
          <div key={idx} className="border flex items-center flex-col p-4">
            <p className="whitespace-nowrap mb-4">
              {new Date(weather.date).toLocaleDateString()}
            </p>{" "}
            <p className="whitespace-nowrap mb-2">{weather.state}</p>
            <i className="text-5xl">{icons[weather.state]}</i>
            <table className="mt-4">
              <tbody>
                <tr className="whitespace-nowrap">
                  <th className="pr-2">Minimum Temperature</th>
                  <td>{weather.minTemperature}˚C</td>
                </tr>
                <tr className="whitespace-nowrap">
                  <th className="pr-2">Maximum Temperature</th>
                  <td>{weather.maxTemperature}˚C</td>
                </tr>
                <tr className="whitespace-nowrap">
                  <th className="pr-2">Wind</th>
                  <td>
                    {weather.wind.speed}km/h [{weather.wind.direction}]
                  </td>
                </tr>
                <tr className="whitespace-nowrap">
                  <th className="pr-2">Humidity</th>
                  <td>{weather.humidity}%</td>
                </tr>
                <tr className="whitespace-nowrap">
                  <th className="pr-2">Description</th>
                  <td>{weather.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
