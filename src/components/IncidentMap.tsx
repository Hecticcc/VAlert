import { memo, useMemo, useRef, useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngBounds, Popup as LeafletPopup } from 'leaflet';
import { X } from 'lucide-react';
import { Incident } from '../types/incident';
import { geocodeAddress } from '../utils/geocoding';
import { getIncidentIcon } from '../utils/incidentIcons';
import { MapOverlay } from './MapOverlay';

interface IncidentMapProps {
  incidents: Incident[];
  activeIncidentId?: string;
  onMarkerClick?: (id: string) => void;
}

const VICTORIA_CENTER: [number, number] = [-37.8136, 144.9631];
const VICTORIA_BOUNDS = new LatLngBounds(
  [-39.2, 140.9], // Southwest
  [-34.0, 150.0]  // Northeast
);

function MarkerWithPopup({ 
  incident, 
  position, 
  icon, 
  onClick 
}: { 
  incident: Incident; 
  position: [number, number]; 
  icon: L.Icon; 
  onClick: () => void;
}) {
  const popupRef = useRef<LeafletPopup>(null);
  const map = useMap();

  const handleClose = useCallback(() => {
    if (popupRef.current) {
      map.closePopup(popupRef.current);
    }
  }, [map]);

  const cleanDescription = incident.description
    .replace(/^\d+\s+KEY\s+PEG:\s+[A-Z0-9]+\s+/, '')
    .replace(/\s+\d+.*$/, '')
    .replace(incident.location.address, '')
    .trim();

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          onClick();
          map.setView(position, map.getZoom());
        }
      }}
    >
      <Popup 
        ref={popupRef} 
        closeButton={false}
        className="custom-popup z-40"
      >
        <div className="relative p-2">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg transition-colors"
            aria-label="Close popup"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-2 mb-2 mt-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              incident.severity === 'critical' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
              incident.severity === 'extreme' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
              incident.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
              incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
              'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
            }`}>
              {incident.severity.toUpperCase()}
            </span>
            {incident.reference && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {incident.reference}
              </span>
            )}
          </div>
          <h3 className="font-bold text-sm mb-2 dark:text-white pr-6">
            {cleanDescription || incident.alertType}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {incident.location.address}
          </p>
          {incident.location.crossStreet && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Cross streets: {incident.location.crossStreet}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-1">
            {incident.stations.map((station) => (
              <span 
                key={station}
                className="text-xs px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
              >
                {station}
              </span>
            ))}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export const IncidentMap = memo(function IncidentMap({ 
  incidents, 
  activeIncidentId,
  onMarkerClick 
}: IncidentMapProps) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const markers = useMemo(() => {
    const recentIncidents = incidents
      .filter(incident => {
        const desc = incident.description.toLowerCase();
        return !desc.includes('key peg') && 
               !desc.includes('unknown') &&
               desc.trim() !== '';
      })
      .slice(0, 20);

    return recentIncidents.map(incident => {
      const coordinates = geocodeAddress(incident.location);
      if (!coordinates) return null;

      const isActive = incident.id === activeIncidentId;
      const icon = getIncidentIcon(incident.description, isActive);
      if (!icon) return null;

      return {
        incident,
        coordinates,
        icon,
        isActive
      };
    }).filter((marker): marker is NonNullable<typeof marker> => marker !== null);
  }, [incidents, activeIncidentId]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={VICTORIA_CENTER}
        zoom={8}
        className="w-full h-full rounded-lg shadow-lg"
        maxBounds={VICTORIA_BOUNDS}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        closePopupOnClick={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(marker => (
          <MarkerWithPopup
            key={marker.incident.id}
            incident={marker.incident}
            position={marker.coordinates}
            icon={marker.icon}
            onClick={() => onMarkerClick?.(marker.incident.id)}
          />
        ))}
      </MapContainer>
      <MapOverlay 
        isVisible={isOverlayVisible} 
        onClose={() => setIsOverlayVisible(false)} 
      />
    </div>
  );
});