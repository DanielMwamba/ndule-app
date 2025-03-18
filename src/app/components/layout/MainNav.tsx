"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search, Home, Music, Users, ListMusic, Radio } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Accueil",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/trending",
      label: "Tendances",
      icon: Radio,
      active: pathname === "/trending",
    },
    {
      href: "/artists",
      label: "Artistes",
      icon: Users,
      active: pathname === "/artists",
    },
    {
      href: "/albums",
      label: "Albums",
      icon: Music,
      active: pathname === "/albums",
    },
    {
      href: "/playlists",
      label: "Playlists",
      icon: ListMusic,
      active: pathname === "/playlists",
    },
    {
      href: "/genres",
      label: "Genres",
      icon: Search,
      active: pathname === "/genres",
    },
  ];

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
