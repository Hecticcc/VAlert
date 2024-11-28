import { memo, useEffect } from 'react';
import { TutorialButton } from './TutorialButton';
import { TutorialStep } from './TutorialStep';
import { TutorialOverlay } from './TutorialOverlay';
import { useTutorial } from '../../hooks/useTutorial';
import { usePageLoad } from '../../hooks/usePageLoad';

export const Tutorial = memo(function Tutorial() {
  const {
    isActive,
    currentStep,
    totalSteps,
    targetElement,
    currentStepData,
    startTutorial,
    endTutorial,
    nextStep,
    previousStep
  } = useTutorial();
  const { isLoaded, error } = usePageLoad();

  useEffect(() => {
    if (error) {
      console.error('Failed to initialize tutorial:', error);
    }
  }, [error]);

  // Only show tutorial button when page is fully loaded
  if (!isActive && isLoaded) {
    return <TutorialButton onClick={startTutorial} />;
  }

  // Don't render tutorial components until page is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <TutorialOverlay targetElement={targetElement} />
      <TutorialStep
        title={currentStepData.title}
        description={currentStepData.description}
        currentStep={currentStep}
        totalSteps={totalSteps}
        targetElement={targetElement}
        onNext={nextStep}
        onPrevious={previousStep}
        onSkip={endTutorial}
        shortcuts={currentStepData.shortcuts}
      />
    </>
  );
});