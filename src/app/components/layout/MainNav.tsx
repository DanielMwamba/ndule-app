"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaFire,
  FaUsers,
  FaCompactDisc,
  FaListUl,
  FaMusic,
  FaSearch,
  FaEllipsisH,
} from "react-icons/fa";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    {
      href: "/",
      label: "Accueil",
      icon: FaHome,
      active: pathname === "/",
    },
    {
      href: "/trending",
      label: "Tendances",
      icon: FaFire,
      active: pathname === "/trending",
    },
    {
      href: "/artists",
      label: "Artistes",
      icon: FaUsers,
      active: pathname === "/artists" || pathname?.startsWith("/artists/"),
    },
    {
      href: "/albums",
      label: "Albums",
      icon: FaCompactDisc,
      active: pathname === "/albums" || pathname?.startsWith("/albums/"),
    },
    {
      href: "/playlists",
      label: "Playlists",
      icon: FaListUl,
      active: pathname === "/playlists" || pathname?.startsWith("/playlists/"),
    },
    {
      href: "/genres",
      label: "Genres",
      icon: FaMusic,
      active: pathname === "/genres" || pathname?.startsWith("/genres/"),
    },
  ];

  // Filtrer les routes pour l'affichage mobile
  const mobileRoutes = routes.slice(0, 4);
  const moreRoutes = routes.slice(4);

  return (
    <div
      className={cn(
        "sticky top-0 z-30 container transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm"
          : "bg-background border-b border-border/40"
      )}
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center mr-4">
            <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mr-2">
              <FaMusic className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-green-600 text-lg hidden sm:inline-block">
              NduleApp
            </span>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:block flex-1 max-w-3xl mx-auto">
            <ScrollArea className="w-full whitespace-nowrap rounded-md">
              <div className="flex w-max space-x-1 p-1">
                {routes.map((route) => (
                  <NavItem key={route.href} route={route} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
          </div>

          {/* Navigation principale - Mobile */}
          <div className="md:hidden flex-1">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex w-max space-x-1 p-1">
                {mobileRoutes.map((route) => (
                  <NavItem key={route.href} route={route} compact />
                ))}

                {/* Menu déroulant pour les éléments supplémentaires */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 text-muted-foreground hover:text-foreground"
                    >
                      <FaEllipsisH className="h-4 w-4" />
                      <span className="sr-only">Plus</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    {moreRoutes.map((route) => (
                      <DropdownMenuItem key={route.href} asChild>
                        <Link
                          href={route.href}
                          className={cn(
                            "flex items-center gap-2 w-full",
                            route.active && "text-primary font-medium"
                          )}
                        >
                          <route.icon className="h-4 w-4" />
                          {route.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="/search">
                <FaSearch className="h-4 w-4" />
                <span className="sr-only">Recherche</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour les éléments de navigation
function NavItem({
  route,
  compact = false,
}: {
  route: {
    href: string;
    label: string;
    icon: React.ElementType;
    active: boolean;
  };
  compact?: boolean;
}) {
  return (
    <Link
      href={route.href}
      className={cn(
        "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
        compact ? "px-2.5" : "px-3",
        route.active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      )}
    >
      <route.icon
        className={cn("flex-shrink-0", compact ? "h-4 w-4" : "h-4 w-4")}
      />
      <span className={cn(compact && "sr-only sm:not-sr-only")}>
        {route.label}
      </span>

      {/* Indicateur actif */}
      {route.active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          layoutId="activeIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
    </Link>
  );
}
