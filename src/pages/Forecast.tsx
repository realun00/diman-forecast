import React from "react";
import { usePosition } from "../hooks/usePosition";
import useServices from "../hooks/useServices";

import { useDispatch, useSelector } from "react-redux";

import {
  selectCity,
  selectData,
  selectIsLoading,
  setCity,
  setData,
  setIsLoading,
} from "../redux/slices/forecastReducer";

const Forecast = () => {
  const city = useSelector(selectCity);
  const data = useSelector(selectData);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  /* Older way using nested loops for formating the data
  const formatData = (list: any) => {
    let days: any = {};
    for (let i = 0; i < list.length; i++) {
      //temp arr for a single day
      let day = [];

      //pushing the value of the first element
      day.push(list[i]);

      //nested loop
      for (let j = i + 1; j < list.length; j++) {
        //if the dates from the current and the next element are equal we push the value to "day" and skip the next iteration of "i"
        if (list[i].dt_txt.substring(0, 10) === list[j].dt_txt.substring(0, 10)) {
          day.push(list[j]);
          i++;
        }
      }
      //Creating dynamic property in days object
      days[list[i].dt_txt.substring(0, 10)] = day;
    }

    //returning the days object
    return days;
  };
  */

  //More modern way using Object.fromEntries from ECMAScript 2019 .map and filter array methods
  const formatData = (list: any) => {
    const days = Object.fromEntries(
      list.map((date: any) => [
        date.dt_txt.substring(0, 10),
        list.filter((e: any) => date.dt_txt.substring(0, 10) === e.dt_txt.substring(0, 10)),
      ])
    );

    return days;
  };

  const { getForecastByCity, getForecastByCoordinates } = useServices();
  const { latitude, longitude } = usePosition();

  React.useEffect(() => {
    const getForecast = async (latitude: number, longitude: number) => {
      dispatch(setIsLoading(true));
      try {
        const result = await getForecastByCoordinates({ lat: latitude, lon: longitude });
        if (result.data) {
          dispatch(setCity(result.data.city));
          dispatch(setData(formatData(result.data.list)));
        }
      } catch (err: any) {
        console.log(err);
      }
      dispatch(setIsLoading(false));
    };

    if (latitude && longitude) {
      getForecast(latitude, longitude);
    }
  }, [latitude, longitude]);

  console.log(city, data, isLoading);

  return <div>Forecast</div>;
};

export default Forecast;
