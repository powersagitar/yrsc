import { promises as fs } from "fs";
import { parse } from "csv-parse/sync";
import { Weather, Wind, WindDirection } from "./weather";

type CSVRow = [string, string, string, string, string, string];

export default async function parseWeatherData(): Promise<Weather[]> {
  const path = process.cwd() + "/resources/data.csv";
  console.log(path);
  const content = await fs.readFile(path);
  const records = parse(content, { bom: true }) as CSVRow[];

  const payload = records.slice(1, 8);

  return payload.map((row) => {
    const date = new Date(row[0]);
    const minTemperature = Number(row[1]);
    const maxTemperature = Number(row[2]);
    const humidity = Number(row[3]);
    const windSpeed = Number(row[4]);
    const windDirection = row[5] as WindDirection;

    return Weather.derive({
      date,
      minTemperature,
      maxTemperature,
      humidity,
      wind: new Wind(windSpeed, windDirection),
    });
  });
}
