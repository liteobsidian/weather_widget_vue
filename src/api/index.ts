import axios from 'axios'
import {IpInterface} from "@/interfaces/ip.interface";
import {WeatherInterface} from "@/interfaces/weather.interface";
import {CitiesResponseInterface} from "@/interfaces/cities.interface";

export const fetchLocate = async (): Promise<IpInterface> => {
	const { data } = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.VUE_APP_GEOLOCATION_API_TOKEN}`)
	return data as IpInterface;
}

export const fetchWeather = async (city: string, country: string): Promise<WeatherInterface> => {
	const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_TOKEN}`)
	return data as WeatherInterface
}

export const fetchCities = async (country: string): Promise<CitiesResponseInterface> => {
	const { data } = await axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, {country})
	return data as CitiesResponseInterface
}