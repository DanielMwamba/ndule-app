import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export interface SearchResults {
  artists: SpotifyApi.ArtistObjectFull[];
  tracks: SpotifyApi.TrackObjectFull[];
  error?: string;
}

export interface SimplifiedPlaylist {
  id: string;
  name: string;
  description: string;
  images: SpotifyApi.ImageObject[];
  uri: string;
  tracks: { total: number };
}

export interface HomePageData {
  featuredArtists: SpotifyApi.ArtistObjectFull[];
  trendingTracks: SpotifyApi.TrackObjectFull[];
  categories: SpotifyApi.CategoryObject[];
  featuredPlaylists: SimplifiedPlaylist[];
  newReleases: SpotifyApi.AlbumObjectSimplified[];
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
      console.log("Token actuel:", this.accessToken);

      // Commençons par une seule requête pour vérifier
      console.log("Récupération des nouveautés...");
      const newReleasesResponse = await spotifyApi.getNewReleases({
        limit: 10,
        country: "FR",
      });
      console.log(
        "Nouveautés reçues:",
        JSON.stringify(newReleasesResponse.body, null, 2)
      );

      // Si ça fonctionne, on continue avec les artistes
      console.log("Récupération des artistes...");
      const artistIds = [
        "3TVXtAsR1Inumwj472S9r4", // Drake
        "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
      ];
      const artistsResponse = await spotifyApi.getArtists(artistIds);
      console.log(
        "Artistes reçus:",
        JSON.stringify(artistsResponse.body, null, 2)
      );

      // Vérification des artistes avant de continuer
      if (
        !artistsResponse.body.artists ||
        artistsResponse.body.artists.length === 0
      ) {
        console.error("Aucun artiste reçu de l'API");
        throw new Error("No artists received from API");
      }

      // Recherche de titres populaires
      console.log("Recherche de titres...");
      const tracksResponse = await spotifyApi.searchTracks(
        "genre:pop year:2024",
        {
          limit: 8,
          market: "FR",
        }
      );
      console.log(
        "Titres reçus:",
        JSON.stringify(tracksResponse.body, null, 2)
      );

      // Vérification des titres avant de continuer
      if (
        !tracksResponse.body.tracks?.items ||
        tracksResponse.body.tracks.items.length === 0
      ) {
        console.error("Aucun titre reçu de l'API");
        throw new Error("No tracks received from API");
      }

      // Si tout fonctionne, on ajoute les catégories
      console.log("Récupération des catégories...");
      const categoriesResponse = await spotifyApi.getCategories({
        limit: 6,
        country: "FR",
      });
      console.log(
        "Catégories reçues:",
        JSON.stringify(categoriesResponse.body, null, 2)
      );

      // Vérification des catégories avant de continuer
      if (
        !categoriesResponse.body.categories?.items ||
        categoriesResponse.body.categories.items.length === 0
      ) {
        console.error("Aucune catégorie reçue de l'API");
        throw new Error("No categories received from API");
      }

      // Récupérer des playlists populaires via recherche
      console.log("Récupération des playlists via recherche...");
      const playlistsResponse = await spotifyApi.searchPlaylists(
        "top hits 2024",
        {
          limit: 10,
          market: "FR",
        }
      );

      console.log(
        "Réponse brute des playlists:",
        JSON.stringify(playlistsResponse.body, null, 2)
      );

      // Vérification des playlists avant de continuer
      if (
        !playlistsResponse.body.playlists?.items ||
        playlistsResponse.body.playlists.items.length === 0
      ) {
        console.error("Aucune playlist reçue de l'API");
        throw new Error("No playlists received from API");
      }

      const recommendedPlaylists: SimplifiedPlaylist[] =
        playlistsResponse.body.playlists.items
          .filter(
            (playlist) =>
              playlist &&
              playlist.id &&
              playlist.name &&
              playlist.images?.length > 0
          )
          .slice(0, 4)
          .map((playlist) => ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.description || "",
            images: playlist.images || [],
            uri: playlist.uri || "",
            tracks: { total: playlist.tracks?.total || 0 },
          }));

      console.log(
        "Playlists transformées:",
        JSON.stringify(recommendedPlaylists, null, 2)
      );

      return {
        featuredArtists: artistsResponse.body.artists || [],
        trendingTracks: tracksResponse.body.tracks?.items || [],
        categories: categoriesResponse.body.categories?.items || [],
        featuredPlaylists: recommendedPlaylists,
        newReleases: newReleasesResponse.body.albums?.items || [],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur détaillée:", {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      return {
        featuredArtists: [],
        trendingTracks: [],
        categories: [],
        featuredPlaylists: [],
        newReleases: [],
        error: "Failed to fetch home page data",
      };
    }
  }

  // Ajouter une méthode pour la recherche avec filtres
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
        searchPromises.push(
          spotifyApi.searchArtists(query, {
            limit: filters.limit || 20,
            market: filters.market || "FR",
          })
        );
      }
      if (!filters.type || filters.type.includes("track")) {
        searchPromises.push(
          spotifyApi.searchTracks(query, {
            limit: filters.limit || 20,
            market: filters.market || "FR",
          })
        );
      }
      if (!filters.type || filters.type.includes("album")) {
        searchPromises.push(
          spotifyApi.searchAlbums(query, {
            limit: filters.limit || 20,
            market: filters.market || "FR",
          })
        );
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
