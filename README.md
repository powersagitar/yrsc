# YRSC

> [!NOTE]
> This project is for competing in York Region Skills Challenge 2025, Coding
> category.
>
> Design decisions are made solely to satisfy rubric, thus code is heavily
> unoptimized.
>
> No further maintenance will be received.

## Brief

This Real-Time Weather Monitoring System provides live weather updates with a GUI.
It reads weather data from a CSV, updates every 5 seconds, and dynamically displays
weather conditions based on a temperature, humidity, wind speed, and wind direction.
Users can also view a 7-day weather forecast and receive alerts for extreme weather
conditions. Additionally, the system includes weather descriptions and corresponding
icons to enhance user experience.

## How to Run

To run the project locally, install `bun` and `nodejs`, then change into project
root and run

```zsh
bun install
bun run build
bun start
```

An online version is also available at [yrsc.vercel.app](https://yrsc.vercel.app/).

## File Structure & Explanation

- `/app` -- the UI
- `/components/` -- shareable UI components
- `/lib` -- core logic that's not UI
- `/public` -- static files served over HTTP
- `/resources` -- required resources, the weather data CSV in this case

## Features & Functionality

- Displays and updates weather data every 5 seconds, retrieved from a data CSV
- Program intentionally crashes if given weather doesn't match any criterion.

## Known Issues

- Due to complexities introduced by timezones, the date might be shifted by 1 day.
