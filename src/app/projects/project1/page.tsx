import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ultralight Cams - Selected Work",
  description: "Landing page for the Ultralight Cams selected work.",
};

const projectImages = [
  {
    src: "/ulcamrender.jpg",
    alt: "Ultralight Cams preview image one",
  },
  {
    src: "/ulcamfullset.jpg",
    alt: "Ultralight Cams preview image two",
  },
  {
    src: "/ulcamused.jpg",
    alt: "Ultralight Cams preview image three",
  },
  {
    src: "/me.jpg",
    alt: "Ultralight Cams preview image four",
  },
  {
    src: "/me.jpg",
    alt: "Project1 preview image four",
  },
];

export default function Project1Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ultralight Cams
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          A simple landing page to showcase the Ultralight Cams concept.
          Replace this with a crisp one-liner that captures the work&apos;s core
          value.
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
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Add the detailed Ultralight Cams story here. Share the problem it
          solves, the people it&apos;s built for, and what makes it special. Keep
          this section flexible so you can add timelines, outcomes, or
          additional media as the project evolves.
        </p>
      </section>
    </main>
  );
}
