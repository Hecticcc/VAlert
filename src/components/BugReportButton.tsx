import { memo, useState } from 'react';
import { Bug } from 'lucide-react';
import { BugReportForm } from './BugReportForm';
import { Modal } from './Modal';

export const BugReportButton = memo(function BugReportButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        title="Report a bug"
      >
        <Bug size={20} className="text-white" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report a Bug"
      >
        <BugReportForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
});