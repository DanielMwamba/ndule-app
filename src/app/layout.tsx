import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist } from "next/font/google";
import { MainNav } from "@/app/components/layout/MainNav";
import { AudioProvider } from "@/app/contexts/AudioContext";
import { AudioPlayer } from "@/app/components/ui/AudioPlayer";
import { Providers } from "./providers";
import "./globals.css";
import { NavigationLoader } from "./components/ui/NavigationLoader";
import { Suspense } from "react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "MusicApp - Découvrez la musique",
  description: "Explorez des millions de chansons, artistes et paroles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#22c55e" },
      }}
    >
      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-700/20 rounded" />
            <div className="h-10 bg-gray-700/20 rounded" />
            <div className="h-10 bg-gray-700/20 rounded" />
          </div>
        }
      >
        <html lang="fr" className={geist.variable}>
          <body className="min-h-screen bg-gray-950 text-white antialiased">
            <NavigationLoader />
            <AudioProvider>
              <MainNav />
              <Providers>
                <main className="flex-1">{children}</main>
              </Providers>
              <AudioPlayer />
            </AudioProvider>
          </body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}
