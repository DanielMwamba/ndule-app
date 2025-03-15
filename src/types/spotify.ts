import type {
  TrackObjectFull,
  ArtistObjectFull,
  CategoryObject,
  ImageObject,
} from "spotify-web-api-node";

export interface Image extends ImageObject {
  url: string;
  height?: number;
  width?: number;
}

export interface Artist extends Partial<ArtistObjectFull> {
  id: string;
  name: string;
  images?: Image[];
  uri: string;
  followers?: {
    total: number;
  };
}

export interface Album {
  images: Image[];
  name: string;
  album_type: string;
}

export interface Track extends Partial<TrackObjectFull> {
  id: string;
  name: string;
  uri: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  popularity: number;
}

export interface Category extends Partial<CategoryObject> {
  id: string;
  name: string;
  icons: Image[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string | null;
  images: Image[];
  uri: string;
  tracks: {
    total: number;
    href?: string;
  };
}

export interface HomePageData {
  trendingTracks: Track[];
  featuredArtists: Artist[];
  categories: Category[];
  featuredPlaylists: Playlist[];
  newReleases?: SpotifyApi.AlbumObjectSimplified[];
  error?: string;
}
