"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Logo } from "@/components/landing/logo"

// Anchor links for the navigation. Each href must match a section id on the page.
const NAV_LINKS = [
  { label: "Protocol Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  // Controlled dialog state so the form can close the dialog after submitting.
  const [contactOpen, setContactOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [formStatus, setFormStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = React.useState("")
  const formRef = React.useRef<HTMLFormElement>(null)

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setFormStatus("idle")

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setFormStatus("success")
        setStatusMessage("Message sent successfully! We'll get back to you soon.")
        // Reset form safely
        if (formRef.current) {
          formRef.current.reset()
        }
        // Close dialog after 2 seconds
        setTimeout(() => {
          setContactOpen(false)
          setFormStatus("idle")
        }, 2000)
      } else {
        const error = await response.json()
        setFormStatus("error")
        setStatusMessage(error.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setFormStatus("error")
      setStatusMessage("Network error. Please try again later.")
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Primary navigation: anchor links to page sections. Hidden on small screens. */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={`${navigationMenuTriggerStyle()} text-slate-100 hover:text-emerald-300 transition-colors`}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions: secondary "Contact Us" dialog trigger and primary CTA. */}
        <div className="flex items-center gap-2">
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger className="rounded-md border border-slate-700 bg-transparent px-4 py-2 text-slate-100 hover:bg-slate-800/60 transition-colors text-sm font-medium">
              Contact Us
            </DialogTrigger>
            <DialogContent className="border-slate-800/80 bg-slate-950 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-slate-100">Contact Us</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Share a few details and our team will get back to you.
                </DialogDescription>
              </DialogHeader>

              <form id="contact-form" ref={formRef} onSubmit={handleContactSubmit} className="grid gap-3">
                <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    disabled={loading}
                    className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:border-emerald-400/50 transition-colors disabled:opacity-50"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    disabled={loading}
                    className="h-9 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:border-emerald-400/50 transition-colors disabled:opacity-50"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-slate-100">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    disabled={loading}
                    className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:border-emerald-400/50 transition-colors disabled:opacity-50"
                  />
                </label>

                {/* Status message */}
                {formStatus === "success" && (
                  <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/30 p-3 text-sm text-emerald-300">
                    ✓ {statusMessage}
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="rounded-lg border border-red-500/50 bg-red-950/30 p-3 text-sm text-red-300">
                    ✗ {statusMessage}
                  </div>
                )}
              </form>

              <DialogFooter className="bg-slate-950 border-t border-slate-800/80 mt-6 -mx-6 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="h-10 rounded-md border-2 border-slate-600 bg-slate-900/50 px-4 text-slate-100 hover:bg-slate-800 hover:border-slate-500 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <Button 
                  type="submit" 
                  form="contact-form"
                  disabled={loading}
                  className="h-10 bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Primary CTA: jumps to the protocol demo section. */}
          <Button nativeButton={false} render={<a href="#demo" />} className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-medium">
            Broadcast
          </Button>
        </div>
      </div>
    </header>
  )
}
