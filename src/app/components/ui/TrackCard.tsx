"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BsMusicNote,
  BsPlayFill,
  BsPauseFill,
  BsSpotify,
} from "react-icons/bs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAudio } from "@/app/contexts/AudioContext";

interface TrackCardProps {
  track: SpotifyApi.TrackObjectFull;
}

export function TrackCard({ track }: TrackCardProps) {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrentTrack && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <Card className="group hover:bg-gray-800/50 transition-all duration-300">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-md overflow-hidden">
            {track.album.images?.[0]?.url ? (
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <BsMusicNote className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -right-2 -bottom-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600"
            onClick={handlePlayClick}
          >
            {!track.preview_url ? (
              <BsSpotify className="w-4 h-4 text-white" />
            ) : isCurrentTrack && isPlaying ? (
              <BsPauseFill className="w-4 h-4 text-white" />
            ) : (
              <BsPlayFill className="w-4 h-4 text-white" />
            )}
          </Button>
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="text-base font-medium text-white truncate">
            {track.name}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>

        <div className="text-sm text-gray-400">
          {formatDuration(track.duration_ms)}
        </div>
      </CardContent>
    </Card>
  );
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
