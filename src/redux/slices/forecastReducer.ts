import { createSlice } from "@reduxjs/toolkit";

const forecastReducer = createSlice({
  name: "forecast",
  initialState: {
    city: "",
    data: {},
    isLoading: false,
  },
  reducers: {
    setCity: (state, action): void => {
      state.city = action.payload;
    },
    setData: (state, action): void => {
      state.data = action.payload;
    },
    setIsLoading: (state, action): void => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCity, setData, setIsLoading } = forecastReducer.actions;

export default forecastReducer.reducer;

export const selectCity = (state: any) => state?.forecast?.city;
export const selectData = (state: any) => state?.forecast?.data;
export const selectIsLoading = (state: any) => state?.forecast?.isLoading;
