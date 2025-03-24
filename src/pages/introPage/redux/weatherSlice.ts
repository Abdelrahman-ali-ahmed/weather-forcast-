import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface WeatherParams {
  latitude: number;
  longitude: number;
}

interface WeatherResponse {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode:number[];
    time:string[];
  };
  timezone: string;
}

export const getWeather = createAsyncThunk<WeatherResponse, WeatherParams>(
  "weather/fetchWeather",
  async ({ latitude, longitude }) => {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,precipitation_sum,windspeed_10m_max&timezone=auto&current_weather=true`
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  }
);

// Define initial state with correct types
interface WeatherState {
  weather: WeatherResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  nightMode:boolean;
}

const initialState: WeatherState = {
  weather: null,
  status: "idle",
  error: null,
  nightMode:false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {  toggleNightMode: (state) => {
    state.nightMode = !state.nightMode;
  },
setLoading:(state)=>{state.status="loading"}},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weather = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch weather";
      });
  },
});
export const { toggleNightMode,setLoading } = weatherSlice.actions;

export default weatherSlice.reducer;
