import React from "react";

import { format } from "date-fns";
import { useSelector } from "react-redux";

import { selectIsLoading } from "../../redux/slices/forecastReducer";
import { Card, Col, Row } from "react-bootstrap";
import DayInterface from "../../interfaces/day";
import Skeleton from "@mui/material/Skeleton/Skeleton";

interface ForecastDayProps {
  selectedDay: DayInterface[];
  isLoadingSelected: boolean;
}

const ForecastDay = (props: ForecastDayProps) => {
  //Selectors in which the data will be stored
  const isLoading = useSelector(selectIsLoading);

  return (
    <Card className="mt-4 orange-background-gradient" body>
      <Row className="justify-content-between">
        {props?.selectedDay?.map((day: DayInterface) => {
          const icon = day.weather[0].icon;
          const time = format(new Date(day.dt_txt!), "HH:mm");
          const temperature = Math.trunc(day.main.temp);
          const realfeel = Math.trunc(day.main.feels_like);
          const humidity = Math.trunc(day.main.humidity);
          const atmosphericPressure = Math.trunc(day.main.sea_level);
          const cloudiness = day.clouds.all;

          if (isLoading || props.isLoadingSelected) {
            return (
              <Col key={day.dt}>
                <div className="d-flex flex-column align-items-center py-2">
                  <Skeleton
                    className="mb-1 lightgrey-color"
                    sx={{ transform: "none" }}
                    animation="wave"
                    variant="text"
                    width="100%"
                    height="15px"
                  />
                  <Skeleton
                    className="my-1 lightgrey-color"
                    sx={{ transform: "none" }}
                    animation="wave"
                    variant="circular"
                    width={62}
                    height={62}
                  />
                  <Skeleton
                    className="my-1 lightgrey-color"
                    sx={{ transform: "none", minHeight: "110px" }}
                    animation="wave"
                    variant="text"
                    width="100%"
                  />
                </div>
              </Col>
            );
          } else {
            return (
              <Col key={day.dt}>
                <div className="d-flex flex-column align-items-center py-2 text-center">
                  <span className="fw-bold">{time}</span>
                  <img
                    width="80px"
                    height="80px"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt="weather img"
                  />
                  <div className="d-flex flex-column align-items-center">
                    <span>
                      Temperature: <strong>{temperature}&#176;</strong>
                    </span>
                    <span>
                      RealFeel: <strong>{realfeel}&#176;</strong>
                    </span>
                    <span>
                      Humidity: <strong>{humidity}%</strong>
                    </span>
                    <span>
                      Atmospheric pressure: <strong>{atmosphericPressure}hPa</strong>
                    </span>
                    <span>
                      Cloudiness: <strong>{cloudiness}%</strong>
                    </span>
                  </div>
                </div>
              </Col>
            );
          }
        })}
      </Row>
    </Card>
  );
};

export default ForecastDay;
