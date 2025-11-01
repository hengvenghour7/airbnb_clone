'use client';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

const MapChildComponent = () => {
        const center = useMemo(() => ({ lat: -37.8136, lng: 144.9631 }), []); // Melbourne
        const allResort = [
          { name: 'Resort A', lat: -37.81, lng: 144.99, price: 230 },
          { name: 'Resort B', lat: -37.83, lng: 144.93, price: 180 }
        ]
        return (
          <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={12}
            >
              {
                allResort.map((resort, index) => (
                  <Marker key={`marker_${index}`} position={{lat: resort.lat, lng: resort.lng}}
                  label={{
                    text: `$${resort.price}`,
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 20,
                    fillColor: '#ff385c',
                    fillOpacity: 1,
                    strokeColor: 'white',
                    strokeWeight: 2
                  }}
                  />
                ))
              }
              <Marker position={center} />
            </GoogleMap>
        )
      }
export default function MyMap() {
  return (
    (typeof window !== 'undefined' && window.google && window.google.maps) ? 
      <MapChildComponent />
     :
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <MapChildComponent />
    </LoadScript>
  );
}
