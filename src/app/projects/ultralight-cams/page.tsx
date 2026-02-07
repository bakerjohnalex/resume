import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, FileText, PlayCircle } from "lucide-react";

import { ultralightCamsData } from "@/data/projects/ultralight-cams";

export const metadata: Metadata = ultralightCamsData.metadata;

const projectImages = ultralightCamsData.images;
const projectLinks = ultralightCamsData.links;

const linkIconMap = {
  patent: FileText,
  video: PlayCircle,
} as const;

export default function UltralightCamsPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {ultralightCamsData.title}
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          {ultralightCamsData.summary}
        </p>
      </header>

      <section aria-label="Ultralight Cams preview images" className="space-y-4">
        <h2 className="text-lg font-semibold">Project snapshots</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectImages.map((image, index) => (
            <div
              key={image.src}
              className={`aspect-square w-full overflow-hidden rounded-2xl border bg-card shadow-sm transition-transform duration-300 hover:rotate-0 ${
                index % 2 === 0
                  ? "-rotate-1 md:-rotate-2"
                  : "rotate-1 md:rotate-2"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={720}
                height={720}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Ultralight Cams description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About this project</h2>
        {ultralightCamsData.about.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-sm text-muted-foreground md:text-base leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-label="Ultralight Cams links" className="space-y-4">
        <h2 className="text-lg font-semibold">Related links</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {projectLinks.map((link) => {
            const Icon = linkIconMap[link.icon];

            return (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
                target="_blank"
                rel="noreferrer"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground transition group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="text-sm font-semibold">{link.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {link.description}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground"
                  aria-hidden="true"
                />
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
