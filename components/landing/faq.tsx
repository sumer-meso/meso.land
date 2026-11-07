"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Frequently Asked Questions aligned with sovereign identity protocol narrative.
const FAQS = [
  {
    id: "what-is-meso-land",
    question: "What is meso.land?",
    answer:
      "meso.land is a protocol that gives humans, hardware, and AIs an unforgeable, self-owned cryptographic key—like an AirTag for your identity. It enables direct peer-to-peer interactions across the web and physical world, without relying on central databases or intermediaries.",
  },
  {
    id: "sovereign-identity",
    question: "What does 'sovereign identity' mean?",
    answer:
      "Sovereign identity means you own and control your cryptographic key. You are not dependent on any service, company, or database to prove who you are. Your identity travels with you, signed and verifiable, wherever you go.",
  },
  {
    id: "how-does-it-work",
    question: "How do peer-to-peer signals work?",
    answer:
      "Every identity broadcasts cryptographically signed messages. Other entities—whether human, machine, or AI—receive these signals directly and verify them using the sender's public key. No central hub required.",
  },
  {
    id: "hardware-support",
    question: "Can hardware like IoT devices use meso.land?",
    answer:
      "Yes. Any device that can sign and broadcast cryptographic keys—from smart appliances to ESP32 microcontrollers—can participate as a sovereign identity on the meso protocol.",
  },
  {
    id: "when-available",
    question: "When will the protocol be available?",
    answer:
      "The protocol specifications are being finalized, and the interactive playground is coming soon. Early documentation and use cases are available now. Stay tuned for the launch.",
  },
]

/** Frequently asked questions in an expandable accordion. */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-slate-800/80 bg-slate-950 py-20 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl tracking-tight text-slate-100 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-400">
            Quick answers to questions about the sovereign identity protocol.
          </p>
        </div>
        <Card className="border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
          <CardContent className="pt-6">
            {/* Accordion: one item open at a time by default; the first item starts expanded. */}
            <Accordion defaultValue={[FAQS[0].id]}>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-slate-800/80">
                  <AccordionTrigger className="text-slate-100 hover:text-emerald-300">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
