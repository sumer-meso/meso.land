"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// One entry per demo tab. The value must match the TabsTrigger and TabsContent value.
const DEMOS = [
  {
    value: "data-visualization",
    label: "Data Visualization",
    description: "Build a chart from a live data source in a few lines of code.",
    snippet: `import { meso } from "@meso/sdk"

const dashboard = meso.dashboard("sales-overview")
dashboard.addChart({
  type: "line",
  source: "orders",
  x: "date",
  y: "revenue",
})`,
  },
  {
    value: "real-time-collaboration",
    label: "Real-time Collaboration",
    description: "Subscribe to a shared room and receive every teammate's change instantly.",
    snippet: `import { meso } from "@meso/sdk"

const room = meso.room("q4-planning")
room.on("update", (change) => {
  console.log(change.author, change.patch)
})`,
  },
  {
    value: "ai-insights",
    label: "AI Insights",
    description: "Ask a question about your data and get an explained answer.",
    snippet: `import { meso } from "@meso/sdk"

const insight = await meso.insights.analyze("orders", {
  question: "Why did revenue dip in March?",
})
console.log(insight.summary)`,
  },
]

/** Tabbed interactive demo previews with code snippets and a sandbox placeholder. */
export function DemoPreview() {
  return (
    <section id="demo" className="scroll-mt-20 border-t py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-sm text-cyan-500">Interactive Demo</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            See meso.land in action
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick a capability to preview how it works.
          </p>
        </div>

        <Tabs defaultValue={DEMOS[0].value} className="gap-6">
          {/* Tab switcher: one trigger per demo. */}
          <TabsList className="mx-auto flex h-auto w-full max-w-xl flex-wrap sm:flex-nowrap">
            {DEMOS.map((demo) => (
              <TabsTrigger key={demo.value} value={demo.value} className="py-1.5">
                {demo.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab panels: each shows a code snippet beside a sandbox placeholder. */}
          {DEMOS.map((demo) => (
            <TabsContent key={demo.value} value={demo.value} className="flex flex-col gap-6">
              <p className="text-center text-muted-foreground">{demo.description}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Code snippet panel: always dark for a consistent code-editor look. */}
                <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg">
                  <div className="flex items-center gap-1.5 border-b border-zinc-800 px-4 py-2.5">
                    <span className="size-2 rounded-full bg-zinc-700" aria-hidden="true" />
                    <span className="size-2 rounded-full bg-zinc-700" aria-hidden="true" />
                    <span className="size-2 rounded-full bg-zinc-700" aria-hidden="true" />
                    <span className="ml-3 font-mono text-xs text-zinc-500">example.ts</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-sm leading-6 text-zinc-100">
                    <code>{demo.snippet}</code>
                  </pre>
                </div>

                {/* Sandbox placeholder: swap in an embedded interactive demo later. */}
                <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/40 p-6 text-center">
                  <Sparkles className="size-6 text-muted-foreground" aria-hidden="true" />
                  <p className="text-sm font-medium">Interactive sandbox</p>
                  <p className="text-xs text-muted-foreground">
                    A live preview of {demo.label} will appear here.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                {/* Placeholder: point this to the full application URL when it is available. */}
                <Button size="lg">Experience in Full Version</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
