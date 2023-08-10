import axios from 'axios'

export const fetchWeather = async (city: string, country: string) => {
	return  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_API_TOKEN}`)
}