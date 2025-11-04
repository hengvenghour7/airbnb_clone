'use client';

import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, useMemo, useRef } from 'react';

type Props = {
  onLocationSelect?: (coords: [number, number]) => void,
  classname?: string
};
const PickerChild = ({ onLocationSelect, classname }: Props) => {
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);
const [query, setQuery] = useState('');
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = useMemo(() => ({ lat: -33.8688, lng: 151.2093 }), []); // Sydney by default
  const [newCenter, setNewCenter] = useState ({ lat: -33.8688, lng: 151.2093 })
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelected({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    
      onLocationSelect?.([e.latLng.lat(), e.latLng.lng()])
    }
  }, []);
  const handlePlacesChanged = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;
      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        setNewCenter({ lat, lng });
        setSelected({ lat, lng });
        onLocationSelect?.([lat, lng]);
        mapRef.current?.panTo({ lat, lng });
      }
    }
  };

  const handleSearchClick = () => {
    if (searchBoxRef.current) handlePlacesChanged();
  };

  return (
    <div className={`space-y-4 ${classname}`}>
        <div className="flex gap-2">
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search a place..."
            className="w-full border p-2 rounded"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          />
        </StandaloneSearchBox>
        <button
          onClick={handleSearchClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
        >
          Search
        </button>
      </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={newCenter}
          zoom={selected ? 14 : 10}
          onClick={handleMapClick}
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
    </div>
  );
}

export default function LocationPickerMap ({ onLocationSelect, classname }: Props) {
    const { isLoaded } = useJsApiLoader({
                libraries: ['places'],
                googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
            });
        return (
        !isLoaded ? <p>Loading map...</p> :
          <PickerChild classname={classname} onLocationSelect={onLocationSelect} />
      );
}
