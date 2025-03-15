"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Music } from "lucide-react"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-6 w-6 text-green-500" />
          <span className="text-xl font-bold text-white">MusicApp</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.href}>
                <Link href={route.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "text-sm font-medium text-white/90 transition-colors hover:text-green-400",
                      pathname === route.href && "text-green-400 font-semibold",
                    )}
                  >
                    {route.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white border-r border-white/10">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                <Music className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">MusicApp</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-2 py-1 text-lg transition-colors hover:text-green-400",
                      pathname === route.href ? "text-green-400 font-medium" : "text-white/90",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center space-x-3">
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-8 h-8",
                  userButtonBox: "hover:opacity-80 transition-opacity",
                },
              }}
            />
          </SignedIn>
          <SignedOut>
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-white hover:text-green-400">
                  Connexion
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-green-500 hover:bg-green-600 text-white">Inscription</Button>
              </Link>
            </div>
            <Link href="/sign-in" className="sm:hidden">
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                Connexion
              </Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

