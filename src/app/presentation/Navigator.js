export default class Navigator {
  async getCurrentPosition() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        return resolve({
          longitude: coords.longitude,
          latitude: coords.latitude,
        });
      },
      (error) => {
        console.error(error);
        return resolve({
          longitude: parseFloat(process.env.REACT_APP_DEFAULT_LOCATION_LONG),
          latitude: parseFloat(process.env.REACT_APP_DEFAULT_LOCATION_LAT),
        });
      });
    });
  }
}