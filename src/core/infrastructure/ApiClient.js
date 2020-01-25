import axios from 'axios';

export default class ApiClient {
  constructor({ http = axios } = {}) {
    this.axios = http.create({
      baseURL: process.env.REACT_APP_SCOOTER_SERVICE_API_URI
    });
  }

  async getScootersNearby({ longitude, latitude, meters }) {
    const { data } = await this.axios
      .get(`/scooters?longitude=${longitude}&latitude=${latitude}&meters=${meters}`);
    return data;
  }
}
