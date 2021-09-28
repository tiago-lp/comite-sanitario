import React from 'react';
import GoogleMapReact from 'google-map-react';
import pinIcon from '../images/pin.png';

const mapStyles = {
  defaultMap: {
    position: 'relative',
    zIndex: 1,
    width: '512px',
    height: '252px',
    marginTop: '30px',
  },
  biggerMap: {
    position: 'relative',
    zIndex: 1,
    height: '400px',
  },
  pinContent: {
    width: '27px',
    height: '43px',
    overflow: 'hidden',
    position: 'absolute',
    left: '-14px',
    top: '-43px',
    zIndex: 0,
  },
  pinMap: {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '27px',
    height: '43px',
    padding: '0px',
    margin: '0px',
  },
};

const Marker = () => (
  <div style={mapStyles.pinContent}>
    <img src={pinIcon} alt='pin' draggable='false' style={mapStyles.pinMap}></img>
  </div>
);

const getCordinate = (cordinate, min, max) => {
  if (cordinate < min || cordinate > max) {
    return 0;
  }
  return cordinate;
};

const Map = ({ lat, lng, variant }) => {
  return (
    <div style={mapStyles['biggerMap']}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          language: 'pt-br',
          libraries: 'places',
        }}
        center={[getCordinate(lat, -86, 86), getCordinate(lng, -181, 181)]}
        defaultZoom={16}>
        <Marker lat={getCordinate(lat, -86, 86)} lng={getCordinate(lng, -181, 181)} />
      </GoogleMapReact>
    </div>
  );
};


export default Map;