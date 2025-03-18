import type { SpotifyApi } from "@/types/spotify";

// Types de base
export type TrackObjectFull = SpotifyApi.TrackObjectFull;
export type AlbumObjectFull = SpotifyApi.AlbumObjectFull;
export type ArtistObjectFull = SpotifyApi.ArtistObjectFull;
export type ArtistObjectSimplified = SpotifyApi.ArtistObjectSimplified;
export type ImageObject = SpotifyApi.ImageObject;
export type CategoryObject = SpotifyApi.CategoryObject;
export type AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

// Types pour la recherche
export interface SearchResults {
  artists: ArtistObjectFull[];
  tracks: TrackObjectFull[];
  error?: string;
}

// Types pour les playlists
export interface SimplifiedPlaylist {
  id: string;
  name: string;
  description: string;
  images: ImageObject[];
  uri: string;
  tracks: { total: number };
}

// Types pour la page d'accueil
export interface HomePageData {
  featuredArtists: ArtistObjectFull[];
  trendingTracks: TrackObjectFull[];
  categories: CategoryObject[];
  featuredPlaylists: SimplifiedPlaylist[];
  newReleases: AlbumObjectSimplified[];
  error?: string;
}

// Types pour le lecteur
export interface SpotifyPlayerState {
  isPlaying: boolean;
  currentTrack: TrackObjectFull | null;
  volume: number;
  progress: number;
  isPaused: boolean;
}

export interface SpotifyContextType {
  player: SpotifyPlayerState;
  play: (track: TrackObjectFull) => Promise<void>;
  pause: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  seek: (position: number) => Promise<void>;
  playTrack: (trackUri: string) => Promise<void>;
  togglePlay: () => Promise<void>;
  currentTrack: TrackObjectFull | null;
  isPaused: boolean;
}
