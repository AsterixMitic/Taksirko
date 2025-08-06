import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export function MapCenterer({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);

  return null;
}
