import { memo } from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface PinnedTimerProps {
  endTime: number;
}

export const PinnedTimer = memo(function PinnedTimer({ endTime }: PinnedTimerProps) {
  const { hours, minutes, seconds, isExpired } = useCountdown(endTime);

  if (isExpired) return null;

  const formatTime = () => {
    const parts: string[] = [];
    
    if (hours > 0) {
      parts.push(`${hours}h`);
      parts.push(`${minutes}m`);
    } else if (minutes > 0) {
      parts.push(`${minutes}m`);
      parts.push(`${seconds}s`);
    } else {
      parts.push(`${seconds}s`);
    }

    return parts.join(' ');
  };

  return (
    <span className="text-xs font-medium tabular-nums">
      {formatTime()}
    </span>
  );
});