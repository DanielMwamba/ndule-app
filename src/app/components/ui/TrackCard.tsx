"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BsMusicNote, BsPlayFill, BsPauseFill, BsSpotify, BsHeart, BsHeartFill, BsThreeDots } from "react-icons/bs"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/app/contexts/AudioContext"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface TrackCardProps {
  track: SpotifyApi.TrackObjectFull
  index?: number
}

export function TrackCard({ track, index }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio()
  const isCurrentTrack = currentTrack?.id === track.id
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCurrentTrack && isPlaying) {
      pauseTrack()
    } else {
      playTrack(track)
    }
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index ? index * 0.05 : 0 }}
    >
      <Link href={`/tracks/${track.id}`}>
        <Card
          className={`group transition-all duration-300 border border-transparent hover:border-gray-700 ${
            isCurrentTrack ? "bg-green-900/20" : "hover:bg-gray-800/50"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CardContent className="p-4 flex items-center space-x-4">
            {/* Track Number or Play Button */}
            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {index && !isHovered && !isCurrentTrack && (
                <span className="text-lg font-medium text-gray-400">{index}</span>
              )}

              {(isHovered || isCurrentTrack) && (
                <Button
                  size="icon"
                  variant="ghost"
                  className={`absolute inset-0 w-12 h-12 rounded-full ${
                    isCurrentTrack && isPlaying ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={handlePlayClick}
                >
                  {!track.preview_url ? (
                    <BsSpotify className="w-5 h-5" />
                  ) : isCurrentTrack && isPlaying ? (
                    <BsPauseFill className="w-6 h-6" />
                  ) : (
                    <BsPlayFill className="w-6 h-6" />
                  )}
                </Button>
              )}
            </div>

            {/* Album Cover */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-800">
                {track.album.images?.[0]?.url ? (
                  <Image
                    src={track.album.images[0].url || "/placeholder.svg"}
                    alt={track.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BsMusicNote className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-grow min-w-0">
              <h3
                className={`text-base font-medium truncate ${
                  isCurrentTrack ? "text-green-400" : "group-hover:text-green-400"
                }`}
              >
                {track.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {track.artists.map((artist, i) => (
                  <span key={artist.id}>
                    {i > 0 && ", "}
                    <span
                      className="hover:text-green-400 hover:underline cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.location.href = `/artists/${artist.id}`
                      }}
                    >
                      {artist.name}
                    </span>
                  </span>
                ))}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button
                size="icon"
                variant="ghost"
                className={`w-8 h-8 rounded-full ${
                  isLiked ? "text-green-500" : "text-gray-400 opacity-0 group-hover:opacity-100"
                } hover:text-green-400 hover:bg-transparent`}
                onClick={handleLikeClick}
              >
                {isLiked ? <BsHeartFill className="w-4 h-4" /> : <BsHeart className="w-4 h-4" />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:text-white hover:bg-transparent"
                  >
                    <BsThreeDots className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(track.external_urls.spotify, "_blank")
                    }}
                  >
                    <BsSpotify className="mr-2 h-4 w-4 text-[#1DB954]" />
                    Ouvrir sur Spotify
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`/albums/${track.album.id}`, "_self")
                    }}
                  >
                    <BsMusicNote className="mr-2 h-4 w-4" />
                    Voir l&apos;album
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="text-sm text-gray-400 min-w-[40px] text-right">{formatDuration(track.duration_ms)}</div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

