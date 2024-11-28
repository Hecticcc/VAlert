import { memo } from 'react';
import { HelpCircle } from 'lucide-react';

interface TutorialButtonProps {
  onClick: () => void;
}

export const TutorialButton = memo(function TutorialButton({ onClick }: TutorialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 p-2.5 sm:p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Start tutorial"
    >
      <HelpCircle size={20} className="sm:w-6 sm:h-6" />
    </button>
  );
});