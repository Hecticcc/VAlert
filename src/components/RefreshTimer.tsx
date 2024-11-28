import { RefreshCw } from 'lucide-react';
import { memo } from 'react';

interface RefreshTimerProps {
  timeUntilRefresh: number;
  onRefresh: () => void;
  isLoading: boolean;
}

export const RefreshTimer = memo(function RefreshTimer({ 
  timeUntilRefresh, 
  onRefresh, 
  isLoading 
}: RefreshTimerProps) {
  const seconds = Math.ceil(timeUntilRefresh / 1000);
  
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Refresh now"
      >
        <RefreshCw
          size={18}
          className={`${isLoading ? 'animate-spin' : ''} text-white/90`}
        />
      </button>
      <span className="text-sm text-white/90 whitespace-nowrap hidden sm:inline">
        Refreshing in {seconds}s
      </span>
    </div>
  );
});