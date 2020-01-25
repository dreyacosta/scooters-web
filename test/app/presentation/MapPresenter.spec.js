import { expect, sinon } from '../../specHelper';
import MapPresenter from '../../../src/app/presentation/MapPresenter';
import Navigator from '../../../src/app/presentation/Navigator';
import GetScootersNearby from '../../../src/core/actions/GetScootersNearby';

describe('MapPresenter', () => {
  let screen;
  let navigator;
  let getScootersNearby;
  let mapPresenter;

  beforeEach(() => {
    screen = {
      showMyLocation: sinon.spy(),
      showScooters: sinon.spy(),
      updateForm: sinon.spy(),
    };
    navigator = sinon.createStubInstance(Navigator);
    getScootersNearby = sinon.createStubInstance(GetScootersNearby);
    mapPresenter = new MapPresenter(screen, getScootersNearby, navigator);
    navigator.getCurrentPosition
      .returns(theCurrentLocation());
    getScootersNearby.execute
      .withArgs(theNearbyParams())
      .returns([aScooter()]);
  });

  context('given some scooter inside radius', () => {
    context('when navigate to the map', () => {
      it('calls the navigator', async () => {
        await mapPresenter.onNavigate(onNavigateParams());

        expect(navigator.getCurrentPosition).to.have.been.callCount(1);
      });

      it('calls getScootersNearby with the navigator current location and the navigate params', async () => {
        await mapPresenter.onNavigate(onNavigateParams());

        expect(getScootersNearby.execute).to.have.been.calledWith({ ...theCurrentLocation(), ...onNavigateParams() });
      });

      it('calls back the screen with the update location', async () => {
        await mapPresenter.onNavigate(onNavigateParams());

        expect(screen.showMyLocation).to.have.been.calledWith(theCurrentLocation());
      });

      it('calls back the screen with the nearest scooters', async () => {
        await mapPresenter.onNavigate(onNavigateParams());

        expect(screen.showScooters).to.have.been.calledWith([nearestScooter()]);
      });

      it('calls back the screen to update the form', async () => {
        await mapPresenter.onNavigate(onNavigateParams());

        expect(screen.updateForm).to.have.been.calledWith({ ...onNavigateParams(), ...theCurrentLocation()});
      });
    });

    context('when change to a new location', () => {
      it('calls getScootersNearby with the location params', async () => {
        await mapPresenter.onNavigate(onNewLocationParams());

        expect(getScootersNearby.execute).to.have.been.calledWith(onNewLocationParams());
      });

      it('calls back the screen with the update location', async () => {
        await mapPresenter.onNavigate(onNewLocationParams());

        expect(screen.showMyLocation).to.have.been.calledWith(coordinates());
      });

      it('calls back the screen with the nearest scooters', async () => {
        await mapPresenter.onNavigate(onNewLocationParams());

        expect(screen.showScooters).to.have.been.calledWith([nearestScooter()]);
      });

      it('calls back the screen to update the form', async () => {
        await mapPresenter.onNavigate(onNewLocationParams());

        expect(screen.updateForm).to.have.been.calledWith(onNewLocationParams());
      });
    });
  });

  function onNavigateParams() {
    return {
      meters: 'distance',
    };
  }

  function theCurrentLocation() {
    return coordinates();
  }

  function onNewLocationParams() {
    return theNearbyParams();
  }

  function nearestScooter() {
    return aScooter();
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

  function coordinates() {
    return {
      longitude: 'lng',
      latitude: 'lat',
    };
  }

  function theNearbyParams() {
    return {
      ...coordinates(),
      meters: 'distance',
    };
  }
});