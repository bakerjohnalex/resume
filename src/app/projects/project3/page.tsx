import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Project3 - Side Project",
  description: "Landing page for the Project3 side project.",
};

const projectImages = [
  {
    src: "/me.jpg",
    alt: "Project3 preview image one",
  },
  {
    src: "/me.jpg",
    alt: "Project3 preview image two",
  },
  {
    src: "/me.jpg",
    alt: "Project3 preview image three",
  },
];

export default function Project3Page() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Side Project
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Project3
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Placeholder copy for Project3. Use this space for a short, friendly
          summary that sets the tone for the project.
        </p>
      </header>

      <section aria-label="Project3 preview images" className="space-y-4">
        <h2 className="text-lg font-semibold">Project snapshots</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {projectImages.map((image) => (
            <div
              key={`${image.alt}-${image.src}`}
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
        aria-label="Project3 description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About this project</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          Add the Project3 details here. Highlight the goals, the feature set,
          and any milestones you want to track as the project evolves.
        </p>
      </section>
    </main>
  );
}
