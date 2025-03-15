"use client";

import { useState, useCallback } from "react";
import {
  spotifyService,
  SearchResults,
  HomePageData,
} from "../services/spotify";

export const useSpotify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [artistDetails, setArtistDetails] = useState<any>(null);
  const [albumDetails, setAlbumDetails] = useState<any>(null);
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [filteredResults, setFilteredResults] = useState<any>(null);

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

  const searchWithFilters = useCallback(
    async (
      query: string,
      filters: {
        type?: ("artist" | "track" | "album")[];
        market?: string;
        limit?: number;
        genre?: string;
      }
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await spotifyService.searchWithFilters(query, filters);
        setFilteredResults(results);
        if (results.error) {
          setError(results.error);
        }
      } catch (err) {
        setError("Une erreur est survenue lors de la recherche filtrée");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

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

  const getAlbum = useCallback(async (albumId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const details = await spotifyService.getAlbumDetails(albumId);
      setAlbumDetails(details);
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la récupération des détails de l'album"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getHomePageData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await spotifyService.getHomePageData();
      if (data.error) {
        setError(data.error);
      } else {
        setHomePageData(data);
      }
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des données");
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
    albumDetails,
    homePageData,
    filteredResults,
    searchMusic,
    searchWithFilters,
    getArtist,
    getAlbum,
    getHomePageData,
  };
};
