"use client";

import { useEffect } from "react";
import { useSpotify } from "@/features/spotify/hooks/useSpotify";
import { ArtistCard } from "@/app/components/ui/ArtistCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ArtistObjectFull } from "@/features/spotify/types";

export default function ArtistsPage() {
  const { getHomePageData, homePageData, isLoading, error } = useSpotify();

  useEffect(() => {
    getHomePageData();
  }, [getHomePageData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Artistes à Découvrir
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="h-48 w-48 rounded-full" />
                  <Skeleton className="h-4 w-32 mt-4" />
                </div>
              ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {homePageData?.featuredArtists.map((artist: ArtistObjectFull) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
