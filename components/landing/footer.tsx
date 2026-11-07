import { Logo } from "@/components/landing/logo"

// Quick navigation links. Mirrors the header anchors so both stay in sync with the section ids.
const FOOTER_LINKS = [
  { label: "Protocol Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
]

export async function Footer() {
  // "use cache" lets the current year be computed at build time and reused, as cacheComponents requires.
  "use cache"
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-start">
        {/* Brand block: logo and short tagline. */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-sm text-sm text-slate-400">
            An unforgeable, self-owned cryptographic key protocol. Interact across the web and physical world directly—no databases, no middlemen. Just sovereign identity.
          </p>
        </div>

        {/* Quick navigation: anchor links to page sections. */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-emerald-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright statement. */}
      <div className="border-t border-slate-800/80">
        <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500 sm:px-6 sm:text-left">
          © {year} meso.land. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
