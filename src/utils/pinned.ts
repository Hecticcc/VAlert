import { Incident } from '../types/incident';

const HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

export function shouldPinIncident(incident: Incident): boolean {
  // Pin incidents that are extreme or critical severity
  return incident.severity === 'extreme' || incident.severity === 'critical';
}

export function getPinDuration(incident: Incident): number {
  // Base duration based on severity
  const baseDuration = incident.severity === 'critical' ? 6 * HOUR : 4 * HOUR;

  // Add 30 minutes for each additional station
  const additionalTime = incident.additionalStations.length * 30 * 60 * 1000;

  return baseDuration + additionalTime;
}