import axios from "axios";

export default axios.create({ baseURL: "https://api.openweathermap.org/data/2.5" });

//In case we need to make private api calls (if authorization is needed)
export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});



