import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../redux/weatherSlice";
import axios from "axios";
import { AppDispatch, RootState } from "../../../lib/store";

const useWeather = () => {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({ latitude: 30.0444, longitude: 31.2357 }); // Default to Cairo
  const dispatch = useDispatch<AppDispatch>();
  const { weather, status, error,nightMode } = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    const fetchWeather = async () => {
      await dispatch(getWeather(coords));  
    };
  
    fetchWeather();
  }, [dispatch, coords]);

  const fetchCityCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newCoords = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        
        setCoords(newCoords);  // Update state
        dispatch(getWeather(newCoords)); // Ensure correct coords are used
      } else {
        alert("City not found. Try another city.");
      }
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
    }
  };

  const getWeatherSummary = () => {
    if (!weather || !weather.daily) return ["No data available"];
    const { weathercode } = weather.daily;
    type WeatherDescription = string | { des: string; image: string };
    const weatherMap: Record<number, WeatherDescription> = {
      0: {des:"Clear sky ☀️",image:"/assets/day-mode.png"},
      1: {des:"Mainly clear 🌤️",image:"/assets/sunny.png"},
      2: {des:"Partly cloudy ⛅",image:"/assets/cloudy.png"},
      3: {des:"Overcast ☁️",image:"/assets/cloud.png"},
      45: {des:"Foggy 🌫️",image:"/assets/wind.png"},
      48: {des:"Dense fog 🌫️",image:"/assets/wind.png"},
      51: {des:"Light drizzle 🌦️",image:"/assets/cloudy (1).png"},
      53:{ des:"Moderate drizzle 🌧️",image:"/assets/heavy-rain.png"},
      55: {des:"Heavy drizzle 🌧️",image:"/assets/heavy-rain.png"},
      56: {des:"Light freezing drizzle ❄️",image:"/assets/snowflake.png"},
      57: {des:"Dense freezing drizzle ❄️",image:"/assets/snowflake.png"},
      61: {des:"Light rain 🌦️",image:"/assets/cloudy (1).png"},
      63: {des:"Moderate rain 🌧️",image:"/assets/heavy-rain.png"},
      65: {des:"Heavy rain 🌧️",image:"/assets/heavy-rain.png"},
      66: {des:"Light freezing rain ❄️",image:"/assets/snowflake.png"},
      67: {des:"Heavy freezing rain ❄️",image:"/assets/snowflake.png"},
      71: {des:"Light snowfall ❄️",image:"/assets/snowflake.png"},
      73: {des:"Moderate snowfall ❄️",image:"/assets/snowflake.png"},
      75: {des:"Heavy snowfall ❄️",image:"/assets/snowflake.png"},
      77: {des:"Snow grains ❄️",image:"/assets/snowflake.png"},
      80: {des:"Slight rain showers 🌦️",image:"/assets/cloudy (1).png"},
      81: {des:"Moderate rain showers 🌧️",image:"/assets/heavy-rain.png/"},
      82: {des:"Violent rain showers 🌧️⛈️",image:"/assets/stom.png"},
      85: {des:"Slight snow showers ❄️",image:"/assets/snowflake.png"},
      86: {des:"Heavy snow showers ❄️",image:"/assets/snowflake.png"},
      95: {des:"Thunderstorm ⛈️",image:"/assets/stom.png"},
      96: {des:"Thunderstorm with light hail ⛈️❄️",image:"/assets/snowy.png"},
      99: {des:"Thunderstorm with heavy hail ⛈️❄️",image:"/assets/snowy.png"}
    };
  
    return weathercode.map((code, i) => {return {des:`Day ${i + 1}: ${weatherMap[code]?.des || "Unknown Weather 🌍"}`,image:weatherMap[code]?.image}});
  };
  return { city, setCity, fetchCityCoordinates, weather, status, error, getWeatherSummary,nightMode };
};

export default useWeather;
