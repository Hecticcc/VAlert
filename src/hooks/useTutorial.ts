import { useState, useCallback, useEffect, useRef } from 'react';

interface TutorialStep {
  element: string;
  title: string;
  description: string;
  shortcuts?: string[];
}

interface ElementState {
  element: HTMLElement;
  originalStyles: {
    zIndex: string;
    position: string;
    pointerEvents: string;
  };
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    element: '[data-tutorial="map"]',
    title: 'Incident Map',
    description: 'Interactive map showing real-time incidents across Victoria.\n\nMarkers are color-coded by severity level:\n• Green: Low severity\n• Yellow: Medium severity\n• Orange: High severity\n• Red: Extreme severity\n• Purple: Critical severity',
    shortcuts: ['Click: Select incident', 'Scroll: Zoom map', 'Drag: Pan view']
  },
  {
    element: '.settings-button',
    title: 'Settings Menu',
    description: 'Customize your experience:\n\n• Audio notifications alert you when new incidents occur\n• Dark/Light theme options for comfortable viewing\n• Settings are saved automatically',
    shortcuts: ['M: Toggle mute', 'T: Toggle theme']
  },
  {
    element: '[data-tutorial="refresh"]',
    title: 'Live Updates',
    description: 'Stay up to date:\n\n• Auto-refreshes every 30 seconds\n• Manual refresh available\n• Shows countdown to next update\n• Critical incidents are pinned and highlighted',
    shortcuts: ['R: Manual refresh']
  },
  {
    element: '[data-tutorial="code-indicators"]',
    title: 'Response Codes',
    description: 'Emergency response indicators:\n\n• Code 1 (Red): Urgent response with lights and sirens\n• Code 3 (Blue): Standard response\n\nThe colored bar on the left shows the response type.',
    shortcuts: ['Click: View incident details']
  },
  {
    element: '[data-tutorial="severity-levels"]',
    title: 'Severity Levels',
    description: 'Incidents are categorized by responding units:\n\n• Low: 1-2 appliances\n• Medium: 3-4 appliances\n• High: 5-6 appliances\n• Extreme: 7-8 appliances\n• Critical: 9+ appliances',
    shortcuts: ['Click: View full details']
  },
  {
    element: '[data-tutorial="station-info"]',
    title: 'Station Information',
    description: 'Fire station details:\n\n• Primary responding stations listed first\n• Additional stations highlighted in amber\n• Hover over station codes to see full names\n• Click reference number for complete incident log',
    shortcuts: ['Hover: View station names']
  }
];

const TUTORIAL_STORAGE_KEY = 'vicalert-tutorial-progress';
const ANIMATION_DURATION = 200; // ms

export function useTutorial() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const activeElementRef = useRef<ElementState | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  const updateTargetElement = useCallback(() => {
    if (!isActive) return;
    
    const step = TUTORIAL_STEPS[currentStep - 1];
    if (!step) return;

    // Clean up previous element
    if (activeElementRef.current) {
      const { element, originalStyles } = activeElementRef.current;
      element.style.zIndex = originalStyles.zIndex;
      element.style.position = originalStyles.position;
      element.style.pointerEvents = originalStyles.pointerEvents;
      activeElementRef.current = null;
    }

    const element = document.querySelector(step.element) as HTMLElement;

    if (element) {
      // Store original styles
      activeElementRef.current = {
        element,
        originalStyles: {
          zIndex: element.style.zIndex,
          position: element.style.position,
          pointerEvents: element.style.pointerEvents
        }
      };

      // Apply tutorial styles
      element.style.pointerEvents = 'auto';
      element.style.position = 'relative';
      element.style.zIndex = '9998';
      
      // Smooth transition between elements
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      setTargetElement(null);
      transitionTimeoutRef.current = setTimeout(() => {
        setTargetElement(element);
      }, ANIMATION_DURATION / 2);
    }
  }, [isActive, currentStep]);

  // Update target element when step changes or window resizes
  useEffect(() => {
    updateTargetElement();
    window.addEventListener('resize', updateTargetElement);
    
    return () => {
      window.removeEventListener('resize', updateTargetElement);
      // Clean up on unmount
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (activeElementRef.current) {
        const { element, originalStyles } = activeElementRef.current;
        element.style.zIndex = originalStyles.zIndex;
        element.style.position = originalStyles.position;
        element.style.pointerEvents = originalStyles.pointerEvents;
      }
    };
  }, [updateTargetElement]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          if (currentStep < TUTORIAL_STEPS.length) {
            setCurrentStep(prev => prev + 1);
          }
          break;
        case 'ArrowLeft':
          if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
          }
          break;
        case 'Escape':
          setIsActive(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentStep]);

  // Save progress
  useEffect(() => {
    if (isActive) {
      try {
        localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify({
          completed: false,
          lastStep: currentStep,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.warn('Failed to save tutorial progress:', error);
      }
    }
  }, [isActive, currentStep]);

  const startTutorial = useCallback(() => {
    try {
      const saved = localStorage.getItem(TUTORIAL_STORAGE_KEY);
      if (saved) {
        const { lastStep, timestamp } = JSON.parse(saved);
        // Resume from last step if within 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setCurrentStep(lastStep);
        } else {
          setCurrentStep(1);
        }
      } else {
        setCurrentStep(1);
      }
    } catch (error) {
      console.warn('Failed to load tutorial progress:', error);
      setCurrentStep(1);
    }
    setIsActive(true);
  }, []);

  const endTutorial = useCallback(() => {
    setIsActive(false);
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    // Clean up active element
    if (activeElementRef.current) {
      const { element, originalStyles } = activeElementRef.current;
      element.style.zIndex = originalStyles.zIndex;
      element.style.position = originalStyles.position;
      element.style.pointerEvents = originalStyles.pointerEvents;
      activeElementRef.current = null;
    }
    setTargetElement(null);
    try {
      localStorage.setItem(TUTORIAL_STORAGE_KEY, JSON.stringify({
        completed: true,
        lastStep: TUTORIAL_STEPS.length,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save tutorial completion:', error);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TUTORIAL_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  return {
    isActive,
    currentStep,
    totalSteps: TUTORIAL_STEPS.length,
    targetElement,
    currentStepData: TUTORIAL_STEPS[currentStep - 1],
    startTutorial,
    endTutorial,
    nextStep,
    previousStep
  };
}