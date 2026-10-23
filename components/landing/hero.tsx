"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bot,
  Cpu,
  Fingerprint,
  KeyRound,
  Network,
  Puzzle,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mesh coordinates use a 500 x 400 viewBox (5:4). Node positions are percentages of the
// canvas, so a node at (x, y) percent sits at (x * 5, y * 4) in viewBox units.
const VIEWBOX_WIDTH = 500
const VIEWBOX_HEIGHT = 400

// The background network uses its own wider viewBox. "slice" crops it instead of stretching it.
const BG_WIDTH = 1200
const BG_HEIGHT = 800

interface MeshNode {
  id: string
  kind: string
  title: string
  meta: string
  icon: LucideIcon
  // Center position as a percentage of the canvas.
  x: number
  y: number
}

// Entities that talk to each other directly, with no server in between.
const NODES: MeshNode[] = [
  { id: "sovereign", kind: "Entity / Sovereign", title: "Sovereign DID", meta: "did:meso:7f3a...c91e", icon: Fingerprint, x: 20, y: 28 },
  { id: "device", kind: "Entity / Hardware", title: "Local Hardware / ESP32", meta: "Offline-first · signed", icon: Cpu, x: 40, y: 72 },
  { id: "agent", kind: "Entity / AI", title: "AI Agent", meta: "Runs on-device", icon: Bot, x: 60, y: 28 },
  { id: "plugin", kind: "Service / Anonymous", title: "Anonymous Service Plugin", meta: "No account required", icon: Puzzle, x: 80, y: 72 },
]

// Every link in the mesh uses the same <===> protocol-level bond.
const LINK_LABEL = "<===>"

interface MeshLink {
  from: string
  to: string
  // Vertical offset of the curve's control point. Alternating signs give the mesh a wave.
  bend: number
}

const LINKS: MeshLink[] = [
  { from: "sovereign", to: "device", bend: 30 },
  { from: "device", to: "agent", bend: -30 },
  { from: "agent", to: "plugin", bend: 30 },
]

// Decorative nodes that give the canvas an organic, unfinished feel.
const AMBIENT_DOTS = [
  { x: 8, y: 14 },
  { x: 92, y: 12 },
  { x: 10, y: 86 },
  { x: 50, y: 6 },
  { x: 96, y: 50 },
]

// Background network: node positions in BG_WIDTH x BG_HEIGHT units, and index pairs to connect.
const BG_NODES: [number, number][] = [
  [120, 130], [260, 60], [410, 150], [560, 70], [720, 120], [880, 60], [1040, 140],
  [1110, 320], [930, 300], [760, 420], [520, 500], [300, 430], [120, 380], [60, 640],
  [240, 700], [460, 650], [700, 600], [980, 560], [1120, 700],
]
const BG_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
  [2, 8], [4, 9], [10, 15], [8, 17], [0, 12], [13, 11],
]

// Turns each link into a quadratic curve and finds the curve's midpoint for its label.
function resolveLinks() {
  const byId = new Map(NODES.map((node) => [node.id, node]))

  return LINKS.flatMap((link) => {
    const from = byId.get(link.from)
    const to = byId.get(link.to)
    if (!from || !to) return []

    const x0 = (from.x / 100) * VIEWBOX_WIDTH
    const y0 = (from.y / 100) * VIEWBOX_HEIGHT
    const x1 = (to.x / 100) * VIEWBOX_WIDTH
    const y1 = (to.y / 100) * VIEWBOX_HEIGHT
    const cx = (x0 + x1) / 2
    const cy = (y0 + y1) / 2 + link.bend

    // Quadratic Bezier at t = 0.5: 0.25 * start + 0.5 * control + 0.25 * end.
    const midX = 0.25 * x0 + 0.5 * cx + 0.25 * x1
    const midY = 0.25 * y0 + 0.5 * cy + 0.25 * y1

    return [
      {
        key: `${link.from}-${link.to}`,
        fromId: link.from,
        toId: link.to,
        d: `M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`,
        labelX: (midX / VIEWBOX_WIDTH) * 100,
        labelY: (midY / VIEWBOX_HEIGHT) * 100,
      },
    ]
  })
}

const RESOLVED_LINKS = resolveLinks()

// Faint node network behind the whole section. It stays decorative and ignores the pointer.
function BackgroundNetwork() {
  return (
    <svg
      viewBox={`0 0 ${BG_WIDTH} ${BG_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      aria-hidden="true"
      fill="none"
    >
      {BG_EDGES.map(([a, b]) => {
        const [x1, y1] = BG_NODES[a]
        const [x2, y2] = BG_NODES[b]
        return (
          <line
            key={`${a}-${b}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#34d399"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        )
      })}
      {BG_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#6ee7b7" fillOpacity="0.35" />
      ))}
    </svg>
  )
}

export function Hero() {
  // Hover previews an entity's links. A click pins the selection until it is clicked again.
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const focusId = pinnedId ?? hoveredId

  return (
    // Deep dark section. Background layers sit behind the content, and the grid fades out at the edges.
    <section className="relative isolate overflow-hidden bg-slate-950 py-24 text-slate-100 md:py-32">
      <BackgroundNetwork />

      {/* Minimal cryptography grid, masked so it fades toward the edges. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />

      {/* Organic glows: a soft emerald pool and a warm amber haze, with no blue gradients. */}
      <div className="pointer-events-none absolute -left-40 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-amber-200/5 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left column: manifesto headline, subheadline, and actions. */}
        <div className="flex flex-col items-start gap-8">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
            <span className="block">You are not an account.</span>
            {/* Glowing gradient accent. The drop shadow traces the text shape. */}
            <span className="mt-2 block italic bg-linear-to-r from-emerald-200 via-amber-100 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(52,211,153,0.35)]">
              You are an identity. Define yourself.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Step out of corporate clouds and walled gardens. meso.land is a permissionless protocol
            where humans, hardware, and AIs interact as sovereign, anonymous entities—without servers,
            without passwords, without middleman.
          </p>

          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            {/* Primary action. Placeholder link to the demo until the ID flow exists. */}
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="#demo" />}
              className="h-12 gap-2 rounded-md bg-emerald-400 px-6 text-base font-medium text-slate-950 hover:bg-emerald-300"
            >
              <KeyRound className="h-4 w-4" />
              Generate Sovereign ID
            </Button>

            {/* Secondary action: jumps to the features section, which carries the manifesto. */}
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#features" />}
              className="h-12 gap-2 rounded-md border-slate-700 bg-transparent px-6 text-base font-medium text-slate-100 hover:bg-slate-800/60 hover:text-slate-100"
            >
              <ScrollText className="h-4 w-4" />
              Explore the Manifesto
            </Button>
          </div>
        </div>

        {/* Right column: decentralized entity mesh with no dashboard or browser frame. */}
        <div
          role="group"
          aria-label="Interactive diagram of a sovereign DID, a local hardware device, an AI agent, and an anonymous service plugin, each linked directly to the next."
          className="relative mx-auto aspect-[5/4] w-full max-w-[560px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          {/* Faint dot texture on the canvas surface. */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Links and ambient dots render first, so the entity cards stack above them. */}
          <svg
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            fill="none"
          >
            {RESOLVED_LINKS.map((link) => {
              // A link lights up when either of its endpoints is in focus.
              const active = focusId !== null && (focusId === link.fromId || focusId === link.toId)
              return (
                <path
                  key={link.key}
                  d={link.d}
                  stroke={active ? "#fcd34d" : "#34d399"}
                  strokeOpacity={active ? 0.9 : 0.5}
                  strokeWidth={active ? 2.5 : 1.25}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              )
            })}
            {AMBIENT_DOTS.map((dot) => (
              <circle
                key={`${dot.x}-${dot.y}`}
                cx={(dot.x / 100) * VIEWBOX_WIDTH}
                cy={(dot.y / 100) * VIEWBOX_HEIGHT}
                r="1.8"
                fill="#6ee7b7"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Link labels sit on each curve's midpoint, between the two rows of cards. */}
          {RESOLVED_LINKS.map((link) => {
            const active = focusId !== null && (focusId === link.fromId || focusId === link.toId)
            return (
              <span
                key={`label-${link.key}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded border bg-slate-950 px-1.5 py-0.5 font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                  active ? "border-amber-300/50 text-amber-200" : "border-emerald-400/30 text-emerald-300"
                }`}
                style={{ left: `${link.labelX}%`, top: `${link.labelY}%` }}
              >
                {LINK_LABEL}
              </span>
            )
          })}

          {/* Interactive entity cards, positioned by their center. */}
          {NODES.map((node) => {
            const Icon = node.icon
            const isActive = focusId === node.id
            const isPinned = pinnedId === node.id
            return (
              <div
                key={node.id}
                className="absolute w-[34%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <button
                  type="button"
                  aria-pressed={isPinned}
                  onClick={() => setPinnedId((current) => (current === node.id ? null : node.id))}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                  className={`w-full cursor-pointer rounded-xl border p-3 text-left shadow-xl shadow-black/50 backdrop-blur-xl transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 ${
                    isActive
                      ? "border-emerald-400/60 bg-slate-900 shadow-emerald-500/10"
                      : "border-slate-700/70 bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-emerald-300" />
                    <span className="truncate font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                      {node.kind}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xs leading-snug text-slate-100">
                    {`[${node.title}]`}
                  </p>
                  <p className="mt-1 hidden font-mono text-[10px] text-slate-500 sm:block">
                    {node.meta}
                  </p>
                </button>
              </div>
            )
          })}

          {/* Canvas header and monospace status tags. */}
          <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <Network className="h-3.5 w-3.5 text-emerald-300" />
            Decentralized Entity Mesh
          </div>

          <span className="absolute right-4 top-4 rounded border border-emerald-400/30 bg-emerald-400/5 px-2 py-1 font-mono text-[10px] tracking-wider text-emerald-300">
            [PROTOCOL: ACTIVE]
          </span>

          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded border border-slate-700 bg-slate-950/70 px-2 py-1 font-mono text-[10px] tracking-wider text-slate-300">
            <ShieldCheck className="h-3 w-3 text-emerald-300" />
            [ZERO SERVERS]
          </span>

          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded border border-slate-700 bg-slate-950/70 px-2 py-1 font-mono text-[10px] tracking-wider text-slate-300">
            <KeyRound className="h-3 w-3 text-amber-200" />
            [LOCAL KEYSTORE]
          </span>
        </div>
      </div>
    </section>
  )
}
