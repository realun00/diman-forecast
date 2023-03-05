import { configureStore } from "@reduxjs/toolkit";

import forecastReducer from "./slices/forecastReducer";

export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
  devTools: true,
});
