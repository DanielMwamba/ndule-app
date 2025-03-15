"use client";

import { use, useEffect, useState } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrackCard } from "@/app/components/ui/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Album, Clock, ExternalLink, Music, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import type {
  AlbumObjectFull,
  TrackObjectFull,
} from "@/lib/spotify";

export default function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const {
    getAlbum,
    albumDetails,
    isLoading,
    error,
  }: {
    getAlbum: (id: string) => void;
    albumDetails: AlbumObjectFull | null;
    isLoading: boolean;
    error: string | null;
  } = useSpotify();

  const [totalDuration, setTotalDuration] = useState<number>(0);

  useEffect(() => {
    getAlbum(resolvedParams.id);
  }, [resolvedParams.id, getAlbum]);

  useEffect(() => {
    if (albumDetails?.tracks?.items) {
      const total = albumDetails.tracks.items.reduce(
        (acc: number, track: { duration_ms: number }) =>
          acc + track.duration_ms,
        0
      );
      setTotalDuration(total);
    }
  }, [albumDetails]);

  // Format duration from ms to minutes and seconds
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes} min ${seconds < 10 ? "0" : ""}${seconds} sec`;
  };

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
          <AlbumSkeleton />
        </div>
      ) : albumDetails ? (
        <>
          {/* Hero Section with Background */}
          <div className="relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 h-[500px] w-full overflow-hidden">
              {albumDetails.images?.[0]?.url ? (
                <Image
                  src={albumDetails.images[0].url || "/placeholder.svg"}
                  alt=""
                  fill
                  priority
                  className="object-cover object-center opacity-20 blur-sm"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-gray-900" />
            </div>

            {/* Album Info */}
            <div className="container relative mx-auto px-4 py-12">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                {/* Album Cover */}
                <div className="relative aspect-square h-64 w-64 overflow-hidden rounded-xl shadow-2xl shadow-green-500/10 transition-transform duration-300 hover:scale-[1.02] md:h-72 md:w-72 lg:h-80 lg:w-80">
                  {albumDetails.images?.[0]?.url ? (
                    <Image
                      src={albumDetails.images[0].url || "/placeholder.svg"}
                      alt={albumDetails.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-800">
                      <Music className="h-24 w-24 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Album Details */}
                <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                  <Badge className="mb-2 bg-white/10 text-white hover:bg-white/20">
                    {albumDetails.album_type.charAt(0).toUpperCase() +
                      albumDetails.album_type.slice(1)}
                  </Badge>

                  <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {albumDetails.name}
                  </h1>

                  <div className="mb-6 flex flex-wrap items-center gap-x-1 text-lg text-gray-300">
                    <span>Par</span>
                    {albumDetails.artists.map(
                      (artist: { id: string; name: string }, index: number) => (
                        <span key={artist.id}>
                          {index > 0 && ", "}
                          <a
                            href={`/artists/${artist.id}`}
                            className="font-medium text-green-400 transition-colors hover:text-green-300 hover:underline"
                          >
                            {artist.name}
                          </a>
                        </span>
                      )
                    )}
                    <span className="mx-2 text-gray-500">•</span>
                    <span>
                      {new Date(albumDetails.release_date).getFullYear()}
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span>{albumDetails.total_tracks} titres</span>
                    {totalDuration > 0 && (
                      <>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {formatDuration(totalDuration)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="mb-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      <p className="text-sm font-medium text-gray-400">Label</p>
                      <p className="text-white">
                        {albumDetails.label || "Indépendant"}
                      </p>
                    </div>
                    {albumDetails.copyrights &&
                      albumDetails.copyrights.length > 0 && (
                        <div className="rounded-xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                          <p className="text-sm font-medium text-gray-400">
                            Copyright
                          </p>
                          <p className="text-sm text-white">
                            {albumDetails.copyrights[0].text}
                          </p>
                        </div>
                      )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="group bg-green-500 text-white hover:bg-green-600"
                      onClick={() =>
                        window.open(
                          albumDetails.external_urls.spotify,
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
          </div>

          {/* Tracks Section */}
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Titres</h2>
              <div className="flex items-center text-sm text-gray-400">
                <Album className="mr-2 h-4 w-4" />
                {albumDetails.total_tracks} titres
              </div>
            </div>

            <div className="mb-4 hidden rounded-lg bg-white/5 p-3 text-sm text-gray-400 md:grid md:grid-cols-[auto_1fr_auto]">
              <div className="w-12 text-center">#</div>
              <div>TITRE</div>
              <div className="w-20 text-right">DURÉE</div>
            </div>

            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-2">
                {albumDetails?.tracks?.items?.map((track: TrackObjectFull) => (
                  <TrackCard
                    key={track.id}
                    track={
                      {
                        ...track,
                        type: "track",
                        uri: `spotify:track:${track.id}`,
                        href: `https://api.spotify.com/v1/tracks/${track.id}`,
                        external_ids: {},
                        popularity: 0,
                        disc_number: 1,
                        album: {
                          ...albumDetails,
                          album_type: albumDetails.album_type,
                          type: "album",
                          uri: `spotify:album:${albumDetails.id}`,
                          available_markets: [],
                          release_date_precision: "day",
                          restrictions: {},
                          total_tracks: albumDetails.total_tracks,
                        },
                      } as TrackObjectFull
                    }
                  />
                )) || []}
              </div>
            </ScrollArea>

            {albumDetails.copyrights && albumDetails.copyrights.length > 0 && (
              <div className="mt-8 text-center">
                <Separator className="mb-6 bg-white/10" />
                <p className="text-xs text-gray-500">
                  {albumDetails.copyrights[0].text}
                </p>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}

function AlbumSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <Skeleton className="aspect-square h-64 w-64 rounded-xl md:h-80 md:w-80" />
      <div className="flex-1 space-y-6">
        <div>
          <Skeleton className="mb-2 h-5 w-20 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="mt-2 h-6 w-1/2" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Skeleton className="h-20 rounded-xl" />
          <Skeleton className="h-20 rounded-xl" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
