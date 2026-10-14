"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DemoNode {
  id: string
  label: string
  tier: "Macro" | "Micro"
  detail: string
  // Center position as a percentage of the canvas.
  x: number
  y: number
}

interface Demo {
  value: string
  label: string
  description: string
  file: string
  snippet: string
  nodes: DemoNode[]
  // Pairs of node ids joined by a line on the canvas.
  links: [string, string][]
}

// One entry per tab. The value must match the TabsTrigger and TabsContent value.
const DEMOS: Demo[] = [
  {
    value: "spatial-node-engine",
    label: "Spatial Node Engine",
    description: "Place nodes on an infinite plane and connect them with typed relations.",
    file: "engine.ts",
    snippet: `import { meso } from "@meso/sdk"

const canvas = meso.canvas("roadmap")
const api = canvas.addNode({ label: "Public API", kind: "service" })
const db = canvas.addNode({ label: "Orders DB", kind: "store" })
canvas.link(api, db, { relation: "reads" })`,
    nodes: [
      { id: "api", label: "Public API", tier: "Micro", detail: "Service node · 3 inbound links", x: 22, y: 30 },
      { id: "db", label: "Orders DB", tier: "Micro", detail: "Store node · read by the API", x: 64, y: 24 },
      { id: "cache", label: "Cache", tier: "Micro", detail: "Store node · 2 writers", x: 30, y: 72 },
      { id: "queue", label: "Event Queue", tier: "Macro", detail: "Stream node · spans 2 services", x: 72, y: 70 },
    ],
    links: [
      ["api", "db"],
      ["api", "cache"],
      ["db", "queue"],
      ["cache", "queue"],
    ],
  },
  {
    value: "micro-macro-link",
    label: "Micro-Macro Link",
    description: "Drill from a system overview down to a single function, then zoom back out.",
    file: "zoom.ts",
    snippet: `import { meso } from "@meso/sdk"

const system = meso.canvas("platform")
const checkout = system.focus("checkout-service") // zoom in
checkout.expand({ depth: 2 })
system.zoomOut({ level: "architecture" })        // zoom out`,
    nodes: [
      { id: "platform", label: "Platform", tier: "Macro", detail: "System overview · 14 services", x: 50, y: 16 },
      { id: "checkout", label: "Checkout", tier: "Macro", detail: "Service boundary · 6 components", x: 22, y: 50 },
      { id: "payments", label: "Payments", tier: "Macro", detail: "Service boundary · 4 components", x: 78, y: 50 },
      { id: "charge", label: "charge()", tier: "Micro", detail: "Function node · 120 ms p95", x: 14, y: 84 },
      { id: "refund", label: "refund()", tier: "Micro", detail: "Function node · 45 ms p95", x: 50, y: 86 },
      { id: "capture", label: "capture()", tier: "Micro", detail: "Function node · 80 ms p95", x: 86, y: 84 },
    ],
    links: [
      ["platform", "checkout"],
      ["platform", "payments"],
      ["checkout", "charge"],
      ["checkout", "refund"],
      ["payments", "refund"],
      ["payments", "capture"],
    ],
  },
  {
    value: "collaborative-flow",
    label: "Collaborative Flow",
    description: "See teammates' cursors and edits on the same nodes as they happen.",
    file: "room.ts",
    snippet: `import { meso } from "@meso/sdk"

const room = meso.room("q4-planning")
room.join("ops-team")
room.on("cursor", ({ author, nodeId }) => {
  canvas.highlight(nodeId, author)
})`,
    nodes: [
      { id: "review", label: "Ops Review", tier: "Macro", detail: "Room owner · 4 people online", x: 50, y: 16 },
      { id: "forecast", label: "Forecast", tier: "Micro", detail: "Maya is editing · 2 comments", x: 22, y: 50 },
      { id: "budget", label: "Budget", tier: "Micro", detail: "Leo is viewing", x: 78, y: 50 },
      { id: "roadmap", label: "Roadmap", tier: "Macro", detail: "Synced 2 seconds ago", x: 50, y: 84 },
    ],
    links: [
      ["review", "forecast"],
      ["review", "budget"],
      ["forecast", "roadmap"],
      ["budget", "roadmap"],
    ],
  },
]

/** Interactive node canvas: click a node to select it and highlight its connections. */
function NodeCanvas({ title, nodes, links }: { title: string; nodes: DemoNode[]; links: [string, string][] }) {
  const [selectedId, setSelectedId] = useState(nodes[0].id)
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0]

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
        <span className="font-mono text-xs text-slate-500">{title}</span>
        <span className="font-mono text-xs text-emerald-400">{selected.label}</span>
      </div>

      <div className="relative aspect-[4/3] bg-[radial-gradient(circle,rgba(148,163,184,0.15)_1px,transparent_1px)] [background-size:20px_20px]">
        {/* Connectors use node percentages as viewBox units, so they line up with the buttons. */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          {links.map(([fromId, toId]) => {
            const from = nodes.find((node) => node.id === fromId)
            const to = nodes.find((node) => node.id === toId)
            if (!from || !to) return null
            const active = fromId === selectedId || toId === selectedId
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={active ? 2 : 1}
                className={active ? "stroke-emerald-400" : "stroke-slate-600"}
              />
            )
          })}
        </svg>

        {nodes.map((node) => {
          const isSelected = node.id === selectedId
          return (
            <button
              key={node.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-2 text-left text-xs whitespace-nowrap transition duration-200 hover:border-emerald-500/50 focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                isSelected
                  ? "border-emerald-400 bg-slate-800 text-slate-100 shadow-[0_0_24px_-6px_rgba(52,211,153,0.6)]"
                  : "border-slate-700 bg-slate-950/80 text-slate-300"
              }`}
            >
              <span className="block font-medium">{node.label}</span>
              <span className="block text-[10px] tracking-wider text-slate-500 uppercase">{node.tier}</span>
            </button>
          )
        })}
      </div>

      <p className="border-t border-slate-800 px-4 py-2.5 text-xs text-slate-400">{selected.detail}</p>
    </div>
  )
}

/** Tabbed interactive playground: a code terminal beside a node canvas, plus a bottom action bar. */
export function DemoPreview() {
  return (
    <section id="demo" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-950 py-20 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-sm text-emerald-400">Interactive Demo</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-slate-100 sm:text-4xl">
            See the canvas <em className="italic text-emerald-300">in action.</em>
          </h2>
          <p className="mt-4 text-slate-400">Pick a capability to preview how it works.</p>
        </div>

        <Tabs defaultValue={DEMOS[0].value} className="gap-8">
          {/* Tab switcher: one trigger per playground, styled for the dark section. */}
          <TabsList className="mx-auto h-auto w-full max-w-2xl flex-wrap border border-slate-800 bg-slate-900/70 backdrop-blur-xl group-data-horizontal/tabs:h-auto sm:flex-nowrap">
            {DEMOS.map((demo) => (
              <TabsTrigger
                key={demo.value}
                value={demo.value}
                className="py-1.5 text-slate-400 hover:text-slate-100 data-active:bg-slate-100 data-active:text-slate-950"
              >
                {demo.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Each panel: a dark code terminal on the left and an interactive node canvas on the right. */}
          {DEMOS.map((demo) => (
            <TabsContent key={demo.value} value={demo.value} className="flex flex-col gap-6">
              <p className="text-center text-slate-400">{demo.description}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
                  <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2.5">
                    <span className="size-2 rounded-full bg-slate-700" aria-hidden="true" />
                    <span className="size-2 rounded-full bg-slate-700" aria-hidden="true" />
                    <span className="size-2 rounded-full bg-slate-700" aria-hidden="true" />
                    <span className="ml-3 font-mono text-xs text-slate-500">{demo.file}</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-slate-200">
                    <code>{demo.snippet}</code>
                  </pre>
                </div>

                <NodeCanvas title="canvas.meso" nodes={demo.nodes} links={demo.links} />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action bar: one entry point to the full canvas, shown below every playground. */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-5 backdrop-blur-xl sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-medium text-slate-100">Ready to build on the real canvas?</p>
            <p className="text-sm text-slate-400">Open the full workspace with persistence, multiplayer editing, and export.</p>
          </div>
          {/* Placeholder: point this to the full application URL when it is available. */}
          <Button size="lg" className="gap-2 rounded-full bg-emerald-500 px-6 text-slate-950 hover:bg-emerald-400">
            Experience Live Canvas
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
