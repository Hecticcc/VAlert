import { memo } from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export const FilterBar = memo(function FilterBar({ onFilterChange, activeFilter }: FilterBarProps) {
  const filters = ['all', 'active', 'contained', 'controlled'];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Filter size={18} />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-red-500 dark:bg-red-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
});