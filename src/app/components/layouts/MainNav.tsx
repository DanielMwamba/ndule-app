"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const routes = [
  {
    name: "Recherche",
    href: "/search",
  },
  {
    name: "Artistes",
    href: "/artists",
  },
  {
    name: "Morceaux",
    href: "/tracks",
  },
  {
    name: "Playlists",
    href: "/playlists",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-gray-900/50 backdrop-blur-lg">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-white">MusicApp</span>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => (
            <NavigationMenuItem key={route.href}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-white hover:text-green-400 transition-colors",
                    pathname === route.href && "text-green-400"
                  )}
                >
                  {route.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonBox: "hover:opacity-80 transition-opacity",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="ghost" className="text-white hover:text-green-400">
              Connexion
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Inscription
            </Button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
}
