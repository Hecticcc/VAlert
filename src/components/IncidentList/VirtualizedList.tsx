import { useVirtual } from '@tanstack/react-virtual';
import { useRef, useCallback, ReactNode } from 'react';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  height: number;
  itemHeight: number;
}

export function VirtualizedList<T>({
  items, 
  renderItem, 
  height, 
  itemHeight 
}: VirtualizedListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: useCallback(() => itemHeight, [itemHeight]),
    overscan: 5
  });

  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: height,
        width: '100%',
        overflow: 'auto'
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.index}
            className="ListItem"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {renderItem(items[virtualRow.index])}
          </div>
        ))}
      </div>
    </div>
  );
}