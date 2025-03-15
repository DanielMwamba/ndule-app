"use client";

import { useAudio } from "@/app/contexts/AudioContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BsPlayFill, BsPauseFill, BsSpotify } from "react-icons/bs";
import Image from "next/image";

export function AudioPlayer() {
  const { currentTrack, isPlaying, playTrack, pauseTrack, resumeTrack } =
    useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
      <Card className="container mx-auto p-4">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            {currentTrack.album.images?.[0]?.url ? (
              <Image
                src={currentTrack.album.images[0].url}
                alt={currentTrack.name}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-md" />
            )}
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-base font-medium text-white truncate">
              {currentTrack.name}
            </h3>
            <p className="text-sm text-gray-400 truncate">
              {currentTrack.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-green-400"
              onClick={() => (isPlaying ? pauseTrack() : resumeTrack())}
            >
              {isPlaying ? (
                <BsPauseFill className="w-6 h-6" />
              ) : (
                <BsPlayFill className="w-6 h-6" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:text-green-400"
              onClick={() =>
                window.open(currentTrack.external_urls.spotify, "_blank")
              }
            >
              <BsSpotify className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
