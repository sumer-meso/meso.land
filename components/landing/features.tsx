import { Layers, Users, Zap, type LucideIcon } from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Core value propositions. Copy is placeholder and easy to edit here.
// `span` sets each card's footprint on the 12-column desktop grid, which makes the layout asymmetric.
const FEATURES: { title: string; description: string; span: string }[] = [
  {
    title: "Spatial Canvas",
    description: "Break free from linear pages. Map thoughts and models across infinite multidimensional planes.",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    title: "Micro-to-Macro Bridge",
    description: "Drill down into individual data nodes or zoom out to system-level architectures instantaneously.",
    span: "lg:col-span-5",
  },
  {
    title: "Fluid Co-Presence",
    description: "Real-time multi-threaded collaboration designed for complex collective intelligence.",
    span: "lg:col-span-5",
  },
]

// Placeholder use cases, each a short scenario for a different audience.
const USE_CASES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Zap,
    title: "Operations Teams",
    description: "Monitor throughput and spot bottlenecks before they affect customers.",
  },
  {
    icon: Layers,
    title: "Data Analysts",
    description: "Combine sources into one model and share findings without exporting files.",
  },
  {
    icon: Users,
    title: "Product Managers",
    description: "Track adoption and experiments in a view the whole team can edit together.",
  },
]

/** Core value propositions rendered as an asymmetric dark bento grid of cards. */
export function Features() {
  return (
    // scroll-mt-20 keeps the anchor target clear of the sticky header.
    <section id="features" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-950 py-20 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-sm text-emerald-400">Core Features</p>
          <h2 className="mt-2 font-serif text-3xl tracking-tight text-slate-100 sm:text-4xl">
            Three ways to <em className="italic text-emerald-300">think in space.</em>
          </h2>
          <p className="mt-4 text-slate-400">
            Core capabilities that connect execution and architecture on one canvas.
          </p>
        </div>

        {/* Mobile stacks the cards. On desktop, the first card spans two rows beside the other two. */}
        <div className="grid gap-6 lg:grid-cols-12">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              className={`justify-between border border-slate-800/80 bg-slate-900/60 text-slate-100 ring-0 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.45)] ${feature.span}`}
            >
              <CardHeader className="gap-3">
                {/* Monospace index tag, rendered as [01], [02], [03]. */}
                <span className="w-fit rounded border border-slate-800 px-1.5 py-0.5 font-mono text-xs tracking-wider text-emerald-400/90 transition-colors group-hover/card:border-emerald-500/40">
                  {`[${String(index + 1).padStart(2, "0")}]`}
                </span>
                <CardTitle className="text-lg text-slate-100">{feature.title}</CardTitle>
                <CardDescription className="text-slate-400">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Use cases section; the "Use Cases" nav link targets this section. */
export function UseCases() {
  return (
    <section id="use-cases" className="scroll-mt-20 border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-sm text-violet-500">Use Cases</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for every team that works with data
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {USE_CASES.map((useCase) => {
            const Icon = useCase.icon
            return (
              <Card key={useCase.title} size="sm">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle>{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
