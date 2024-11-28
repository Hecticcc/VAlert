import { memo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TutorialStepProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  targetElement: HTMLElement | null;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  shortcuts?: string[];
}

export const TutorialStep = memo(function TutorialStep({
  title,
  description,
  currentStep,
  totalSteps,
  targetElement,
  onNext,
  onPrevious,
  onSkip,
  shortcuts
}: TutorialStepProps) {
  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  const tooltipOffset = window.innerWidth < 640 ? 12 : 16; // Smaller offset on mobile

  // Position tooltip based on available space
  const getTooltipPosition = () => {
    const tooltipWidth = window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 320) : 360;
    const tooltipHeight = shortcuts ? 240 : 180;
    
    // Try to position below first
    if (rect.bottom + tooltipHeight + tooltipOffset < window.innerHeight) {
      return {
        top: rect.bottom + tooltipOffset,
        left: Math.max(16, Math.min(
          rect.left + (rect.width - tooltipWidth) / 2,
          window.innerWidth - tooltipWidth - 16
        ))
      };
    }
    
    // Otherwise, position above
    return {
      bottom: window.innerHeight - rect.top + tooltipOffset,
      left: Math.max(16, Math.min(
        rect.left + (rect.width - tooltipWidth) / 2,
        window.innerWidth - tooltipWidth - 16
      ))
    };
  };

  const position = getTooltipPosition();

  return (
    <div
      className="fixed z-[9999] w-[calc(100vw-32px)] sm:w-[360px] max-w-[360px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 pointer-events-auto"
      style={position}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <button
            onClick={onSkip}
            className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg transition-colors"
            aria-label="Skip tutorial"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
          {description.split('\n').map((line, i) => (
            <span key={i} className="block mb-1">{line}</span>
          ))}
        </p>

        {shortcuts && shortcuts.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Keyboard Shortcuts
            </h4>
            <div className="space-y-1">
              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="text-[10px] sm:text-xs bg-gray-50 dark:bg-gray-700 px-2 py-1 sm:py-1.5 rounded flex items-center gap-2"
                >
                  <kbd className="font-mono bg-gray-100 dark:bg-gray-600 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300">
                    {shortcut.split(':')[0]}
                  </kbd>
                  <span className="text-gray-600 dark:text-gray-400">
                    {shortcut.split(':')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 sm:mt-4">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Step {currentStep} of {totalSteps}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              disabled={currentStep === 1}
              className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous step"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            
            <button
              disabled={currentStep === totalSteps}
              className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next step"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});