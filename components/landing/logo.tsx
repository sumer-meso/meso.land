import Link from "next/link"
import { Hexagon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Placeholder brand logo: a gradient mark plus the wordmark.
 * Shared by the header and footer so the brand stays consistent.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="meso.land home"
      className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-violet-500 text-white shadow-md shadow-cyan-500/20">
        <Hexagon className="size-4" aria-hidden="true" />
      </span>
      <span className="text-base">meso.land</span>
    </Link>
  )
}
