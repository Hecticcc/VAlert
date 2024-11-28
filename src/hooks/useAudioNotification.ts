import { useState, useEffect, useCallback, useRef } from 'react';

const AUDIO_SETTINGS_KEY = 'audioNotificationSettings';
const NOTIFICATION_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

// Fallback notification sound in base64 format (short beep)
const FALLBACK_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodHQql8xKm7O8OCvaDo2fOL/8K5nOTiL7P/nqGpFUpPq9tgEDmBTWJ7RxKJpUk2WyraQBWxLQonRxpxrU1eY0LWcIHg/MHHS0ahkQT9/3NiuXDAwid3brGY+PYzj3K1mPT+L5NytaEBEiuXbrGhDSYkAAA==';

export function useAudioNotification() {
  const [muted, setMuted] = useState(() => {
    const saved = localStorage.getItem(AUDIO_SETTINGS_KEY);
    return saved ? JSON.parse(saved).muted : false;
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        const audio = new Audio(NOTIFICATION_URL);
        audio.volume = 0.5;
        
        // Test if external audio loads
        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
          audio.load();
        });
        
        audioRef.current = audio;
        retryCountRef.current = 0;
      } catch (error) {
        console.warn('External notification sound failed to load, using fallback');
        if (retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current++;
          setTimeout(initializeAudio, 1000 * retryCountRef.current);
        } else {
          // Use fallback sound after max retries
          audioRef.current = new Audio(FALLBACK_SOUND);
          audioRef.current.volume = 0.5;
        }
      }
    };

    initializeAudio();
    
    // Listen for new incident events
    const handleNewIncident = () => {
      if (!muted && audioRef.current) {
        // Reset audio to start and play
        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .catch(error => {
            console.warn('Audio playback failed:', error);
            // If external audio fails during playback, switch to fallback
            if (audioRef.current?.src !== FALLBACK_SOUND) {
              audioRef.current = new Audio(FALLBACK_SOUND);
              audioRef.current.volume = 0.5;
              audioRef.current.play()
                .catch(e => console.error('Fallback audio failed:', e));
            }
          });
      }
    };

    window.addEventListener('newIncident', handleNewIncident);
    
    return () => {
      window.removeEventListener('newIncident', handleNewIncident);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [muted]);

  // Save mute preference to localStorage
  useEffect(() => {
    localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify({ muted }));
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((prevMuted: boolean) => !prevMuted);
  }, []);

  return {
    muted,
    toggleMute
  };
}