import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Belay - Selected Work",
  description: "Landing page for the Belay selected work.",
};

const projectImages = [
  {
    src: "/me.jpg",
    alt: "Belay preview image one",
  },
  {
    src: "/me.jpg",
    alt: "Belay preview image two",
  },
  {
    src: "/me.jpg",
    alt: "Belay preview image three",
  },
  {
    src: "/me.jpg",
    alt: "Belay preview image four",
  },
];

export default function BelayPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Belay</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Placeholder copy for Belay. Replace this sentence with a crisp,
          benefit-driven one-liner when the story is ready.
        </p>
      </header>

      <section aria-label="Belay preview images" className="space-y-4">
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
        aria-label="Belay description"
        className="rounded-2xl border bg-card p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold">About this project</h2>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          Add the Belay background here. Note the audience, outcomes, and the
          primary differentiator. This section is intentionally flexible so it
          can grow with the project details.
        </p>
      </section>
    </main>
  );
}
