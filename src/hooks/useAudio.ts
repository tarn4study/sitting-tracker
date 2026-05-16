import { useCallback, useRef } from 'react';

export const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
    }
    
    // Reset to beginning if already playing
    audioRef.current.currentTime = 0;
    
    // Play the sound and handle potential promise rejection 
    // (browsers block autoplay without user interaction)
    audioRef.current.play().catch(error => {
      console.warn("Audio playback failed:", error);
    });
  }, [src]);

  return { play };
};
