import React, { Component } from 'react';

import Navigator from '../presentation/Navigator';
import MapPresenter from '../presentation/MapPresenter';
import GetScootersNearby from '../../core/actions/GetScootersNearby';
import ApiClient from '../../core/infrastructure/ApiClient';
import MapComponent from '../../components/MapComponent';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.presenter = new MapPresenter(
      this,
      new GetScootersNearby({ apiClient: new ApiClient() }),
      new Navigator(),
    );

    this.state = {
      scooters: [],
      myLocation: {
        longitude: 0,
        latitude: 0,
      },
      form: {
        longitude: '',
        latitude: '',
        meters: process.env.REACT_APP_DEFAULT_RADIUS_IN_METERS,
      },
    };
  }

  componentDidMount() {
    const { form } = this.state;
    this.presenter.onNavigate({ meters: form.meters });
  }

  showMyLocation(myLocation) {
    this.setState({ myLocation });
  }

  showScooters(scooters) {
    this.setState({ scooters });
  }

  updateForm(myLocation) {
    this.setState({ form: myLocation });
  }

  onCurrentLocation() {
    const { form } = this.state;
    this.presenter.onNavigate({ meters: form.meters });
  }

  onNewLocation(event) {
    event.preventDefault();
    const { form } = this.state;
    const latitude = parseFloat(form.latitude);
    const longitude = parseFloat(form.longitude);
    this.presenter.onNewLocation({ longitude, latitude, meters: form.meters });
  }

  onFormChange(event) {
    event.preventDefault();
    const { form } = this.state;
    const update = {
      [event.target.id]: event.target.value,
    };
    this.setState({ form: {...form, ...update }});
  }

  render() {
    const { form, myLocation, scooters } = this.state;

    return (
      <div>
        <div style={{ textAlign: 'center', padding: '10px'}}>
          <h3 style={{ margin: '0px'}}>Your location:</h3>
          <form
            onSubmit={(e) => this.onNewLocation(e)}
            style={{ display: 'inline-block' }}
          >
            <label>
              Longitude:
              <input
                id="longitude"
                type="text"
                pattern="(?)[0-9]+|[0-9]+\.[0-9]+"
                placeholder="Custom longitude"
                value={form.longitude}
                autoFocus={true}
                onChange={(ev) => this.onFormChange(ev)}
                required
              />
            </label>
            <label>
              Latitude:
              <input
                id="latitude"
                type="text"
                pattern="(?)[0-9]+|[0-9]+\.[0-9]+"
                placeholder="Custom latitude"
                value={form.latitude}
                onChange={(ev) => this.onFormChange(ev)}
                required
              />
            </label>
            <label>
              Meters:
              <input
                id="meters"
                type="text"
                pattern="[0-9]+"
                placeholder="Custom meters"
                value={form.meters}
                required
                onChange={(ev) => this.onFormChange(ev)}
              />
            </label>
            <input type="submit" />
          </form>
          <input
            type="submit"
            value="Current location"
            onClick={() => this.onCurrentLocation()}
          />
        </div>
        <MapComponent defaultCenter={myLocation} markers={scooters} />
      </div>
    );
  }
}
