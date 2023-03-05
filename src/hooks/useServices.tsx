import config from "../api/config";

import axios from "../api/axios";

const useServices = () => {
  /*----------------------*/
  /*    FORECAST CALLS    */
  /*----------------------*/
  const getForecastByCity = async ({ city }: { city: string }) => {
    return await axios.get(config.getForecastByCity(city));
  };

  const getForecastByCoordinates = async ({ lat, lon, }: { lon: number; lat: number }) => {
    return await axios.get(config.getForecastByCoordinates(lat, lon));
  };

  return { getForecastByCity, getForecastByCoordinates };
};

export default useServices;
