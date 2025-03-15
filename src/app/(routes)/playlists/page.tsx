"use client";

import { useEffect } from "react";
import { useSpotify } from "@/app/hooks/useSpotify";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlaylistsPage() {
  const { getHomePageData, homePageData, isLoading, error } = useSpotify();

  useEffect(() => {
    getHomePageData();
  }, [getHomePageData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Playlists</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full" />
              ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homePageData?.featuredPlaylists.map((playlist) => (
              <Card
                key={playlist.id}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="aspect-square mb-4">
                    {playlist.images?.[0] && (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {playlist.name}
                  </h3>
                  {playlist.description && (
                    <p className="text-sm text-gray-400 mt-2">
                      {playlist.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
