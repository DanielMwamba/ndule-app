"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpotify, FaInfoCircle } from "react-icons/fa";
import SpotifySigninButton from "./SpotifySigninButon";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDemoLogin = () => {
    setIsLoading(true);
    // Simuler un délai de chargement pour la démo
    setTimeout(() => {
      router.push("/");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 text-red-400 p-4 rounded-lg flex items-start"
          >
            <FaInfoCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">
              Connexion avec
            </span>
          </div>
        </div>

        <SpotifySigninButton />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-900 px-2 text-gray-400">Ou</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 rounded-md bg-white/10 hover:bg-white/15 text-white font-medium transition-all duration-300 flex justify-center items-center ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
          ) : null}
          Explorer en mode démo
        </motion.button>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5">
          <FaSpotify className="h-5 w-5 text-[#1DB954]" />
        </div>
        <p className="text-sm text-gray-400">
          Connectez-vous avec votre compte Spotify pour profiter pleinement de
          l&apos;expérience NduleApp
        </p>
      </div>
    </div>
  );
}
