import { memo } from 'react';
import { getStationName } from '../utils/stationUtils';

interface StationBadgeProps {
  station: string;
  isAdditional?: boolean;
}

export const StationBadge = memo(function StationBadge({ station, isAdditional }: StationBadgeProps) {
  // Skip rendering for specific stations (unchanged)
  if (station.includes('FGD') || 
      station.includes('EMR') || 
      station.includes('E24') || 
      station.startsWith('E24') ||
      station.length <= 2 ||
      station === 'ATTEND') {
    return null;
  }

  const fullName = getStationName(station);
  
  // Don't show tooltip for AFPR stations
  if (station.includes('AFPR')) {
    return (
      <span className="text-xs px-1.5 py-0.5 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded whitespace-nowrap">
        {station.replace(/[\[\]]/g, '')}
      </span>
    );
  }
  
  return (
    <div className="group relative inline-block">
      <span className={`text-xs px-1.5 py-0.5 rounded cursor-help whitespace-nowrap ${
        isAdditional
          ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
      }`}>
        {station.replace(/[\[\]]/g, '')}
      </span>
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 max-w-[200px] break-words">
        {fullName}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
      </div>
    </div>
  );
});