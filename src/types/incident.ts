export interface Location {
  name: string;
  address: string;
  crossStreet?: string;
}

export interface Incident {
  id: string;
  stationId: string;
  stations: string[];
  additionalStations: string[];
  alertCode: string;
  alertType: string;
  title: string;
  location: Location;
  coordinates: [number, number];
  timestamp: string;
  status: 'active' | 'contained' | 'controlled';
  severity: 'low' | 'medium' | 'high' | 'extreme' | 'critical' | 'pending';
  description: string;
  reference?: string;
  stationDisplay: string;
  rawText?: string;
  hasUpdate?: boolean;
  tags?: string[];
  district?: number;
  initialBrigade?: string;
}