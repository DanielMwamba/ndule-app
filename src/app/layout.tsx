import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist } from "next/font/google";
import { MainNav } from "./components/layouts/MainNav";
import "./globals.css";

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
      <html lang="fr" className={geist.variable}>
        <body className="min-h-screen bg-gray-950 text-white antialiased">
          <MainNav />
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
