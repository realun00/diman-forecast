import React, { useRef, useState } from "react";
import { usePosition } from "../hooks/usePosition";
import useServices from "../hooks/useServices";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { formatData, formatNearestTime } from "../models/formatting";
import { useNavigate, useParams } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton/Skeleton";
import ForecastDay from "../components/forecast/ForecastDay";

import {
  selectCity,
  selectData,
  selectIsLoading,
  setCity,
  setData,
  setIsLoading,
} from "../redux/slices/forecastReducer";
import { Card, Col, Row } from "react-bootstrap";
import useSnackbarCustom from "../hooks/useSnackbarCustom";
import useWindowSize from "../hooks/useWindowSize";

const Forecast = () => {
  /*Local state for selected day */
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState([]);
  const [isLoadingSelected, setIsLoadingSelected] = useState(false);

  //ref for the selected day - in order to scroll down to it on the mobile version
  const selectedRef = useRef<null | HTMLDivElement>(null);

  //Selectors in which the data will be stored
  const city = useSelector(selectCity);
  const data = useSelector(selectData);
  const isLoading = useSelector(selectIsLoading);

  //Getting the width of the page from a custom hook
  const { width } = useWindowSize();
  //redux dispatch
  const dispatch = useDispatch();
  //check if there is parameter set for a city
  const { city: cityParam }: any = useParams();
  //useNavigate hook
  const navigate = useNavigate();
  //api call functions
  //const { getForecastByCity, getForecastByCoordinates } = useServices();
  //const services = useServices();
  const { getForecastByCoordinates, getForecastByCity } = useServices();
  //get the latitude and longitude from usePosition hook
  const { latitude, longitude} = usePosition(); 
  //get snackbars from useSnackbarCustom hook
  const { snackbarError } = useSnackbarCustom();

  const selectDay = (day: any, index: number) => {
    //Check if the selected index in different from the one that user executes
    if (selectedIndex !== index) {
      //if the width is smaller that 992px, we will scrollInto the view
      if (width < 992) {
        selectedRef.current!.scrollIntoView({ behavior: "smooth" });
      }
      setIsLoadingSelected(true);
      setSelectedDay(day);
      setSelectedIndex(index);
      const timer = setTimeout(() => {
        setIsLoadingSelected(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  };

  React.useEffect(() => {
    const fetchForecastCoords = async (latitude: number, longitude: number) => {
      dispatch(setIsLoading(true));
      try {
        const result = await getForecastByCoordinates({ lat: latitude, lon: longitude });
        if (result.data) {
          dispatch(setCity(result.data.city));
          dispatch(setData(formatData(result.data.list)));
        }
      } catch (err: any) {
        if (!err?.response) {
          snackbarError("No server Response");
        } else {
          snackbarError("Unable to fetch data");
        }
      }

      const timer = setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1500);
      return () => clearTimeout(timer);
    };

    if (!cityParam && latitude && longitude) {
      fetchForecastCoords(latitude, longitude);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityParam, latitude, longitude]);


  React.useEffect(() => {
    const fetchForecastCity = async (city: string) => {
      dispatch(setIsLoading(true));
      try {
        const result = await getForecastByCity({ city });
        if (result.data) {
          dispatch(setCity(result.data.city));
          dispatch(setData(formatData(result.data.list)));
        }
      } catch (err: any) {
        navigate("/");
        if (!err?.response) {
          snackbarError("No server Response");
        } else {
          snackbarError(err?.message ?? "Unable to fetch data");
        }
      }
      const timer = setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 3000);
      return () => clearTimeout(timer);
    };

    //check if the cityParam exists, if it contains letters only
    if (cityParam && /^[^-\s][a-zA-Z\s-]+$/.test(cityParam)) {
      fetchForecastCity(encodeURIComponent(cityParam));
    } else {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityParam]);

  React.useEffect(() => {
    if (data) {
      const firstDay: any = Object.values(data)[0];
      setSelectedDay(firstDay);
    }
  }, [data]);

  return (
    <React.Fragment>
      <Card body>
        <Row className="mb-4">
          {isLoading ? (
            <Skeleton
              sx={{ marginLeft: "12px", marginBottom: "0.5rem", bgcolor: "grey.200", transform: "none" }}
              animation="wave"
              width="33%"
              height="40px"
              variant="text"
            />
          ) : (
            <h2 style={{ width: "fit-content" }}>
              {city?.name}, {city?.country}
            </h2>
          )}
        </Row>
        <Row className="justify-content-between" xs={1} sm={2} md={3} lg={6}>
          {Object.entries(data).map((e: any, i: number) => {
            const nearestTimeData = formatNearestTime(e[1]);
            const icon = nearestTimeData?.weather?.[0]?.icon;
            const minTemp = Math.trunc(nearestTimeData?.main?.temp_min!);
            const maxTemp = Math.trunc(nearestTimeData?.main?.temp_max!);
            const isSameTemp = minTemp === maxTemp ? true : false;

            if (isLoading) {
              return (
                <Col key={e[0]}>
                  <div className="d-flex flex-column align-items-center py-2">
                    <Skeleton
                      sx={{ bgcolor: "grey.200", transform: "none" }}
                      animation="wave"
                      variant="text"
                      width="100%"
                      height="15px"
                    />
                    <Skeleton
                      className="my-1"
                      sx={{ bgcolor: "grey.200", transform: "none" }}
                      animation="wave"
                      variant="text"
                      width="100%"
                      height="15px"
                    />
                    <Skeleton
                      className="my-1"
                      sx={{ bgcolor: "grey.200", transform: "none" }}
                      animation="wave"
                      variant="circular"
                      width={68}
                      height={68}
                    />
                    <Skeleton
                      className="mt-1"
                      sx={{ bgcolor: "grey.200", transform: "none" }}
                      animation="wave"
                      width="100%"
                      height="15px"
                    />
                  </div>
                </Col>
              );
            } else {
              return (
                <Col key={e[0]}>
                  <div
                    className={`d-flex flex-column align-items-center py-2 col-day-select ${
                      selectedIndex === i + 1 ? "orange-background-gradient" : ""
                    }`}
                    onClick={() => {
                      selectDay(e[1], i + 1);
                    }}
                  >
                    <span className="fw-bold">{format(new Date(e[0]), "EEEE")}</span>
                    <span className="lightgrey-color">{format(new Date(e[0]), "dd.MM.yyyy")}</span>
                    <img
                      width="80px"
                      height="80px"
                      //src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      src={`/assets/icons/${icon}.png`}
                      alt="weather img"
                    />
                    {isSameTemp ? (
                      <span>{minTemp}&#176;</span>
                    ) : (
                      <span>
                        {minTemp}&#176; | {maxTemp}&#176;
                      </span>
                    )}
                  </div>
                </Col>
              );
            }
          })}
        </Row>
      </Card>
      <ForecastDay selectedDay={selectedDay} selectedRef={selectedRef} isLoadingSelected={isLoadingSelected} />
    </React.Fragment>
  );
};

export default Forecast;
