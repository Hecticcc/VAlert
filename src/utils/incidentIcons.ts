import { Icon } from 'leaflet';

// Modern color palette with gradients
const COLORS = {
  base: {
    gradient: {
      start: '#4B5563',
      end: '#374151'
    },
    stroke: '#FFFFFF',
    background: '#FFFFFF'
  },
  active: {
    gradient: {
      start: '#F59E0B',
      end: '#D97706'
    },
    stroke: '#FFFFFF',
    background: '#FEF3C7'
  }
};

function createSvgIcon(path: string, isActive: boolean = false) {
  const colors = isActive ? COLORS.active : COLORS.base;
  
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors.gradient.start};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors.gradient.end};stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
          </filter>
        </defs>
        <g filter="url(#shadow)" transform="translate(4, 4)">
          <!-- Diamond shape background -->
          <path d="M16 1L31 16L16 31L1 16L16 1Z" 
                fill="url(#iconGradient)" 
                stroke="${colors.stroke}" 
                stroke-width="2"
                stroke-linejoin="round"/>
          <!-- Icon in the center -->
          <g transform="translate(8, 8)" fill="${colors.stroke}">
            ${path}
          </g>
        </g>
      </svg>
    `)}`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
    className: 'incident-marker'
  });
}

// Simplified, clear icon paths (16x16 viewBox)
const ICON_PATHS = {
  // More distinctive flame icon with curved base and sharp tip
  fire: `
    <path d="M8 0L5.5 4.5C4.5 6 4 7 4 8.5 4 11.5 6 14 8 14s4-2.5 4-5.5c0-1.5-0.5-2.5-1.5-4L8 0zM8 12c-1.7 0-3-1.3-3-3 0-1.5 1-2.5 1.5-3C7 7 8 8 8 8s1-1 1.5-2c0.5 0.5 1.5 1.5 1.5 3C11 10.7 9.7 12 8 12z"/>
  `,
  
  // Clear car icon with distinctive shape
  vehicle: `
    <path d="M14 8l-1-4H3L2 8 1 9v4h2v1h2v-1h6v1h2v-1h2V9l-1-1zM3.5 11C2.7 11 2 10.3 2 9.5S2.7 8 3.5 8 5 8.7 5 9.5 4.3 11 3.5 11zm9 0c-.8 0-1.5-.7-1.5-1.5S11.7 8 12.5 8s1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
  `,
  
  // Clear bell icon for alarms
  alarm: `
    <path d="M8 2C5.2 2 3 4.2 3 7v4l-2 2h14l-2-2V7c0-2.8-2.2-5-5-5zm2 12H6c0 1.1.9 2 2 2s2-.9 2-2zM8 0C8.6 0 9 .4 9 1H7C7 .4 7.4 0 8 0z"/>
  `,
  
  // Clear rescue/medical cross icon
  rescue: `
    <path d="M13 6h-3V3c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v3H3c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h3v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h3c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1z"/>
  `,

  // Simple medical cross icon for AFEMR
  medical: `
    <path d="M13 6h-3V3c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v3H3c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h3v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h3c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1z"/>
  `,

  // Firetruck icon for tanker-related incidents
  firetruck: `
    <path d="M15 8l-1.5-3H9V4H7v1H3L1 8v5h1.5c0 1.1.9 2 2 2s2-.9 2-2h4c0 1.1.9 2 2 2s2-.9 2-2H16V8h-1zm-11 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm2-6H3.5l1-2h8l1.5 2z"/>
  `
};

export function getIncidentIcon(description: string, isActive: boolean = false) {
  if (!description) return null;
  
  const normalizedDesc = description.toLowerCase();
  
  // Check for burn-off during FDP
  if (normalizedDesc.includes('burn off during fdp')) {
    return createSvgIcon(ICON_PATHS.fire, isActive);
  }

  // Check for tanker-related incidents first
  if (normalizedDesc.includes('tanker') || normalizedDesc.includes('tankers')) {
    return createSvgIcon(ICON_PATHS.firetruck, isActive);
  }

  // Medical emergencies (AFEMR)
  if (normalizedDesc.includes('afemr') || normalizedDesc.includes('medical emergency')) {
    return createSvgIcon(ICON_PATHS.medical, isActive);
  }

  // Fire-related incidents (including burn offs)
  if (normalizedDesc.includes('fire') || 
      normalizedDesc.includes('smoke') || 
      normalizedDesc.includes('burning') ||
      normalizedDesc.includes('flame') ||
      normalizedDesc.includes('burn off') ||
      normalizedDesc.includes('burnoff') ||
      normalizedDesc.includes('burn-off')) {
    return createSvgIcon(ICON_PATHS.fire, isActive);
  }
  
  // Vehicle-related incidents
  if (normalizedDesc.includes('vehicle') || 
      normalizedDesc.includes('car') || 
      normalizedDesc.includes('truck') ||
      normalizedDesc.includes('accident') ||
      normalizedDesc.includes('collision') ||
      normalizedDesc.includes('washaway')) {
    return createSvgIcon(ICON_PATHS.vehicle, isActive);
  }
  
  // Alarm-related incidents
  if (normalizedDesc.includes('alarm')) {
    return createSvgIcon(ICON_PATHS.alarm, isActive);
  }
  
  // Rescue-related incidents
  if (normalizedDesc.includes('rescue') ||
      normalizedDesc.includes('trapped') ||
      normalizedDesc.includes('assist')) {
    return createSvgIcon(ICON_PATHS.rescue, isActive);
  }
  
  // Return null for unknown incidents
  if (normalizedDesc.includes('unknown') ||
      normalizedDesc.trim() === '') {
    return null;
  }
  
  // Default to rescue icon for other incidents
  return createSvgIcon(ICON_PATHS.rescue, isActive);
}