import { memo } from 'react';

interface TutorialOverlayProps {
  targetElement: HTMLElement | null;
}

export const TutorialOverlay = memo(function TutorialOverlay({ targetElement }: TutorialOverlayProps) {
  if (!targetElement) return null;

  const rect = targetElement.getBoundingClientRect();
  
  return (
    <>
      {/* Semi-transparent overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9997] transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: targetElement ? 0.5 : 0
        }}
      />
      
      {/* Highlight cutout */}
      <div
        className="fixed z-[9998] bg-white/10 rounded-lg ring-2 ring-blue-500 ring-offset-2 transition-all duration-200 ease-in-out"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          opacity: targetElement ? 1 : 0,
          transform: targetElement ? 'scale(1)' : 'scale(0.95)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-lg animate-[pulse_2s_ease-in-out_infinite] bg-blue-500/20" />
      </div>
    </>
  );
});