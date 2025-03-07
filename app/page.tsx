"use client";

import WeatherGrid from "@/components/weather-grid";
import { WeatherJson } from "@/lib/weather";
import { H1 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import Link from "next/link";

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

    const interval = setInterval(fetchWeathers, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <H1 className="mb-6">Weather</H1>
      {!weathers ? (
        <p>Loading...</p>
      ) : (
        <WeatherGrid weathers={weathers} timestamp={timestamp} />
      )}
      <footer className="mt-8 flex flex-col items-center">
        <Link
          href="https://github.com/powersagitar/yrsc"
          className="flex gap-x-2"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <code>powersagitar/yrsc</code>
        </Link>
        <p className="mt-4">
          Copyright &copy; 2025 Mohan Dong. All rights reserved. Source code
          licensed under MIT.
        </p>
        <p>
          Competition project for{" "}
          <Link
            href="https://www2.yrdsb.ca/schools-programs/school-programs-nav/school-programs/york-region-skills-challenge-yrsc"
            className="underline"
          >
            York Region Skills Challenge
          </Link>{" "}
          2025, Coding category.
        </p>
      </footer>
    </>
  );
}
