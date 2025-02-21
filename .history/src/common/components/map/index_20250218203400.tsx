import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface Props {
  lat: string;
  lng: string;
  onLoad: () => void;
}

const MapComponent: React.FC<Props> = ({ lat = "-12.093719482422", lng = "-77.061363220215", onLoad }) => {
 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBh0jp0IizPSHaqy5WyOavifdJE7fRIFIc',
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    width: '250px',
    height: '250px',
  };

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const handleMarkerClick = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  useEffect(() => {
    if (isLoaded && !mapLoaded) {
      setMapLoaded(true);
      onLoad();
    }
  }, [isLoaded, mapLoaded, onLoad]);
 
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GoogleMap
        onClick={handleMarkerClick}
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={{ draggable: false, mapTypeControl: false, streetViewControl: false, zoomControl: false }}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
      <span style={{marginTop: '10px', display: 'block'}}>{lat}, {lng}</span>
    </>
  );
};

export default MapComponent;
