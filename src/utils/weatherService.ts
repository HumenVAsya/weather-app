import axios from "axios";
import { WeatherResponse } from "@/types/types";

const API_KEY = 'c1cee681e5341ba2e6332324944dd1b2';

export const fetchWeatherData = async (location: string): Promise<WeatherResponse> => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
  );

  return response.data;
};