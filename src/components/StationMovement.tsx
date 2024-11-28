import { memo } from 'react';
import { MoveRight, Building2, Clock } from 'lucide-react';
import { formatDistanceToNowStrict, format } from 'date-fns';

interface StationMovementProps {
  fromStation: string;
  toStation: string;
  timestamp: string;
}

export const StationMovement = memo(function StationMovement({ 
  fromStation, 
  toStation,
  timestamp 
}: StationMovementProps) {
  const timeAgo = formatDistanceToNowStrict(new Date(timestamp), { 
    addSuffix: true,
    roundingMethod: 'floor'
  });
  const formattedTime = format(new Date(timestamp), 'HH:mm:ss');

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
          <Clock size={12} className="mr-1" />
          <span>{formattedTime}</span>
          <span className="mx-1">·</span>
          <span>{timeAgo}</span>
        </div>
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
          Station Movement
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* From Station */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              From
            </span>
          </div>
          <div className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
            {fromStation}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 relative self-center rotate-90 sm:rotate-0">
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <MoveRight size={24} className="text-blue-400 dark:text-blue-500" />
          </div>
          <MoveRight size={24} className="text-blue-600 dark:text-blue-400" />
        </div>

        {/* To Station */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              To
            </span>
          </div>
          <div className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
            {toStation}
          </div>
        </div>
      </div>
    </div>
  );
});