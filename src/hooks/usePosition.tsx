import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/slices/forecastReducer";
import useServices from "./useServices";
import useSnackbarCustom from "./useSnackbarCustom";

interface Coordinates {
  latitude?: number;
  longitude?: number;
}

interface Error {
  message?: React.SetStateAction<string | undefined>;
}

type Coords = {
  coords: Coordinates;
};

export const usePosition = () => {
  const [position, setPosition] = useState<Coordinates>({});
  const [error, setError] = useState<string | undefined>(undefined);

  const { getLocationByIP } = useServices();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { snackbarError } = useSnackbarCustom();

  const getLocation = async () => {
    dispatch(setIsLoading(true));
    try {
      const result = await getLocationByIP();
      if (result.data) {
        setPosition({
          latitude: result.data?.latitude,
          longitude: result.data?.longitude,
        });
      }
    } catch (err: any) {
      navigate("/forecast/sofia")
      if (!err?.response) {
        snackbarError("No server Response");
      } else {
        snackbarError("Unable to fetch data");
      }
    }
    dispatch(setIsLoading(false));
  };

  const onChange = ({ coords }: Coords): void => {
    setPosition({
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    });
  };
  const onError = (error: Error): void => {
    setError(error.message);
    //if we can't take the location with Geolocation, we will call GeoIP from AbstractAPI.
    getLocation();
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    return geo.getCurrentPosition(onChange, onError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ...position, error };
};
