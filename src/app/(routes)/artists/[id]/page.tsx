"use client";

import { use, useEffect } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { TrackCard } from "@/app/components/ui/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { BsPersonFill, BsSpotify } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
  external_urls: {
    spotify: string;
  };
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
}

export default function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const {
    getArtist,
    artistDetails,
    isLoading,
    error,
  }: {
    getArtist: (id: string) => void;
    artistDetails: {
      artist: Artist;
      topTracks: SpotifyApi.TrackObjectFull[];
      albums: Album[];
    } | null;
    isLoading: boolean;
    error: string | null;
  } = useSpotify();

  useEffect(() => {
    getArtist(resolvedParams.id);
  }, [resolvedParams.id, getArtist]);

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {isLoading ? (
        <ArtistSkeleton />
      ) : artistDetails ? (
        <>
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-64 h-64 relative rounded-lg overflow-hidden">
              {artistDetails.artist.images?.[0]?.url ? (
                <Image
                  src={artistDetails.artist.images[0].url}
                  alt={artistDetails.artist.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <BsPersonFill className="w-24 h-24 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-white">
                  {artistDetails.artist.name}
                </h1>
                <Button
                  variant="outline"
                  className="text-green-400 border-green-400 hover:bg-green-400/10"
                  onClick={() =>
                    window.open(
                      artistDetails.artist.external_urls.spotify,
                      "_blank"
                    )
                  }
                >
                  <BsSpotify className="mr-2 h-4 w-4" />
                  Ouvrir dans Spotify
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {artistDetails.artist.genres?.map((genre: string) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-white">
                    {artistDetails.artist.followers?.total?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Followers</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-white">
                    {artistDetails.artist.popularity}%
                  </p>
                  <p className="text-sm text-gray-400">Popularité</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-white">
                    {artistDetails.albums.length}
                  </p>
                  <p className="text-sm text-gray-400">Albums</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="top-tracks" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
              <TabsTrigger value="top-tracks">Top Titres</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="top-tracks">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {artistDetails.topTracks.map(
                      (track: SpotifyApi.TrackObjectFull) => (
                        <TrackCard key={track.id} track={track} />
                      )
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="albums">
                <ScrollArea className="h-[600px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artistDetails.albums.map((album: Album) => (
                      <a
                        key={album.id}
                        href={`/albums/${album.id}`}
                        className="block"
                      >
                        <Card className="hover:bg-gray-800/50 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="aspect-square w-full relative rounded-lg overflow-hidden mb-4">
                              {album.images?.[0]?.url ? (
                                <Image
                                  src={album.images[0].url}
                                  alt={album.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-800" />
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-white truncate">
                              {album.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {new Date(album.release_date).getFullYear()}
                            </p>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </>
      ) : null}
    </div>
  );
}

function ArtistSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8">
      <Skeleton className="w-full md:w-64 h-64 rounded-lg" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex flex-wrap gap-2">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
        </div>
        <Skeleton className="h-6 w-1/4" />
      </div>
    </div>
  );
}
