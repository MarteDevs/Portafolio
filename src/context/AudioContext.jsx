import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRetroAudio } from '../hooks/useRetroAudio';

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rpg_audio_muted');
      return saved !== null ? JSON.parse(saved) : false;
    }
    return false;
  });

  const [scanlinesActive, setScanlinesActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rpg_crt_scanlines');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('rpg_audio_muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('rpg_crt_scanlines', JSON.stringify(scanlinesActive));
  }, [scanlinesActive]);

  const soundFx = useRetroAudio(isMuted);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const toggleScanlines = () => {
    setScanlinesActive(prev => !prev);
  };

  return (
    <AudioCtx.Provider value={{
      isMuted,
      toggleMute,
      scanlinesActive,
      toggleScanlines,
      ...soundFx
    }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioCtx);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
