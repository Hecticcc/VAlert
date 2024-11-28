import { useState, useEffect, useCallback } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(endTime: number) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => {
    const total = Math.max(0, endTime - Date.now());
    return {
      hours: Math.floor(total / (1000 * 60 * 60)),
      minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((total % (1000 * 60)) / 1000)
    };
  });

  const calculateTimeRemaining = useCallback(() => {
    const total = Math.max(0, endTime - Date.now());
    const newTime = {
      hours: Math.floor(total / (1000 * 60 * 60)),
      minutes: Math.floor((total % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((total % (1000 * 60)) / 1000)
    };

    setTimeRemaining(newTime);
    return total <= 0;
  }, [endTime]);

  useEffect(() => {
    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    const intervalId = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeRemaining, endTime]);

  return {
    ...timeRemaining,
    isExpired: timeRemaining.hours === 0 && 
              timeRemaining.minutes === 0 && 
              timeRemaining.seconds === 0
  };
}