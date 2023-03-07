import React from "react";

import { format } from "date-fns";
import { useSelector } from "react-redux";

import { selectIsLoading } from "../../redux/slices/forecastReducer";
import { Card, Col, Row } from "react-bootstrap";
import DayInterface from "../../interfaces/day";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import useWindowSize from "../../hooks/useWindowSize";

interface ForecastDayProps {
  selectedDay: DayInterface[];
  isLoadingSelected: boolean;
  selectedRef: React.MutableRefObject<null | HTMLDivElement>;
}

const ForecastDay = (props: ForecastDayProps) => {
  //Selectors in which the data will be stored
  const isLoading = useSelector(selectIsLoading);

  //Getting the width of the page from a custom hook
  const { width } = useWindowSize();

  return (
    <Card className="mt-4 orange-background-gradient" body>
      <Row ref={props.selectedRef} xs={1} sm={2} lg={props?.selectedDay?.length > 6 ? 4 : props.selectedDay?.length}>
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
                <div className="d-flex flex-row flex-lg-column align-items-center justify-content-between py-2 text-center">
                  <Skeleton
                    className="mb-1 lightgrey-color"
                    sx={{ transform: "none" }}
                    animation="wave"
                    variant="text"
                    width={width < 992 ? "15%" : "100%"}
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
                    sx={{
                      transform: "none",
                      minHeight: width < 992 ? "81px" : "110px",
                      height: width < 692 && width >= 576 ? "101px" : undefined,
                    }}
                    animation="wave"
                    variant="text"
                    width={width < 992 ? "50%" : "100%"}
                  />
                </div>
              </Col>
            );
          } else {
            return (
              <Col key={day.dt}>
                <div className="d-flex flex-row flex-lg-column align-items-center justify-content-between py-2 text-center">
                  <h6 className="fw-bold">{time}</h6>
                  <img
                    width="80px"
                    height="80px"
                    //src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    src={`/assets/icons/${icon}.png`}
                    alt="weather img"
                  />
                  <div className="d-flex flex-column">
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
