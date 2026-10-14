import Link from "next/link"
import { ArrowRight, Compass, Cpu, Network, Orbit, Sparkles, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// The canvas uses a 5:4 box. The SVG viewBox below uses the same ratio, so connector
// coordinates (in viewBox units) line up with node positions (in percentages).
const CANVAS_VIEWBOX = "0 0 500 400"

interface CanvasNode {
  id: string
  tier: "Macro" | "Micro"
  title: string
  meta: string
  icon: LucideIcon
  // Center position as a percentage of the canvas.
  x: number
  y: number
}

const NODES: CanvasNode[] = [
  { id: "architecture", tier: "Macro", title: "System Architecture", meta: "14 services · 3 regions", icon: Network, x: 50, y: 22 },
  { id: "health", tier: "Macro", title: "Platform Health", meta: "99.98% uptime", icon: Orbit, x: 50, y: 80 },
  { id: "ingest", tier: "Micro", title: "Ingest Pipeline", meta: "Owner: R. Chen · Live", icon: Cpu, x: 20, y: 52 },
  { id: "notes", tier: "Micro", title: "Shared Notes", meta: "6 editors online", icon: Sparkles, x: 80, y: 52 },
]

// Fluid connector curves between node centers, in viewBox units. Cards sit above these lines.
const CONNECTORS = [
  "M250 88 C 290 110, 360 150, 400 208", // architecture -> notes
  "M250 88 C 210 110, 140 150, 100 208", // architecture -> ingest
  "M250 88 C 225 160, 275 240, 250 320", // architecture -> health
  "M250 320 C 290 300, 360 260, 400 208", // health -> notes
  "M250 320 C 210 300, 140 260, 100 208", // health -> ingest
]

export function Hero() {
  return (
    // Dark section with two blurred ambient glows behind the content.
    <section className="relative isolate overflow-hidden bg-slate-950 py-24 text-slate-100 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left column: badge, serif headline, value proposition, and actions. */}
        <div className="flex flex-col items-start gap-8">
          <Badge
            variant="outline"
            className="gap-2 rounded-full border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            meso.land / Spatial Collaboration Platform
          </Badge>

          {/* Serif headline with an italic accent on the closing word. */}
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
            Where Complex Ideas <em className="font-normal italic text-violet-300">Cohere.</em>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Step away from rigid tables. meso.land provides a fluid, spatial canvas that bridges
            micro-level execution with macro-system architecture.
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            {/* Primary action: jumps to the interactive demo. */}
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="#demo" />}
              className="group h-12 gap-2 rounded-full bg-slate-100 px-6 text-base font-medium text-slate-950 hover:bg-white"
            >
              Enter the Canvas
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>

            {/* Secondary action: jumps to the features section. */}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#features" />}
              className="h-12 gap-2 rounded-full border-slate-700 bg-slate-900/40 px-6 text-base font-medium text-slate-100 backdrop-blur-xl hover:bg-slate-800/70 hover:text-slate-100"
            >
              <Compass className="h-4 w-4" />
              Explore System
            </Button>
          </div>
        </div>

        {/* Right column: abstract canvas of floating micro and macro nodes. */}
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] rounded-3xl border border-slate-800 bg-slate-900/40 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Dotted grid texture for the canvas surface. */}
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Connectors are drawn first so the node cards stack above them. */}
          <svg
            viewBox={CANVAS_VIEWBOX}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            fill="none"
          >
            <defs>
              <linearGradient id="hero-connector" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            {CONNECTORS.map((d) => (
              <path
                key={d}
                d={d}
                stroke="url(#hero-connector)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
            ))}
          </svg>

          {/* Floating node cards, positioned by their center. */}
          {NODES.map((node) => {
            const Icon = node.icon
            return (
              <div
                key={node.id}
                className="absolute w-[38%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                {/* Inner card lifts on hover to give the canvas a sense of depth. */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/40">
                  <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                    <span>{node.tier}</span>
                    <Icon className="h-4 w-4 text-violet-300" />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-100">{node.title}</p>
                  <p className="mt-1 hidden text-xs text-slate-400 sm:block">{node.meta}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
