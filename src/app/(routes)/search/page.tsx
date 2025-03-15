"use client";

import { useSearchParams } from "next/navigation";
import { useSpotify } from "@/app/hooks/useSpotify";
import { useEffect } from "react";
import { SearchInput } from "@/app/components/ui/SearchInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

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
      <SearchInput
        placeholder="Rechercher un artiste, une chanson..."
        className="max-w-2xl mx-auto mb-8"
      />

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
                          <Card key={i}>
                            <CardContent className="p-4">
                              <Skeleton className="h-[200px] w-full rounded-lg" />
                              <Skeleton className="h-4 w-3/4 mt-4" />
                              <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardContent>
                          </Card>
                        ))
                    : searchResults?.artists.map((artist) => (
                        <Card key={artist.id}>
                          <CardContent className="p-4">
                            {/* Contenu de l'artiste */}
                          </CardContent>
                        </Card>
                      ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tracks">
              <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  {isLoading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => (
                          <Card key={i}>
                            <CardContent className="p-4 flex items-center space-x-4">
                              <Skeleton className="h-12 w-12 rounded" />
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[150px]" />
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    : searchResults?.tracks.map((track) => (
                        <Card key={track.id}>
                          <CardContent className="p-4">
                            {/* Contenu du morceau */}
                          </CardContent>
                        </Card>
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
