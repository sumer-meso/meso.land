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

// Placeholder FAQ entries. Each id must be unique; it is used as the accordion item value.
const FAQS = [
  {
    id: "what-is-meso-land",
    question: "What is meso.land?",
    answer:
      "meso.land is a modular workspace for visualizing data, collaborating with your team in real time, and generating AI-assisted insights from a single place.",
  },
  {
    id: "is-my-data-secure",
    question: "Is my data secure?",
    answer:
      "Yes. Data is encrypted at rest and in transit, access is governed by role-based permissions, and every change is recorded in an audit log.",
  },
  {
    id: "real-time-teamwork",
    question: "Can my team edit dashboards at the same time?",
    answer:
      "Yes. Changes made by teammates appear instantly, with live cursors and comments so everyone can see what others are working on.",
  },
  {
    id: "how-ai-insights-work",
    question: "How do AI Insights work?",
    answer:
      "AI Insights analyzes the data you select, flags anomalies and trends, and explains them in plain language. You can ask follow-up questions at any time.",
  },
  {
    id: "free-trial",
    question: "Is there a free trial?",
    answer:
      "A free trial is available so you can explore the core features before choosing a plan. Details are shown when you start the trial.",
  },
]

/** Frequently asked questions in an expandable accordion. */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t bg-muted/30 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to the questions we hear most often.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Accordion: one item open at a time by default; the first item starts expanded. */}
            <Accordion defaultValue={[FAQS[0].id]}>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
