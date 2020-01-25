import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import scooter from '../app/assets/scooter.svg'

const GOOGLE_MAPS_API_PARAMS = [
  `key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  `v=3.exp`,
  `libraries=geometry,drawing,places`
].join('&');

export default compose(
  withProps({
    googleMapURL: `${process.env.REACT_APP_GOOGLE_MAPS_API_URI}?${GOOGLE_MAPS_API_PARAMS}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ defaultCenter, markers }) => {
  return (
  <GoogleMap
    defaultZoom={14}
    center={{ lat: defaultCenter.latitude, lng: defaultCenter.longitude }}
  >
    <Marker
      key="my-location"
      position={{ lat: defaultCenter.latitude, lng: defaultCenter.longitude }}
    />
    { markers.map(({ id, coordinates }) => {
      return (
        <Marker
          key={id}
          icon={scooter}
          position={coordinates}
        />
      )
     })}
  </GoogleMap>);
});