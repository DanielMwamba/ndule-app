"use client";

import { useSearchParams } from "next/navigation";
import { useSpotify } from "@/features/spotify/hooks/useSpotify";
import { useEffect } from "react";
import { SearchInput } from "@/app/components/ui/SearchInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ArtistCard } from "@/app/components/ui/ArtistCard";
import { TrackCard } from "@/app/components/ui/TrackCard";
import type {
  ArtistObjectFull,
  TrackObjectFull,
} from "@/features/spotify/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { searchMusic, searchResults, isLoading, error } = useSpotify();

  useEffect(() => {
    if (query) {
      searchMusic(query);
    }
  }, [query, searchMusic]);

  return (
    <div className="container mx-auto py-8 px-4">
      <SearchInput />

      {query && (
        <Tabs defaultValue="artists" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="artists">Artistes</TabsTrigger>
            <TabsTrigger value="tracks">Morceaux</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="artists">
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="space-y-3">
                            <Skeleton className="h-[200px] w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        ))
                    : searchResults?.artists.map((artist: ArtistObjectFull) => (
                        <ArtistCard key={artist.id} artist={artist} />
                      ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tracks">
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="space-y-2">
                  {isLoading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-[200px]" />
                              <Skeleton className="h-4 w-[150px]" />
                            </div>
                          </div>
                        ))
                    : searchResults?.tracks.map((track: TrackObjectFull) => (
                        <TrackCard key={track.id} track={track} />
                      ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      )}

      {error && (
        <div className="text-center text-red-500 mt-4">
          Une erreur est survenue lors de la recherche
        </div>
      )}
    </div>
  );
}
