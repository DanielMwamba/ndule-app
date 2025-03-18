"use client"

import { FaMusic } from "react-icons/fa"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaMusic className="h-5 w-5 text-green-500" />
              <span className="font-bold text-white text-xl">NduleApp</span>
            </div>
            <p className="text-gray-400 mb-4">
              Votre plateforme de musique en streaming avec des millions de titres et podcasts.
            </p>
          </div>

          {["Liens rapides", "Support", "Légal"].map((category, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {["Accueil", "Recherche", "Bibliothèque", "Contact"].map((link, j) => (
                  <li key={j}>
                    <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MusicApp. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
              Confidentialité
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
              Conditions d&apos;utilisation
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

