import { Location } from '../types/incident';

// Victoria region boundaries
const VICGRID = {
  ORIGIN_LAT: -37.813628,
  ORIGIN_LNG: 144.963058,
  
  bounds: {
    minLat: -39.2,
    maxLat: -34.0,
    minLng: 140.9,
    maxLng: 150.0
  }
};

const STREET_COORDINATES: Record<string, [number, number]> = {
  // Updated/New addresses
  'CLEELAND ST DANDENONG': [-37.9882, 145.2153],
  'PRINCES HWY NARRE WARREN': [-37.9776, 145.3037],
  'GRANT ST CRANBOURNE': [-38.1128, 145.2834],
  'ARGYLE ST TRARALGON': [-38.1965, 146.5396],
  'PROGRESS RD ELTHAM NORTH': [-37.7018, 145.1472],
  'CORIO DAM RD SCARSDALE': [-37.7018, 143.6472],
  
  // Existing addresses
  'DOBIES CT WESTMEADOWS': [-37.6725, 144.8805],
  'GRANTHAM DR HIGHTON': [-38.1845, 144.3155],
  'HUME HWY CRAIGIEBURN': [-37.5997, 144.9445],
  'HAMILTON HWY MURGHEBOLUC': [-38.1512, 144.1645]
};

const LOCATION_COORDINATES: Record<string, [number, number]> = {
  // Major locations
  'DANDENONG': [-37.9882, 145.2153],
  'NARRE WARREN': [-37.9776, 145.3037],
  'CRANBOURNE': [-38.1128, 145.2834],
  'TRARALGON': [-38.1965, 146.5396],
  'ELTHAM NORTH': [-37.7018, 145.1472],
  'SCARSDALE': [-37.7018, 143.6472],
  
  // Existing locations
  'WESTMEADOWS': [-37.6747, 144.8811],
  'HIGHTON': [-38.1833, 144.3167],
  'CRAIGIEBURN': [-37.6000, 144.9500],
  'MURGHEBOLUC': [-38.1500, 144.1667]
};

const geocodeCache = new Map<string, [number, number]>();

function normalizeAddress(address: string): string {
  return address
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace(/\([^)]*\)/g, '')
    .replace(/^(\d+\s+)/, '') // Remove leading house numbers
    .trim();
}

function extractLocationFromAddress(address: string): string {
  // Extract location name from the end of the address
  const parts = address.split(/\s+/);
  const lastTwoWords = parts.slice(-2).join(' ');
  const lastWord = parts[parts.length - 1];

  return LOCATION_COORDINATES[lastTwoWords] ? lastTwoWords : lastWord;
}

export function geocodeAddress(location: Location): [number, number] | null {
  try {
    const cacheKey = `${location.address}${location.crossStreet || ''}`;
    
    if (geocodeCache.has(cacheKey)) {
      return geocodeCache.get(cacheKey)!;
    }

    const normalized = normalizeAddress(location.address);
    
    // Check exact street matches first
    for (const [street, coords] of Object.entries(STREET_COORDINATES)) {
      if (normalized.includes(street)) {
        geocodeCache.set(cacheKey, coords);
        return coords;
      }
    }

    // Extract and check location name
    const locationName = extractLocationFromAddress(normalized);
    if (locationName && LOCATION_COORDINATES[locationName]) {
      const coords = LOCATION_COORDINATES[locationName];
      geocodeCache.set(cacheKey, coords);
      return coords;
    }

    // If no match found, try to parse street name and suburb
    const streetMatch = normalized.match(/([^,]+),?\s+([^,]+)$/);
    if (streetMatch) {
      const [, street, suburb] = streetMatch;
      const streetKey = Object.keys(STREET_COORDINATES).find(k => 
        k.includes(street) && k.includes(suburb)
      );
      if (streetKey) {
        const coords = STREET_COORDINATES[streetKey];
        geocodeCache.set(cacheKey, coords);
        return coords;
      }
    }

    // Default to Melbourne CBD if no match found
    const defaultCoords: [number, number] = [VICGRID.ORIGIN_LAT, VICGRID.ORIGIN_LNG];
    geocodeCache.set(cacheKey, defaultCoords);
    return defaultCoords;

  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
}