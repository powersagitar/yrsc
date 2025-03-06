export type WeatherState =
  | "Sunny"
  | "Rainy"
  | "Snowy"
  | "Windy"
  | "Stormy"
  | "SevereWindstorm"
  | "Hurricane"
  | "Tornado"
  | "ExtremeHeat"
  | "ExtremeCold"
  | "ExtremelyHumid";

export type WindDirection = "N" | "NE" | "NW" | "E" | "W" | "SW" | "SE" | "S";

export class Wind {
  private speed: number;
  private direction: WindDirection;

  public constructor(
    speed: Readonly<number>,
    direction: Readonly<WindDirection>,
  ) {
    this.speed = speed;
    this.direction = direction;
  }

  public getSpeed() {
    return this.speed;
  }

  public getDirection() {
    return this.direction;
  }
}

type WeatherInitializer = {
  date: Date;
  minTemperature: number;
  maxTemperature: number;
  wind: Wind;
  humidity: number;
};

export type WeatherJson = {
  date: Date;
  minTemperature: number;
  maxTemperature: number;
  wind: {
    speed: number;
    direction: WindDirection;
  };
  humidity: number;
  state: WeatherState;
  description: string;
};

export abstract class Weather {
  private date: Date;
  private minTemperature: number;
  private maxTemperature: number;
  private wind: Wind;
  private humidity: number;
  protected abstract state: WeatherState;
  protected abstract description: string;

  protected constructor({
    date,
    minTemperature,
    maxTemperature,
    wind,
    humidity,
  }: Readonly<WeatherInitializer>) {
    this.date = date;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.wind = wind;
    this.humidity = humidity;
  }

  public static derive(initializer: Readonly<WeatherInitializer>): Weather {
    const { minTemperature, maxTemperature, wind, humidity } = initializer;

    const getHeatIndex = () => {
      return (
        -8.7847 +
        1.6114 * maxTemperature +
        2.3385 * humidity -
        0.146 * maxTemperature * humidity -
        0.0123 * maxTemperature * maxTemperature -
        0.0164 * humidity * humidity +
        0.0022 * maxTemperature * maxTemperature +
        0.007 * maxTemperature * humidity * humidity -
        0.003 * maxTemperature * maxTemperature * humidity * humidity
      );
    };

    const getWindChill = () => {
      return (
        13.12 +
        0.6215 * maxTemperature -
        11.37 * Math.pow(wind.getSpeed(), 0.16) +
        0.3965 * maxTemperature * Math.pow(wind.getSpeed(), 0.16)
      );
    };

    const getDewPoint = () => {
      const a = 17.27;
      const b = 237.7;

      const alpha =
        (a * maxTemperature) / (b + maxTemperature) +
        Math.pow(Math.E, humidity / 100);

      return (b * alpha) / (a - alpha);
    };

    if (minTemperature >= 10 && maxTemperature <= 20) {
      return new WeatherSunny(initializer);
    } else if (wind.getSpeed() <= 39 && humidity >= 60) {
      return new WeatherRainy(initializer);
    } else if (minTemperature <= 0 && humidity >= 50) {
      return new WeatherSnowy(initializer);
    } else if (wind.getSpeed() >= 25 && wind.getSpeed() <= 39) {
      return new WeatherWindy(initializer);
    } else if (wind.getSpeed() >= 40 && wind.getSpeed() <= 88) {
      return new WeatherStormy(initializer);
    } else if (wind.getSpeed() >= 89 && wind.getSpeed() <= 118) {
      return new WeatherSevereWindstorm(initializer);
    } else if (wind.getSpeed() >= 119 && wind.getSpeed() <= 176) {
      return new WeatherHurricane(initializer);
    } else if (wind.getSpeed() >= 117) {
      return new WeatherTornado(initializer);
    } else if (minTemperature >= 40 || getHeatIndex() >= 41) {
      return new WeatherExtremeHeat(initializer);
    } else if (minTemperature <= -20 || getWindChill() <= -30) {
      return new WeatherExtremeCold(initializer);
    } else if (getDewPoint() >= 24) {
      return new WeatherExtremelyHumid(initializer);
    } else {
      console.error(`initializer: ${initializer}`);
      throw new Error("Unknown weather state");
    }
  }

  public getDate() {
    return this.date;
  }

  public getMinTemperature() {
    return this.minTemperature;
  }

  public getMaxTemperature() {
    return this.maxTemperature;
  }

  public getWind() {
    return this.wind;
  }

  public getHumidity() {
    return this.humidity;
  }

  public getState() {
    return this.state;
  }

  public getDescription() {
    return this.description;
  }
}

class WeatherSunny extends Weather {
  protected state: WeatherState = "Sunny";
  protected description = "Clear skies, bright weather";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherRainy extends Weather {
  protected state: WeatherState = "Rainy";
  protected description = "Overcast skies with precipitation";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherSnowy extends Weather {
  protected state: WeatherState = "Snowy";
  protected description = "Snowfall and cold temperatures";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherWindy extends Weather {
  protected state: WeatherState = "Windy";
  protected description = "Strong wind without storms";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherStormy extends Weather {
  protected state: WeatherState = "Stormy";
  protected description = "Thunderstorms and heavy rain";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherSevereWindstorm extends Weather {
  protected state: WeatherState = "SevereWindstorm";
  protected description = "Violent wind conditions";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherHurricane extends Weather {
  protected state: WeatherState = "Hurricane";
  protected description = "Extremely high winds and storms";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherTornado extends Weather {
  protected state: WeatherState = "Tornado";
  protected description = "Destructive swirling winds";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherExtremeHeat extends Weather {
  protected state: WeatherState = "ExtremeHeat";
  protected description = "Scorching hot temperatures";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherExtremeCold extends Weather {
  protected state: WeatherState = "ExtremeCold";
  protected description = "Freezing and dangerously cold";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}

class WeatherExtremelyHumid extends Weather {
  protected state: WeatherState = "ExtremelyHumid";
  protected description = "High moisture in the air";

  public constructor(initializer: Readonly<WeatherInitializer>) {
    super(initializer);
  }
}
