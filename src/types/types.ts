interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherClouds {
  all: number;
}

interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface WeatherSys {
  pod: string;
}

interface WeatherData {
  dt: number;
  main: WeatherMain;
  weather: WeatherDescription[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility: number;
  pop: number;
  sys: WeatherSys;
  dt_txt: string;
}

interface WeatherCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherData[];
  city: WeatherCity;
}