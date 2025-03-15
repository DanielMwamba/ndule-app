"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Vous pouvez intégrer ici votre solution d'analytics préférée
      // Par exemple Google Analytics, Plausible, Fathom, etc.
      console.log(`Page vue: ${pathname}${searchParams ? `?${searchParams}` : ""}`)
    }
  }, [pathname, searchParams])

  return null
}

