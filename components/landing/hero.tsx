import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, PlayCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="flex flex-col items-start space-y-6">
            <Badge variant="outline" className="px-3 py-1 text-sm rounded-full border-primary/30 bg-primary/5 text-primary">
              Introducing meso.land 1.0
            </Badge>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-foreground">
              Bridge the Gap Between <span className="text-primary">Micro Details</span> & <span className="text-primary">Macro Insights</span>
            </h1>
            
            <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
              meso.land seamlessly connects complex data layers, enabling real-time visualization, collaborative workflows, and actionable intelligence in one unified platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary action: jumps to the interactive demo section. */}
              <Button
                size="lg"
                className="gap-2 text-base"
                nativeButton={false}
                render={<Link href="#demo" />}
              >
                Explore Demo <ArrowRight className="h-4 w-4" />
              </Button>
              {/* Secondary action: jumps to the features section. */}
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base"
                nativeButton={false}
                render={<Link href="#features" />}
              >
                <PlayCircle className="h-4 w-4" /> Learn More
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              No registration required • Instant browser demo available
            </p>
          </div>

          {/* Right Column: UI Mockup / Visual Placeholder */}
          <div className="relative mx-auto w-full max-w-[550px] lg:max-w-none">
            <div className="relative rounded-xl border bg-card p-2 shadow-2xl shadow-primary/10">
              {/* Fake Terminal/Browser Header */}
              <div className="flex items-center space-x-2 px-3 py-2 border-b bg-muted/50 rounded-t-lg">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-muted-foreground ml-2 font-mono">app.meso.land/dashboard</span>
              </div>
              
              {/* Main Visual Display Area */}
              <div className="aspect-[16/10] bg-slate-950 rounded-b-lg p-6 flex flex-col justify-between text-slate-100 font-mono text-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Visual Placeholder Content */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-primary font-bold">MESO.LAND WORKSPACE</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">System Active</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                      <div className="text-xs text-slate-400">Micro Layer</div>
                      <div className="text-lg font-bold text-slate-200">12,480 Node Points</div>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded border border-slate-800">
                      <div className="text-xs text-slate-400">Macro View</div>
                      <div className="text-lg font-bold text-primary">Unified System</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/90 rounded-md border border-slate-800 text-xs text-slate-300">
                  <span className="text-emerald-400">✓ Data synced successfully:</span> Ready for interactive simulation.
                </div>
              </div>
            </div>
            
            {/* Background Decorative Glow */}
            <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-primary/30 to-purple-600/30 blur-2xl opacity-50 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  )
}