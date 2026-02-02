import type { Metadata } from "next";
import Image from "next/image";

import { carabinersData } from "@/data/projects/carabiners";

export const metadata: Metadata = carabinersData.metadata;

const projectImages = carabinersData.images;

export default function CarabinersPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {carabinersData.title}
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          {carabinersData.summary}
        </p>
      </header>

      <section aria-label="Carabiners preview images" className="space-y-4">
        <h2 className="text-lg font-semibold">Project snapshots</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectImages.map((image, index) => (
            <div
              key={`${image.alt}-${image.src}`}
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
        aria-label="Carabiners description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About this project</h2>

        <div className="mt-3 space-y-4 text-sm text-muted-foreground md:text-base">
          {carabinersData.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {carabinersData.sections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="space-y-4">
              {section.title ? (
                <p className="font-semibold text-foreground">{section.title}</p>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
