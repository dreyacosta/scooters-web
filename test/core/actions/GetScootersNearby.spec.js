import { expect, sinon } from "../../specHelper";
import GetScootersNearby from "../../../src/core/actions/GetScootersNearby";
import ApiClient from '../../../src/core/infrastructure/ApiClient';

describe('GetScootersNearby', () => {
  let apiClient;
  let getScootersNearby;

  beforeEach(() => {
    apiClient = sinon.createStubInstance(ApiClient);
    getScootersNearby = new GetScootersNearby({ apiClient });
    apiClient.getScootersNearby
      .withArgs(nearbyParams())
      .returns([aScooter()]);
  });

  context('given some scooter inside radius', () => {
    context('when get scooters nearby', () => {
      it('calls api client with nearby params', async () => {
        await getScootersNearby.execute(nearbyParams());

        expect(apiClient.getScootersNearby).to.have.been.calledWith(nearbyParams());
      });

      it('returns the nearest scooters', async () => {
        const nearestScooters = await getScootersNearby.execute(nearbyParams());

        expect(nearestScooters).to.deep.equal([aScooter()]);
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
        lng: 'longitude',
        lat: 'latitude',
      },
    };
  }
});