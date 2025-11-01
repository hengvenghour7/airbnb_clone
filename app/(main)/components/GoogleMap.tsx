'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

export default function MyMap() {
  const center = useMemo(() => ({ lat: -37.8136, lng: 144.9631 }), []); // Melbourne

  return (
    (typeof window !== 'undefined' && window.google && window.google.maps) ? 
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
     :
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={12}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
