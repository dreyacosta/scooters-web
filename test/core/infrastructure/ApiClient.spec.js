import { expect, sinon } from "../../specHelper";
import ApiClient from "../../../src/core/infrastructure/ApiClient";

describe('ApiClient', () => {
  let http;
  let apiClient;

  beforeEach(() => {
    http = {
      get: sinon
        .stub()
        .withArgs(`/scooters?longitude=${nearbyParams().longitude}&latitude=${nearbyParams().latitude}&meters=${nearbyParams().meters}`)
        .returns({ data: [aScooter()] }),
    }
    http.create = sinon
      .stub()
      .withArgs({ baseURL: 'http://localhost:4000/api/v1' })
      .returns(http);
    apiClient = new ApiClient({ http });
  });

  context('given some scooter inside radius', () => {
    context('when get scooters nearby', () => {
      it('returns the neares scooters', async () => {
        const scooters = await apiClient.getScootersNearby(nearbyParams());
        expect(scooters).to.deep.equal([aScooter()]);
      });
    });
  });

  function nearbyParams() {
    return {
      longitude: 'lng',
      latitude: 'lat',
      meters: 'min_distance',
    };
  }

  function aScooter() {
    return {
      id: 'an_id',
      coordinates: {
        lng: 'lng',
        lat: 'lat',
      },
    };
  }
});