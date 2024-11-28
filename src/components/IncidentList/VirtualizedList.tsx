import { memo, useRef, useEffect, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Incident } from '../../types/incident';
import { IncidentCard } from '../IncidentCard';

interface VirtualizedListProps {
  incidents: Incident[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onIncidentClick?: (id: string) => void;
}

export const VirtualizedList = memo(function VirtualizedList({
  incidents,
  isLoading,
  hasMore,
  onLoadMore,
  onIncidentClick
}: VirtualizedListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: incidents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 200, []),
    overscan: 10,
    initialRect: { width: 0, height: 800 }
  });

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !isLoading && hasMore) {
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div 
      ref={parentRef}
      className="h-full overflow-auto will-change-transform"
      style={{ height: '800px' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          willChange: 'transform'
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const incident = incidents[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
                willChange: 'transform'
              }}
            >
              <div className="p-2 transform-gpu">
                <IncidentCard
                  incident={incident}
                  onClick={() => onIncidentClick?.(incident.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div ref={loadMoreRef} className="h-10">
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
});