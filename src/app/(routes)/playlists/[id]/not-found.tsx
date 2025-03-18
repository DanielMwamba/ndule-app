import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-green-500">404</h1>
        <h2 className="text-2xl font-semibold">Playlist non trouvée</h2>
        <p className="text-gray-400 max-w-md mx-auto">
          Désolé, la playlist que vous recherchez n&apos;existe pas ou
          n&apos;est plus disponible.
        </p>
        <Button asChild className="bg-green-500 hover:bg-green-600">
          <Link href="/playlists">Retour aux playlists</Link>
        </Button>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center space-y-6 p-8">
            <div className="animate-pulse">
              <div className="h-16 w-16 bg-green-500/20 rounded-full mx-auto mb-4" />
              <div className="h-8 w-48 bg-gray-700/20 rounded mx-auto mb-2" />
              <div className="h-4 w-64 bg-gray-700/20 rounded mx-auto" />
            </div>
          </div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
