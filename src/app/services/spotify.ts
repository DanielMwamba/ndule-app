import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export interface SearchResults {
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
  error?: string;
}

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
    try {
      await this.ensureValidToken();

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
}

export const spotifyService = SpotifyService.getInstance();
