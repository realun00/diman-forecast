import config from "../api/config";

import axios, {axiosGeoIP} from "../api/axios";

const useServices = () => {
  /*----------------------*/
  /*    FORECAST CALLS    */
  /*----------------------*/
  const getForecastByCity = async ({ city }: { city: string }) => {
    return await axios.get(config.getForecastByCity(city));
  };

  const getForecastByCoordinates = async ({ lat, lon }: { lon: number; lat: number }) => {
    return await axios.get(config.getForecastByCoordinates(lat, lon));
  };

  const getLocationByIP = async () => {
    return await axiosGeoIP.get(config.getLocationByIP());
  };

  return { getForecastByCity, getForecastByCoordinates, getLocationByIP };
};

export default useServices;
