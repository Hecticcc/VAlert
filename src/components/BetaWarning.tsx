import { memo, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const VERSION = '0.9.2b-beta';

export const BetaWarning = memo(function BetaWarning() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 dark:bg-blue-800">
      <div className="max-w-screen-xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <div className="text-xs">
              <strong className="font-semibold">Beta Version {VERSION}</strong>
              <span className="hidden sm:inline"> • </span>
              <br className="sm:hidden" />
              <span className="text-[11px] sm:text-xs">
                This is a preliminary release. Do not rely on this information in emergency situations.
                Always follow official emergency services guidance.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 rounded-lg p-1 hover:bg-blue-500/20 dark:hover:bg-blue-700/20 transition-colors"
            aria-label="Dismiss warning"
          >
            <X className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
});