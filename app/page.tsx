"use client";

import WeatherGrid from "@/components/weather-grid";
import { WeatherJson } from "@/lib/weather";
import { H1 } from "@/components/ui/typography";
import { useEffect, useState } from "react";

export default function Home() {
  const [weathers, setWeathers] = useState<WeatherJson[] | undefined>(
    undefined,
  );

  const [timestamp, setTimestamp] = useState<Date>(new Date());

  useEffect(() => {
    const fetchWeathers = () =>
      fetch("/api/weathers")
        .then((res) => res.json())
        .then((data) => {
          setWeathers(data.weathers);
          setTimestamp(new Date(data.timestamp));
        });

    fetchWeathers();
    setInterval(fetchWeathers, 5000);
  }, []);

  return (
    <>
      <H1 className="mb-6">Weather</H1>
      {!weathers ? (
        <p>Loading...</p>
      ) : (
        <WeatherGrid weathers={weathers} timestamp={timestamp} />
      )}
    </>
  );
}
