const apiCalls = {
  getForecastByCity: (city: string) => `/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
  getForecastByCoordinates: (lat: number, lon: number) =>
    `/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
  getLocationByIP: () => `/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}`,
};

export default apiCalls;
