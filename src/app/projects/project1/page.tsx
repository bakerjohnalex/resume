import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Project1 - Side Project",
  description: "Landing page for the Project1 side project.",
};

const projectImages = [
  {
    src: "/ulcamused.jpg",
    alt: "Project1 preview image one",
  },
  {
    src: "/ulcamrender.jpg",
    alt: "Project1 preview image two",
  },
  {
    src: "/ulcamused.jpg",
    alt: "Project1 preview image three",
  },
];

export default function Project1Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Side Project
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Project1
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          A simple landing page to showcase the Monito side project concept.
          Replace this with a crisp one-liner that captures the project&apos;s
          core value.
        </p>
      </header>

      <section aria-label="Project1 preview images" className="space-y-4">
        <h2 className="text-lg font-semibold">Project snapshots</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projectImages.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={720}
                height={480}
                className="h-56 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Project1 description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About this project</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          Add the detailed Project1 story here. Share the problem it solves, the
          people it&apos;s built for, and what makes it special. Keep this section
          flexible so you can add timelines, outcomes, or additional media as
          the project evolves.
        </p>
      </section>
    </main>
  );
}
