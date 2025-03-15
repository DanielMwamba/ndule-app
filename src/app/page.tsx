"use client";

import { BsSpotify, BsSearch, BsMusicNote } from "react-icons/bs";
import { FaGuitar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Découvrez la{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                Musique
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explorez des millions de chansons, artistes et paroles
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un artiste ou une chanson..."
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-lg rounded-full 
                         text-white placeholder-gray-400 outline-none focus:ring-2 
                         focus:ring-green-500 transition-all duration-300"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 
                               bg-green-500 rounded-full hover:bg-green-600 
                               transition-colors duration-300"
              >
                <BsSearch className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BsSpotify className="w-8 h-8" />,
                title: "Intégration Spotify",
                description: "Accédez à des millions de titres via Spotify",
              },
              {
                icon: <BsMusicNote className="w-8 h-8" />,
                title: "Paroles en temps réel",
                description: "Suivez les paroles pendant l'écoute",
              },
              {
                icon: <FaGuitar className="w-8 h-8" />,
                title: "Profils d'artistes",
                description: "Découvrez tout sur vos artistes préférés",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="p-6 bg-gray-800/30 backdrop-blur-lg rounded-2xl 
                          hover:bg-gray-800/50 transition-all duration-300
                          hover:transform hover:scale-105"
              >
                <div className="text-green-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
