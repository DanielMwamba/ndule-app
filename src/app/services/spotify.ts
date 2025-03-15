import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export interface SearchResults {
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
  error?: string;
}

export class SpotifyService {
  private static instance: SpotifyService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): SpotifyService {
    if (!SpotifyService.instance) {
      SpotifyService.instance = new SpotifyService();
    }
    return SpotifyService.instance;
  }

  async initialize() {
    try {
      const data = await spotifyApi.clientCredentialsGrant();
      this.accessToken = data.body.access_token;
      spotifyApi.setAccessToken(this.accessToken);
    } catch (error) {
      console.error("Error initializing Spotify API:", error);
      throw error;
    }
  }

  async searchArtistsAndTracks(query: string): Promise<SearchResults> {
    try {
      if (!this.accessToken) await this.initialize();

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
      if (!this.accessToken) await this.initialize();

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
