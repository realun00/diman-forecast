interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  deg: number;
  gust: number;
  speed: number;
}

interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface DayInterface {
  clouds: Clouds;
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export default DayInterface;
