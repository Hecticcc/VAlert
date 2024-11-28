import { memo, useState } from 'react';
import { Settings } from 'lucide-react';
import { Modal } from './Modal';

export const SettingsMenu = memo(function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
        title="Settings"
      >
        <Settings size={18} className="text-white" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
              Display Settings
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Show EMR Calls
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Display Electronic Medical Record calls in the incident feed
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                    Currently Unavailable
                  </span>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                    disabled
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Some settings may be temporarily unavailable during the beta period.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
});