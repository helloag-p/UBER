// Components/LiveTracking.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper to center the map as you move
const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) map.setView([position.lat, position.lng]);
    }, [position, map]);
    return null;
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => setCurrentPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => console.error(err),
            { enableHighAccuracy: true }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    if (!currentPosition) return <div className="h-full w-full flex items-center justify-center">Detecting Location...</div>;

    return (
        <MapContainer center={currentPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[currentPosition.lat, currentPosition.lng]} />
            <RecenterMap position={currentPosition} />
        </MapContainer>
    );
};

export default LiveTracking;