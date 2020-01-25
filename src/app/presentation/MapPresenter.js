export default class MapPresenter {
  constructor(screen, getScootersNearby, navigator) {
    this.screen = screen;
    this.getScootersNearby = getScootersNearby;
    this.navigator = navigator;
  }

  async onNavigate({ meters }) {
    const { longitude, latitude } = await this.navigator.getCurrentPosition();
    const scooters = await this.getScootersNearby.execute({ longitude, latitude, meters });
    this.screen.showMyLocation({ longitude, latitude });
    this.screen.showScooters(scooters);
    this.screen.updateForm({ longitude, latitude, meters });
  }

  async onNewLocation({ longitude, latitude, meters }) {
    const scooters = await this.getScootersNearby.execute({ longitude, latitude, meters });
    this.screen.showMyLocation({ longitude, latitude });
    this.screen.showScooters(scooters);
    this.screen.updateForm({ longitude, latitude, meters });
  }
}