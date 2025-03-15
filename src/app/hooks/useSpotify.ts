"use client";

import { useState, useCallback } from "react";
import { spotifyService, SearchResults } from "../services/spotify";

export const useSpotify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [artistDetails, setArtistDetails] = useState<any>(null);

  const searchMusic = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await spotifyService.searchArtistsAndTracks(query);
      setSearchResults(results);
      if (results.error) {
        setError(results.error);
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la recherche");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getArtist = useCallback(async (artistId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const details = await spotifyService.getArtistDetails(artistId);
      setArtistDetails(details);
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la récupération des détails de l'artiste"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    searchResults,
    artistDetails,
    searchMusic,
    getArtist,
  };
};
