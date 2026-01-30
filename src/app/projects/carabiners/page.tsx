import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Carabiners - Selected Work",
  description: "Landing page for the Carabiners selected work.",
};

const projectImages = [
  {
    src: "/me.jpg",
    alt: "Carabiners preview image one",
  },
  {
    src: "/me.jpg",
    alt: "Carabiners preview image two",
  },
  {
    src: "/me.jpg",
    alt: "Carabiners preview image three",
  },
  {
    src: "/me.jpg",
    alt: "Carabiners preview image four",
  },
];

export default function CarabinersPage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col gap-10 p-4 md:p-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Selected Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Carabiners
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Placeholder copy for Carabiners. Replace this sentence with a crisp,
          benefit-driven one-liner when the story is ready.
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
          <p>
            I led the design of a new line of carabiners at a new manufacturing
            partner. Black Diamond was winding down in-house carabiner
            production, and I was responsible for launching an all-new product
            line at a factory we hadn’t used before. I owned the mechanical
            design for every carabiner, including 3D models and drawing sets,
            while coordinating closely with the factory, industrial design, and
            project management to keep requirements aligned and decisions moving.
            The best part was the cross-functional collaboration, which helped
            deliver five carabiner projects early and under budget and
            established a strong foundation for future work at the factory. Key
            contributors included Jake Hall (industrial design), Mary Kate
            (project management), and the team at CIC for executing production.
            I am extremely grateful to have been able to work with this team.
          </p>

          <p className="font-semibold text-foreground">
            A special note on carabiner design:
          </p>

          <p>
            Carabiners are a unique product to design because they are PPE with
            certification and safety requirements, they are also very cheap (FOB
            costs need to be a few dollars), and they are extremely weight
            constrained. They appear easy to design at first glance, but very
            small surface tweaks can be the difference between garbage and a
            long lasting product that I'm happy to trust my life with. In
            summary, I think a mediocre carabiner is easy to design (I've made a
            few), but a weight constrained, fit for production, durable, good
            looking carabiner that people actually want to buy is a special
            challenge in nuance.
          </p>
        </div>
      </section>
    </main>
  );
}
