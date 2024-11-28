import { memo, useRef, useEffect, useState } from 'react';
import { Settings, Volume2, VolumeX, Moon, Sun } from 'lucide-react';

interface SettingsMenuProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  muted: boolean;
  toggleMute: () => void;
}

export const SettingsMenu = memo(function SettingsMenu({
  isDarkMode,
  toggleDarkMode,
  muted,
  toggleMute
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors settings-button"
        title="Settings"
      >
        <Settings size={18} className="text-white" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
        >
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Settings</h3>
          </div>
          
          <div className="p-2 space-y-1">
            <button
              onClick={toggleMute}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {muted ? (
                <VolumeX size={16} className="flex-shrink-0" />
              ) : (
                <Volume2 size={16} className="flex-shrink-0" />
              )}
              <span>Audio: {muted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {isDarkMode ? (
                <Sun size={16} className="flex-shrink-0" />
              ) : (
                <Moon size={16} className="flex-shrink-0" />
              )}
              <span>Theme: {isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});