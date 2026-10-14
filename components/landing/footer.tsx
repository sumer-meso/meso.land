import { Logo } from "@/components/landing/logo"

// Quick navigation links. Mirrors the header anchors so both stay in sync with the section ids.
const FOOTER_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Interactive Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
]

export async function Footer() {
  // "use cache" lets the current year be computed at build time and reused, as cacheComponents requires.
  "use cache"
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-start">
        {/* Brand block: logo and short tagline. */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            A modular workspace for visualizing data, collaborating in real time, and
            surfacing AI-driven insights.
          </p>
        </div>

        {/* Quick navigation: anchor links to page sections. */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright statement. */}
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 sm:text-left">
          © {year} meso.land. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
