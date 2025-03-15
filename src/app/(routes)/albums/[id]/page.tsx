"use client";

import { use, useEffect } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrackCard } from "@/app/components/ui/TrackCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { BsMusicNote, BsSpotify } from "react-icons/bs";
import { Button } from "@/components/ui/button";

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
    albumDetails: SpotifyApi.AlbumObjectFull | null;
    isLoading: boolean;
    error: string | null;
  } = useSpotify();

  useEffect(() => {
    getAlbum(resolvedParams.id);
  }, [resolvedParams.id, getAlbum]);

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
        <AlbumSkeleton />
      ) : albumDetails ? (
        <>
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-64 h-64 relative rounded-lg overflow-hidden">
              {albumDetails.images?.[0]?.url ? (
                <Image
                  src={albumDetails.images[0].url}
                  alt={albumDetails.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <BsMusicNote className="w-24 h-24 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {albumDetails.name}
                  </h1>
                  <p className="text-gray-400">
                    Par{" "}
                    {albumDetails.artists.map(
                      (
                        artist: SpotifyApi.ArtistObjectSimplified,
                        index: number
                      ) => (
                        <span key={artist.id}>
                          {index > 0 && ", "}
                          <a
                            href={`/artists/${artist.id}`}
                            className="text-green-400 hover:underline"
                          >
                            {artist.name}
                          </a>
                        </span>
                      )
                    )}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-green-400 border-green-400 hover:bg-green-400/10"
                  onClick={() =>
                    window.open(albumDetails.external_urls.spotify, "_blank")
                  }
                >
                  <BsSpotify className="mr-2 h-4 w-4" />
                  Ouvrir dans Spotify
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-white">
                    {albumDetails.total_tracks}
                  </p>
                  <p className="text-sm text-gray-400">Titres</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-white">
                    {new Date(albumDetails.release_date).getFullYear()}
                  </p>
                  <p className="text-sm text-gray-400">Année</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracks Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Titres</h2>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2">
                {albumDetails?.tracks?.items?.map(
                  (track: SpotifyApi.TrackObjectSimplified) => (
                    <TrackCard
                      key={track.id}
                      track={
                        {
                          ...track,
                          album: {
                            id: albumDetails.id,
                            name: albumDetails.name,
                            images: albumDetails.images,
                            artists: albumDetails.artists,
                            release_date: albumDetails.release_date,
                            external_urls: albumDetails.external_urls,
                          },
                        } as SpotifyApi.TrackObjectFull
                      }
                    />
                  )
                ) || []}
              </div>
            </ScrollArea>
          </div>
        </>
      ) : null}
    </div>
  );
}

function AlbumSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <Skeleton className="w-full md:w-64 h-64 rounded-lg" />
      <div className="flex-1 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-lg" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
