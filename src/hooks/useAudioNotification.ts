import { useState, useEffect, useCallback, useRef } from 'react';

const AUDIO_SETTINGS_KEY = 'audioNotificationSettings';
const NOTIFICATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

interface AudioSettings {
  muted: boolean;
}

export function useAudioNotification() {
  const [muted, setMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(AUDIO_SETTINGS_KEY);
      return saved ? JSON.parse(saved).muted : false;
    } catch {
      return false;
    }
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.preload = 'auto';
    }
    
    const handleNewIncident = () => {
      if (!muted && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.warn('Audio playback failed:', error);
        });
      }
    };

    window.addEventListener('newIncident', handleNewIncident);
    
    return () => {
      window.removeEventListener('newIncident', handleNewIncident);
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, [muted]);

  useEffect(() => {
    try {
      const settings: AudioSettings = { muted };
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save audio settings:', error);
    }
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted(prev => !prev);
  }, []);

  return {
    muted,
    toggleMute
  };
}