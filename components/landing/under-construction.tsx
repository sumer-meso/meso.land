"use client"

import { Zap } from "lucide-react"

/** Sleek under-construction banner for the interactive protocol playground. */
export function UnderConstruction() {
  return (
    <section id="demo" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-950 py-20 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Under-construction card with minimalist design. */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-950 p-12 shadow-2xl shadow-black/60 backdrop-blur-xl md:p-16">
            {/* Organic glow decorations. */}
            <div className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-[30rem] w-[30rem] rounded-full bg-emerald-500/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-[25rem] w-[25rem] rounded-full bg-amber-200/5 blur-3xl" />

            {/* Content container. */}
            <div className="relative flex flex-col items-center gap-6 text-center">
              {/* Icon badge. */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/60 text-emerald-400">
                <Zap className="h-6 w-6" />
              </div>

              {/* Headline. */}
              <div className="space-y-3">
                <h2 className="font-serif text-3xl leading-tight tracking-tight text-slate-100 sm:text-4xl">
                  Interactive Protocol Playground
                </h2>
                <p className="text-base text-slate-400 leading-relaxed">
                  Explore the sovereign identity protocol in action. See how cryptographic keys, peer-to-peer signals, and direct interactions work across humans, hardware, and AIs.
                </p>
              </div>

              {/* Status badge. */}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-4 py-2">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-sm text-slate-300">Launching soon</span>
              </div>

              {/* Subtle divider. */}
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

              {/* Secondary message. */}
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Protocol specifications available in documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
