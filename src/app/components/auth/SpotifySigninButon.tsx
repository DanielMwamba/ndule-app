"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SpotifySigninButton() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="outline"
        className="w-full py-6 font-medium flex items-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-black border-0 shadow-lg shadow-[#1DB954]/20 transition-all duration-300"
        onClick={() =>
          signIn("spotify", { redirect: true, callbackUrl: callbackUrl ?? "/" })
        }
      >
        <FaSpotify className="h-5 w-5" />
        <span className="text-base">Continuer avec Spotify</span>
      </Button>
    </motion.div>
  );
}
