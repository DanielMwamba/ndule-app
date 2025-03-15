import { useState, useCallback } from "react";
import { SpotifyService, SearchResults } from "../services/spotify";

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
      const spotify = SpotifyService.getInstance();
      const results = await spotify.searchArtistsAndTracks(query);
      setSearchResults(results);
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
      const spotify = SpotifyService.getInstance();
      const details = await spotify.getArtistDetails(artistId);
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
