import type * as React from "react"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}) {
  const orientationStyles = {
    horizontal: "h-[1px] w-full",
    vertical: "h-full w-[1px]",
  }

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn("shrink-0 bg-border", orientationStyles[orientation], className)}
      {...props}
    />
  )
}

export { Separator }

