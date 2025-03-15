"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Music, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface ArtistCardProps {
  artist: SpotifyApi.ArtistObjectFull
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const [imageError, setImageError] = useState(false)
  const imageUrl = artist.images?.[0]?.url
  const formattedFollowers = artist.followers?.total?.toLocaleString() || "0"

  return (
    <Link
      href={`/artists/${artist.id}`}
      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
    >
      <Card className="h-full overflow-hidden border-0 bg-gradient-to-b from-gray-800/40 to-gray-900/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 group">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={cn(
                    "object-cover transition-all duration-500 ease-out",
                    "group-hover:scale-105 group-hover:brightness-110",
                  )}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800/80">
                  <Music className="h-1/4 w-1/4 text-gray-400" />
                </div>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
              <h3 className="truncate text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                {artist.name}
              </h3>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <div className="flex items-center text-sm text-gray-300">
              <Users className="mr-1.5 h-3.5 w-3.5" />
              <span>{formattedFollowers} followers</span>
            </div>

            {artist.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {artist.genres.slice(0, 3).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-green-500/10 text-green-400 hover:bg-green-500/20"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}

            <div className="h-1 w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

