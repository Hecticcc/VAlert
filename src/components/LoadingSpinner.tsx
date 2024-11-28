import { memo } from 'react';
import { Flame } from 'lucide-react';

export const LoadingSpinner = memo(function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
        
        {/* Pulsing flame icon */}
        <div className="relative animate-bounce">
          <Flame size={48} className="text-orange-500 animate-pulse" />
        </div>
        
        {/* Rotating ring */}
        <div className="absolute -inset-2">
          <div className="w-full h-full rounded-full border-4 border-t-orange-500 border-r-orange-400 border-b-orange-300 border-l-orange-200 animate-spin" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Loading Incidents
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Fetching latest emergency data...
        </p>
      </div>
    </div>
  );
});