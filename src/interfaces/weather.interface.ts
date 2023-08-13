export interface WeatherInterface {
    base: string,
    clouds: { all: number },
    cod: number,
    coord: {lon: number, lat: number},
    dt: number,
    id: number,
    main: WeatherMainInterface,
    name: string,
    sys: {country: string, sunrise: number, sunset: number},
    timezone: number,
    visibility: number,
    weather: Array<NestedWeather>,
    wind: {speed: number, deg: number, gust: number}
}

interface WeatherMainInterface {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface NestedWeather {
    id: string, main: string, description: string, icon: string
}