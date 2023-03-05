import { useState, useEffect } from "react";

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

  const onChange = ({ coords }: Coords): void => {
    setPosition({
      latitude: coords?.latitude,
      longitude: coords?.longitude,
    });
  };
  const onError = (error: Error): void => {
    setError(error.message);
  };
  
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, error };
};
