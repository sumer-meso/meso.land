import { ChartColumn, Layers, ShieldCheck, Sparkles, Users, Zap, type LucideIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Core value propositions. Copy is placeholder and easy to edit here.
const FEATURES: { icon: LucideIcon; title: string; description: string; highlights: string[] }[] = [
  {
    icon: ChartColumn,
    title: "Data Visualization",
    description: "Turn large datasets into interactive charts and dashboards in minutes.",
    highlights: ["Drag-and-drop chart builder", "Live data connections", "Shareable dashboards"],
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Work on the same dashboards with your team, with every change synced instantly.",
    highlights: ["Live cursors and comments", "Version history", "Role-based permissions"],
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Ask questions in plain language and get explanations for trends and anomalies.",
    highlights: ["Automatic anomaly detection", "Natural-language queries", "Suggested next steps"],
  },
  {
    icon: ShieldCheck,
    title: "Secure by Default",
    description: "Enterprise-grade controls keep your data protected at every layer.",
    highlights: ["Encryption at rest and in transit", "Audit logs", "Single sign-on"],
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

/** Core value propositions rendered as a responsive grid of cards. */
export function Features() {
  return (
    // scroll-mt-20 keeps the anchor target clear of the sticky header.
    <section id="features" className="scroll-mt-20 border-t py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-mono text-sm text-cyan-500">Features</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to understand your data
          </h2>
          <p className="mt-4 text-muted-foreground">
            Four core capabilities that work together across the platform.
          </p>
        </div>

        {/* Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-cyan-500/40"
              >
                <CardHeader>
                  {/* Icon placeholder: a tinted tile holding the feature icon. */}
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan-500" aria-hidden="true" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
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
