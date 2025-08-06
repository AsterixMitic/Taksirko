import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import {MapCenterer} from "./MapCenterer.tsx";

type LocationMapProps = {
    lat: number;
    lng: number;
    onSelect?: ( lat: number, lng: number ) => void;
};

function ClickableMap({ onSelect }: { onSelect?: (coords: { lat: number; lng: number }) => void }) {
    useMapEvents({
        click(e) {
            if (onSelect) {
                onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
        },
    });
    return null;
}

export default function ClickableLocationMap({ lat, lng, onSelect }: LocationMapProps) {
    const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number }>({ lat, lng });

    useEffect(() => {
        setMarkerPos({ lat, lng });
    }, [lat, lng]);

    const handleSelect = (coords: { lat: number; lng: number }) => {
        setMarkerPos(coords);
        if (onSelect) onSelect(coords.lat, coords.lng);
    };

    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapCenterer lat={markerPos.lat} lng={markerPos.lng} />
            <ClickableMap onSelect={handleSelect} />
            <Marker position={[markerPos.lat, markerPos.lng]}>
                <Popup>
                    Lokacija: {markerPos.lat.toFixed(5)}, {markerPos.lng.toFixed(5)}
                </Popup>
            </Marker>
        </MapContainer>
    );
}
