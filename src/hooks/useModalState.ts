import { useState, useEffect, useCallback, useRef } from 'react';

const MODAL_STATE_KEY = 'modalState';

interface ModalState {
  reference: string;
  isOpen: boolean;
  scrollPosition: number;
  modalPosition?: {
    top: number;
    left: number;
  };
  lastUpdate: number;
}

export function useModalState(reference?: string) {
  const [isOpen, setIsOpen] = useState(() => {
    if (!reference) return false;
    try {
      const savedState = sessionStorage.getItem(MODAL_STATE_KEY);
      if (savedState) {
        const state: ModalState = JSON.parse(savedState);
        return state.reference === reference && state.isOpen;
      }
    } catch (error) {
      console.error('Error reading modal state:', error);
    }
    return false;
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<ModalState['modalPosition']>();
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  // Save modal state and position when it changes
  useEffect(() => {
    if (!isOpen || !reference) return;

    const updateState = () => {
      if (!modalRef.current) return;

      const rect = modalRef.current.getBoundingClientRect();
      const modalPosition = {
        top: window.scrollY + (window.innerHeight - rect.height) / 2,
        left: window.scrollX + (window.innerWidth - rect.width) / 2
      };
      positionRef.current = modalPosition;

      const state: ModalState = {
        reference,
        isOpen: true,
        scrollPosition: window.scrollY,
        modalPosition,
        lastUpdate: Date.now()
      };
      sessionStorage.setItem(MODAL_STATE_KEY, JSON.stringify(state));
    };

    // Initial update
    updateState();

    // Update position periodically
    const interval = setInterval(updateState, 500);

    // Update before refresh
    const handleBeforeRefresh = () => {
      updateState();
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      refreshTimeoutRef.current = setTimeout(() => {
        restorePosition();
      }, 100);
    };

    window.addEventListener('beforeunload', handleBeforeRefresh);
    document.addEventListener('visibilitychange', handleBeforeRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeRefresh);
      document.removeEventListener('visibilitychange', handleBeforeRefresh);
    };
  }, [isOpen, reference]);

  const restorePosition = useCallback(() => {
    if (!isOpen || !reference || !modalRef.current) return;

    try {
      const savedState = sessionStorage.getItem(MODAL_STATE_KEY);
      if (!savedState) return;

      const state: ModalState = JSON.parse(savedState);
      if (!state.modalPosition) return;

      // Center the modal in the viewport
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const modalHeight = modalRef.current.offsetHeight;
      const modalWidth = modalRef.current.offsetWidth;

      modalRef.current.style.position = 'fixed';
      modalRef.current.style.top = `${(viewportHeight - modalHeight) / 2}px`;
      modalRef.current.style.left = `${(viewportWidth - modalWidth) / 2}px`;
      modalRef.current.style.transform = 'none';
      modalRef.current.style.margin = '0';
      modalRef.current.style.zIndex = '99999';

      // Schedule next update
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      updateTimeoutRef.current = setTimeout(restorePosition, 500);
    } catch (error) {
      console.error('Error restoring modal position:', error);
    }
  }, [isOpen, reference]);

  // Restore modal position after refresh
  useEffect(() => {
    if (!isOpen || !reference) return;

    const handleRefresh = () => {
      restorePosition();
      
      // Ensure modal stays visible during refresh cycles
      const refreshInterval = setInterval(restorePosition, 500);
      return () => clearInterval(refreshInterval);
    };

    const cleanup = handleRefresh();
    return () => cleanup();
  }, [isOpen, reference, restorePosition]);

  const open = useCallback(() => {
    if (!reference) return;

    const state: ModalState = {
      reference,
      isOpen: true,
      scrollPosition: window.scrollY,
      lastUpdate: Date.now()
    };
    sessionStorage.setItem(MODAL_STATE_KEY, JSON.stringify(state));
    setIsOpen(true);
  }, [reference]);

  const close = useCallback(() => {
    setIsOpen(false);
    sessionStorage.removeItem(MODAL_STATE_KEY);
    positionRef.current = undefined;
    
    if (modalRef.current) {
      modalRef.current.style.position = '';
      modalRef.current.style.top = '';
      modalRef.current.style.left = '';
      modalRef.current.style.transform = '';
      modalRef.current.style.margin = '';
      modalRef.current.style.zIndex = '';
    }

    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  return {
    isOpen,
    open,
    close,
    modalRef,
    position: positionRef.current
  };
}