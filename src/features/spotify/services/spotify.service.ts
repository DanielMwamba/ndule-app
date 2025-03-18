import SpotifyWebApi from "spotify-web-api-node";
// import type { SpotifyApi } from "@/types/spotify";
import { SearchResults, SimplifiedPlaylist, HomePageData } from "../types";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

class SpotifyService {
  private static instance: SpotifyService;
  private accessToken: string | null = null;
  private tokenExpirationTime: number | null = null;

  private constructor() {}

  public static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  private async refreshAccessToken() {
    try {
      const response = await fetch("/api/spotify/token");
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      this.accessToken = data.access_token;
      this.tokenExpirationTime = Date.now() + data.expires_in * 1000;

      if (this.accessToken) {
        spotifyApi.setAccessToken(this.accessToken);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  private async ensureValidToken() {
    if (
      !this.accessToken ||
      !this.tokenExpirationTime ||
      Date.now() >= this.tokenExpirationTime
    ) {
      await this.refreshAccessToken();
    }
  }

  async searchArtistsAndTracks(query: string): Promise<SearchResults> {
    try {
      await this.ensureValidToken();

      const [artistsResponse, tracksResponse] = await Promise.all([
        spotifyApi.searchArtists(query),
        spotifyApi.searchTracks(query),
      ]);

      return {
        artists: artistsResponse.body.artists?.items || [],
        tracks: tracksResponse.body.tracks?.items || [],
      };
    } catch (error) {
      console.error("Error searching Spotify:", error);
      return {
        artists: [],
        tracks: [],
        error: "Failed to search Spotify",
      };
    }
  }

  async getArtistDetails(artistId: string) {
    await this.ensureValidToken();
    try {
      const [artist, topTracks, albums] = await Promise.all([
        spotifyApi.getArtist(artistId),
        spotifyApi.getArtistTopTracks(artistId, "FR"),
        spotifyApi.getArtistAlbums(artistId),
      ]);

      return {
        artist: artist.body,
        topTracks: topTracks.body.tracks,
        albums: albums.body.items,
      };
    } catch (error) {
      console.error("Error fetching artist details:", error);
      throw error;
    }
  }

  async getAlbumDetails(albumId: string) {
    await this.ensureValidToken();
    try {
      const album = await spotifyApi.getAlbum(albumId);
      return album.body;
    } catch (error) {
      console.error("Error fetching album details:", error);
      throw error;
    }
  }

  async getHomePageData(): Promise<HomePageData> {
    try {
      await this.ensureValidToken();

      const [
        newReleasesResponse,
        artistsResponse,
        tracksResponse,
        categoriesResponse,
        playlistsResponse,
      ] = await Promise.all([
        spotifyApi.getNewReleases({ limit: 20, country: "FR" }),
        spotifyApi.getArtists([
          "3TVXtAsR1Inumwj472S9r4", // Drake
          "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
        ]),
        spotifyApi.searchTracks("genre:pop year:2024", {
          limit: 10,
          market: "FR",
        }),
        spotifyApi.getCategories({
          limit: 10,
          country: "FR",
        }),
        spotifyApi.searchPlaylists("top hits 2025", {
          limit: 10,
          market: "FR",
        }),
      ]);

      const playlists = playlistsResponse.body.playlists?.items || [];
      const recommendedPlaylists: SimplifiedPlaylist[] = playlists
        .filter((playlist): playlist is SpotifyApi.PlaylistObjectSimplified => {
          return Boolean(
            playlist &&
              typeof playlist.id === "string" &&
              typeof playlist.name === "string" &&
              Array.isArray(playlist.images) &&
              playlist.images.length > 0
          );
        })
        .slice(0, 4)
        .map((playlist) => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description || "",
          images: playlist.images || [],
          uri: playlist.uri || "",
          tracks: { total: playlist.tracks?.total || 0 },
        }));

      return {
        featuredArtists: artistsResponse.body.artists || [],
        trendingTracks: tracksResponse.body.tracks?.items || [],
        categories: categoriesResponse.body.categories?.items || [],
        featuredPlaylists: recommendedPlaylists,
        newReleases: newReleasesResponse.body.albums?.items || [],
      };
    } catch (error) {
      console.error("Error fetching homepage data:", error);
      return {
        featuredArtists: [],
        trendingTracks: [],
        categories: [],
        featuredPlaylists: [],
        newReleases: [],
        error: "Failed to fetch homepage data",
      };
    }
  }

  async searchWithFilters(
    query: string,
    filters: {
      type?: ("artist" | "track" | "album")[];
      market?: string;
      limit?: number;
      genre?: string;
    }
  ): Promise<{
    artists: SpotifyApi.ArtistObjectFull[];
    tracks: SpotifyApi.TrackObjectFull[];
    albums: SpotifyApi.AlbumObjectSimplified[];
    error?: string;
  }> {
    try {
      await this.ensureValidToken();

      const searchPromises = [];
      if (!filters.type || filters.type.includes("artist")) {
        searchPromises.push(spotifyApi.searchArtists(query));
      }
      if (!filters.type || filters.type.includes("track")) {
        searchPromises.push(spotifyApi.searchTracks(query));
      }
      if (!filters.type || filters.type.includes("album")) {
        searchPromises.push(spotifyApi.searchAlbums(query));
      }

      const results = await Promise.all(searchPromises);

      return {
        artists: results[0]?.body.artists?.items || [],
        tracks: results[1]?.body.tracks?.items || [],
        albums: results[2]?.body.albums?.items || [],
      };
    } catch (error) {
      console.error("Error searching with filters:", error);
      return {
        artists: [],
        tracks: [],
        albums: [],
        error: "Failed to search with filters",
      };
    }
  }
}

export const spotifyService = SpotifyService.getInstance();
