export interface SpotifyApi {
  TrackObjectFull: {
    id: string;
    name: string;
    artists: ArtistObjectSimplified[];
    album: AlbumObjectSimplified;
    duration_ms: number;
    external_urls: { spotify: string };
    uri: string;
    preview_url: string | null;
    images: ImageObject[];
  };
  AlbumObjectFull: {
    id: string;
    name: string;
    artists: ArtistObjectSimplified[];
    images: ImageObject[];
    release_date: string;
    total_tracks: number;
    external_urls: { spotify: string };
    uri: string;
  };
  ArtistObjectFull: {
    id: string;
    name: string;
    images: ImageObject[];
    followers: { total: number };
    genres: string[];
    external_urls: { spotify: string };
    uri: string;
  };
  ArtistObjectSimplified: {
    id: string;
    name: string;
    external_urls: { spotify: string };
    uri: string;
  };
  AlbumObjectSimplified: {
    id: string;
    name: string;
    artists: ArtistObjectSimplified[];
    images: ImageObject[];
    external_urls: { spotify: string };
    uri: string;
  };
  ImageObject: {
    url: string;
    height: number | null;
    width: number | null;
  };
  CategoryObject: {
    id: string;
    name: string;
    icons: ImageObject[];
  };
  PlaylistObjectSimplified: {
    id: string;
    name: string;
    description: string | null;
    images: ImageObject[];
    external_urls: { spotify: string };
    uri: string;
    tracks: { total: number };
  };
}
