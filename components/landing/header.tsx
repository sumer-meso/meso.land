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
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Interactive Demo", href: "#demo" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  // Controlled dialog state so the form can close the dialog after submitting.
  const [contactOpen, setContactOpen] = React.useState(false)

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Placeholder: replace with a real submission handler (API call, mailto, etc.).
    event.preventDefault()
    setContactOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        {/* Primary navigation: anchor links to page sections. Hidden on small screens. */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  href={link.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions: secondary "Contact Us" dialog trigger and primary "Try Demo" CTA. */}
        <div className="flex items-center gap-2">
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              Contact Us
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
                <DialogDescription>
                  Share a few details and our team will get back to you.
                </DialogDescription>
              </DialogHeader>

              <form id="contact-form" onSubmit={handleContactSubmit} className="grid gap-3">
                <label className="grid gap-1.5 text-sm font-medium">
                  Name
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm font-normal outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm font-normal outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm font-normal outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </label>
              </form>

              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button type="submit" form="contact-form">
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Primary CTA: jumps to the interactive demo section. */}
          <Button nativeButton={false} render={<a href="#demo" />}>Try Demo</Button>
        </div>
      </div>
    </header>
  )
}
