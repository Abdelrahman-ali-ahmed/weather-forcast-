import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../pages/introPage/redux/weatherSlice"; // Updated import

export const store = configureStore({
  reducer: {
    weather: weatherReducer, // Fixed reducer name
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
