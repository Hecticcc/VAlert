import { memo } from 'react';

export const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="w-2 h-12 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>
          <div className="flex space-x-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  );
});