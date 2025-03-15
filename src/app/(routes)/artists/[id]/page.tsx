"use client";

import { use, useEffect } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { TrackCard } from "@/app/components/ui/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ExternalLink, Music, Play, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import type { TrackObjectFull } from "@/lib/spotify";

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
      topTracks: TrackObjectFull[];
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
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="rounded-lg bg-red-500/10 p-6 text-center text-red-500">
          <h2 className="mb-2 text-xl font-bold">Erreur</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {isLoading ? (
        <div className="container mx-auto px-4 py-8">
          <ArtistSkeleton />
        </div>
      ) : artistDetails ? (
        <>
          {/* Hero Section with Background */}
          <div className="relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 h-[500px] w-full overflow-hidden">
              {artistDetails.artist.images?.[0]?.url ? (
                <Image
                  src={artistDetails.artist.images[0].url || "/placeholder.svg"}
                  alt=""
                  fill
                  priority
                  className="object-cover object-center opacity-30 blur-sm"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-gray-900" />
            </div>

            {/* Artist Info */}
            <div className="container relative mx-auto px-4 py-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                {/* Artist Image */}
                <div className="relative h-64 w-64 overflow-hidden rounded-xl shadow-2xl shadow-green-500/10 transition-transform duration-300 hover:scale-[1.02] md:h-80 md:w-80">
                  {artistDetails.artist.images?.[0]?.url ? (
                    <Image
                      src={
                        artistDetails.artist.images[0].url || "/placeholder.svg"
                      }
                      alt={artistDetails.artist.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800">
                      <User className="h-24 w-24 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Artist Details */}
                <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                  <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    {artistDetails.artist.name}
                  </h1>

                  {/* Genres */}
                  <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">
                    {artistDetails.artist.genres?.map((genre: string) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats Cards */}
                  <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      <p className="text-3xl font-bold text-white">
                        {artistDetails.artist.followers?.total?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">Followers</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-white">
                          {artistDetails.artist.popularity}
                          <span className="text-lg">%</span>
                        </p>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={artistDetails.artist.popularity}
                          className="h-1.5 bg-gray-700"
                          indicatorClassName="bg-green-500"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-400">Popularité</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      <p className="text-3xl font-bold text-white">
                        {artistDetails.albums.length}
                      </p>
                      <p className="text-sm text-gray-400">Albums</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    size="lg"
                    className="group bg-green-500 text-white hover:bg-green-600"
                    onClick={() =>
                      window.open(
                        artistDetails.artist.external_urls.spotify,
                        "_blank"
                      )
                    }
                  >
                    <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Écouter sur Spotify
                    <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-70" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="container mx-auto px-4 py-8">
            {/* Tabs Section */}
            <div className="container mx-auto px-4 py-8">
              <Tabs defaultValue="top-tracks" className="w-full">
                <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2 bg-white/5 p-1">
                  <TabsTrigger
                    value="top-tracks"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Top Titres
                  </TabsTrigger>
                  <TabsTrigger
                    value="albums"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    Albums
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="top-tracks" className="mt-0">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    Titres Populaires
                  </h2>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {artistDetails.topTracks.map((track: TrackObjectFull) => (
                        <TrackCard key={track.id} track={track} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="albums" className="mt-0">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    Discographie
                  </h2>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {artistDetails.albums.map((album: Album) => (
                        <a
                          key={album.id}
                          href={`/albums/${album.id}`}
                          className="block focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          <Card className="group h-full overflow-hidden border-0 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-green-500/5">
                            <CardContent className="p-0">
                              <div className="relative aspect-square w-full overflow-hidden">
                                {album.images?.[0]?.url ? (
                                  <Image
                                    src={
                                      album.images[0].url || "/placeholder.svg"
                                    }
                                    alt={album.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-800">
                                    <Music className="h-16 w-16 text-gray-600" />
                                  </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                                  <Play className="h-12 w-12 text-white" />
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="truncate text-lg font-semibold text-white group-hover:text-green-400">
                                  {album.name}
                                </h3>
                                <div className="mt-1 flex items-center justify-between">
                                  <p className="text-sm text-gray-400">
                                    {new Date(album.release_date).getFullYear()}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {album.total_tracks} titres
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ArtistSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <Skeleton className="h-64 w-64 rounded-xl md:h-80 md:w-80" />
      <div className="flex-1 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex flex-wrap gap-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
