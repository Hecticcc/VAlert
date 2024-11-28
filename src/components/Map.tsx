import { memo, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Incident } from '../types/incident';
import L from 'leaflet';

// Create marker icons
const createMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Pre-create icons for better performance
const defaultIcon = createMarkerIcon('#10B981'); // Green
const activeIcon = createMarkerIcon('#FBBF24'); // Yellow

interface MapProps {
  incidents: Incident[];
  center: [number, number];
}

export const Map = memo(function Map({ incidents, center }: MapProps) {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  // Take only the 15 most recent incidents for the map
  const recentIncidents = useMemo(() => {
    return incidents
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 15);
  }, [incidents]);

  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return recentIncidents.map((incident) => (
      <Marker
        key={incident.id}
        position={incident.coordinates}
        icon={activeMarkerId === incident.id ? activeIcon : defaultIcon}
        eventHandlers={{
          click: () => setActiveMarkerId(incident.id),
          popupclose: () => setActiveMarkerId(null),
        }}
      >
        <Popup>
          <div className="p-2">
            <h3 className="font-bold">{incident.title}</h3>
            <p className="text-sm">{incident.location.name}</p>
            {incident.location.crossStreet && (
              <p className="text-xs text-gray-600">
                Cross streets: {incident.location.crossStreet}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                {incident.severity.toUpperCase()}
              </span>
              <span className="text-xs text-gray-600 capitalize">
                {incident.status}
              </span>
            </div>
          </div>
        </Popup>
      </Marker>
    ));
  }, [recentIncidents, activeMarkerId]);

  return (
    <MapContainer
      center={center}
      zoom={8}
      className="w-full h-[500px] rounded-lg shadow-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
});