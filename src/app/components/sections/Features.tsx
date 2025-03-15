"use client";

import { motion } from "framer-motion";
import {
  FaMusic,
  FaCompactDisc,
  FaBroadcastTower,
  FaHeadphones,
} from "react-icons/fa";

export function FeaturesSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const features = [
    {
      icon: <FaMusic className="h-5 w-5" />,
      title: "Millions de titres",
      description: "Accédez à un catalogue immense",
    },
    {
      icon: <FaCompactDisc className="h-5 w-5" />,
      title: "Artistes populaires",
      description: "Découvrez de nouveaux talents",
    },
    {
      icon: <FaBroadcastTower className="h-5 w-5" />,
      title: "Playlists exclusives",
      description: "Pour toutes vos humeurs",
    },
    {
      icon: <FaHeadphones className="h-5 w-5" />,
      title: "Qualité audio HD",
      description: "Son haute définition",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 bg-white/5 backdrop-blur-sm rounded-xl 
                        border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-green-500 mb-3 p-2 bg-green-500/10 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
