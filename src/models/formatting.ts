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

import { format } from "date-fns";
import DayInterface from "../interfaces/day";

//More modern way using Object.fromEntries from ECMAScript 2019 .map and filter array methods
const formatData = (list: []) => {
  const days = Object.fromEntries(
    list.map((date: { dt_txt: string }) => [
      date.dt_txt.substring(0, 10),
      list.filter((e: { dt_txt: string }) => date.dt_txt.substring(0, 10) === e.dt_txt.substring(0, 10)),
    ])
  );

  return days;
};

//get the nearest hour from the current one
const formatNearestTime = (day: DayInterface[]) => {
  //get the current hour and format it
  const currentHour = parseInt(format(new Date(), "HH:mm"));
  //get the available hours in the day and format them
  const availableHours = day.map((e: DayInterface) => parseInt(format(new Date(e.dt_txt!), "HH:mm")));

  let nearestTime: number = 0;
  //get the min value
  let minValue = availableHours[0] > currentHour ? availableHours[0] - currentHour : currentHour - availableHours[0];
  availableHours.reduce((minVal: number, hour: number) => {
    let hourDiff = currentHour > hour ? currentHour - hour : hour - currentHour;
    if (hourDiff <= minVal) {
      nearestTime = hour;
      return hourDiff;
    } else {
      return minVal;
    }
  }, minValue);


  //save the nearest hour
  const nearestHour = availableHours[availableHours.indexOf(nearestTime)];

  //return the object with the nearest hour data
  return day.find((e: DayInterface) => parseInt(format(new Date(e.dt_txt!), "HH:mm")) === nearestHour);
};

export { formatData, formatNearestTime };
