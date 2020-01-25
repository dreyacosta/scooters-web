export default class GetScootersNearby {
  constructor({ apiClient }) {
    this.apiClient = apiClient;
  }

  async execute({ longitude, latitude, meters }) {
    return await this.apiClient.getScootersNearby({ longitude, latitude, meters });
  }
}