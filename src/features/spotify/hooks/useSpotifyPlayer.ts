"use client";

import { useState, useCallback } from "react";
import type {
  SpotifyPlayerState,
  SpotifyContextType,
  TrackObjectFull,
} from "../types";

export const useSpotifyPlayer = (
  accessToken: string | null
): SpotifyContextType => {
  const [player, setPlayer] = useState<SpotifyPlayerState>({
    isPlaying: false,
    currentTrack: null,
    volume: 0.5,
    progress: 0,
    isPaused: false,
  });

  const playTrack = useCallback(
    async (trackUri: string) => {
      if (!accessToken) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/play`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uris: [trackUri],
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to play track");
        }

        setPlayer((prev) => ({
          ...prev,
          isPlaying: true,
          isPaused: false,
        }));
      } catch (error) {
        console.error("Error playing track:", error);
      }
    },
    [accessToken]
  );

  const togglePlay = useCallback(async () => {
    if (!accessToken) return;

    try {
      const endpoint = player.isPlaying ? "pause" : "play";
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/${endpoint}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${endpoint}`);
      }

      setPlayer((prev) => ({
        ...prev,
        isPlaying: !prev.isPlaying,
        isPaused: !prev.isPaused,
      }));
    } catch (error) {
      console.error(`Error toggling play:`, error);
    }
  }, [accessToken, player.isPlaying]);

  const play = useCallback(async (track: TrackObjectFull) => {
    setPlayer((prev) => ({
      ...prev,
      isPlaying: true,
      currentTrack: track,
      isPaused: false,
    }));
  }, []);

  const pause = useCallback(async () => {
    setPlayer((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: true,
    }));
  }, []);

  const setVolume = useCallback(
    async (volume: number) => {
      if (!accessToken) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to set volume");
        }

        setPlayer((prev) => ({
          ...prev,
          volume,
        }));
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    },
    [accessToken]
  );

  const seek = useCallback(
    async (position: number) => {
      if (!accessToken) return;

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to seek");
        }

        setPlayer((prev) => ({
          ...prev,
          progress: position,
        }));
      } catch (error) {
        console.error("Error seeking:", error);
      }
    },
    [accessToken]
  );

  return {
    player,
    play,
    pause,
    setVolume,
    seek,
    playTrack,
    togglePlay,
    currentTrack: player.currentTrack,
    isPaused: player.isPaused,
  };
};
