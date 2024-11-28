import { memo } from 'react';
import { X } from 'lucide-react';

interface MapOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export const MapOverlay = memo(function MapOverlay({ isVisible, onClose }: MapOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-[1000] bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-4 animate-modalEnter">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg transition-colors"
          aria-label="Close overlay"
        >
          <X size={20} />
        </button>
        <p className="text-lg font-medium text-center text-gray-900 dark:text-gray-100">
          Map under development
        </p>
      </div>
    </div>
  );
});