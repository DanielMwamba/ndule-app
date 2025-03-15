"use client";

import React, { createContext, useContext, useState, useRef } from "react";

interface AudioContextType {
  currentTrack: SpotifyApi.TrackObjectFull | null;
  isPlaying: boolean;
  playTrack: (track: SpotifyApi.TrackObjectFull) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] =
    useState<SpotifyApi.TrackObjectFull | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: SpotifyApi.TrackObjectFull) => {
    if (!track.preview_url) {
      window.open(track.external_urls.spotify, "_blank");
      return;
    }

    if (currentTrack?.id === track.id) {
      resumeTrack();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentTrack(track);
    audioRef.current = new Audio(track.preview_url);
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        resumeTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
