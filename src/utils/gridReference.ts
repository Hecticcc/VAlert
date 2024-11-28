// Victoria Grid Reference System (VicGrid94-based)
const VICGRID = {
  // Melbourne CBD as reference point
  ORIGIN_LAT: -37.813628,
  ORIGIN_LNG: 144.963058,
  
  // Grid constants (in meters)
  GRID_SIZE: 100, // Each grid unit = 100m
  
  // Victoria bounds
  bounds: {
    minLat: -39.2,
    maxLat: -34.0,
    minLng: 140.9,
    maxLng: 150.0
  }
};

// Grid zones for Melbourne metropolitan area
const MELBOURNE_ZONES = {
  // Key zones with their approximate centers
  central: { lat: -37.813628, lng: 144.963058 }, // CBD
  north: { lat: -37.679290, lng: 144.963058 },   // Craigieburn
  south: { lat: -37.946320, lng: 145.053663 },   // Moorabbin
  east: { lat: -37.813628, lng: 145.222944 },    // Box Hill
  west: { lat: -37.813628, lng: 144.733172 }     // Sunshine
};

function normalizeGridReference(ref: string): string | null {
  // Remove any spaces and convert to uppercase
  const normalized = ref.replace(/\s+/g, '').toUpperCase();
  
  // Match 6-digit grid reference
  if (/^\d{6}$/.test(normalized)) {
    return normalized;
  }
  
  // Match Melway format (e.g., M185E11 or 185E11)
  const melwayMatch = normalized.match(/^(?:M)?(\d+)([A-Z])(\d{1,2})$/);
  if (melwayMatch) {
    const [, page, col, row] = melwayMatch;
    // Convert Melway reference to normalized format
    const pageNum = parseInt(page, 10);
    const colNum = col.charCodeAt(0) - 65;
    const rowNum = parseInt(row, 10);
    
    // Calculate grid reference
    const easting = 800 + (pageNum % 10) * 10 + colNum;
    const northing = 800 + Math.floor(pageNum / 10) * 10 + rowNum;
    
    return `${easting.toString().padStart(3, '0')}${northing.toString().padStart(3, '0')}`;
  }
  
  return null;
}

export function extractGridReference(text: string): string | null {
  if (!text) return null;

  // Try to find 6-digit reference in parentheses
  const parensMatch = text.match(/\((\d{6})\)/);
  if (parensMatch) return parensMatch[1];

  // Try to find Melway reference
  const melwayMatch = text.match(/M\s*(\d+)\s+([A-Z])(\d{1,2})/);
  if (melwayMatch) {
    const fullRef = melwayMatch[0].replace(/\s+/g, '');
    return normalizeGridReference(fullRef);
  }

  return null;
}

export function gridToCoordinates(gridRef: string): [number, number] | null {
  if (!gridRef) return null;

  try {
    const normalized = normalizeGridReference(gridRef);
    if (!normalized) return null;

    // Extract easting and northing
    const easting = parseInt(normalized.substring(0, 3), 10);
    const northing = parseInt(normalized.substring(3), 10);

    if (isNaN(easting) || isNaN(northing)) return null;

    // Calculate base coordinates
    let lat = VICGRID.ORIGIN_LAT;
    let lng = VICGRID.ORIGIN_LNG;

    // Adjust based on grid position
    const latAdjust = (northing - 800) * (VICGRID.GRID_SIZE / 111111); // 1 degree ≈ 111111 meters
    const lngAdjust = (easting - 800) * (VICGRID.GRID_SIZE / (111111 * Math.cos(lat * Math.PI / 180)));

    lat += latAdjust;
    lng += lngAdjust;

    // Apply zone-based corrections
    const zone = determineZone(lat, lng);
    if (zone) {
      lat += zone.latCorrection || 0;
      lng += zone.lngCorrection || 0;
    }

    // Validate coordinates
    if (lat < VICGRID.bounds.minLat || lat > VICGRID.bounds.maxLat ||
        lng < VICGRID.bounds.minLng || lng > VICGRID.bounds.maxLng) {
      console.warn('Coordinates outside Victoria bounds:', { lat, lng });
      return null;
    }

    return [lat, lng];
  } catch (error) {
    console.error('Error converting grid reference:', error);
    return null;
  }
}

function determineZone(lat: number, lng: number): { latCorrection: number; lngCorrection: number } | null {
  // Calculate distance to each zone center
  const distances = Object.entries(MELBOURNE_ZONES).map(([zone, center]) => ({
    zone,
    distance: Math.sqrt(
      Math.pow(lat - center.lat, 2) + 
      Math.pow(lng - center.lng, 2)
    )
  }));

  // Find closest zone
  const closest = distances.sort((a, b) => a.distance - b.distance)[0];

  // Zone-specific corrections
  const corrections: Record<string, { latCorrection: number; lngCorrection: number }> = {
    central: { latCorrection: 0, lngCorrection: 0 },
    north: { latCorrection: 0.001, lngCorrection: 0 },
    south: { latCorrection: -0.001, lngCorrection: 0.001 },
    east: { latCorrection: 0, lngCorrection: 0.002 },
    west: { latCorrection: 0, lngCorrection: -0.001 }
  };

  return corrections[closest.zone] || null;
}