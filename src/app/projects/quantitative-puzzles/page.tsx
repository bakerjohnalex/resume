import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { quantitativePuzzlesData } from "@/data/projects/quantitative-puzzles";

export const metadata: Metadata = quantitativePuzzlesData.metadata;

export default function QuantitativePuzzlesPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {quantitativePuzzlesData.title}
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          {quantitativePuzzlesData.summary}
        </p>
      </header>

      <section
        aria-label="Quantitative Puzzles description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About</h2>
        {quantitativePuzzlesData.about.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-sm text-muted-foreground md:text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-label="Quantitative Puzzles links" className="space-y-4">
        <h2 className="text-lg font-semibold">Individual puzzles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {quantitativePuzzlesData.puzzles.map((puzzle) => (
            <div
              key={puzzle.href}
              className="rounded-2xl border bg-card p-4 shadow-sm transition hover:border-foreground/20 hover:shadow-md"
            >
              <a
                href={puzzle.href}
                className="group flex flex-col gap-3"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold md:text-base">
                    {puzzle.title}
                  </h3>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 text-muted-foreground transition group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {puzzle.description}
                </p>
              </a>
              {puzzle.extraLink ? (
                <a
                  href={puzzle.extraLink.href}
                  className="mt-3 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  {puzzle.extraLink.title}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
