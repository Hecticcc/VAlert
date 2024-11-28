import { memo } from 'react';
import { Pin } from 'lucide-react';
import { PinnedTimer } from './PinnedTimer';

interface PinnedBadgeProps {
  pinnedAt: number;
  duration: number;
}

export const PinnedBadge = memo(function PinnedBadge({ pinnedAt, duration }: PinnedBadgeProps) {
  const endTime = pinnedAt + duration;

  return (
    <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 dark:bg-purple-900/30 rounded-full">
      <Pin size={12} className="text-purple-500 dark:text-purple-400" />
      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
        Pinned (<PinnedTimer endTime={endTime} />)
      </span>
    </div>
  );
});