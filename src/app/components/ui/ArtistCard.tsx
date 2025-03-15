"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsPersonFill } from "react-icons/bs";
import Link from "next/link";

interface ArtistCardProps {
  artist: SpotifyApi.ArtistObjectFull;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <Card className="group hover:bg-gray-800/50 transition-all duration-300 overflow-hidden">
        <CardContent className="p-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
            <Avatar className="w-full h-full rounded-lg">
              <AvatarImage
                src={artist.images?.[0]?.url}
                alt={artist.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <AvatarFallback className="w-full h-full bg-gray-800">
                <BsPersonFill className="w-12 h-12 text-gray-400" />
              </AvatarFallback>
            </Avatar>
          </div>
          <h3 className="text-lg font-semibold text-white truncate">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-400">
            {artist.followers?.total?.toLocaleString()} followers
          </p>
          {artist.genres?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {artist.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
