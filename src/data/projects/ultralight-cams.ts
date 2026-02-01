export const ultralightCamsData = {
  metadata: {
    title: "Ultralight Cams - Selected Work",
    description: "Landing page for the Ultralight Cams selected work.",
  },
  title: "Ultralight Cams",
  summary: "The backstory of the world's lightest cams.",
  images: [
    {
      src: "/ulcamrender.jpg",
      alt: "Ultralight Cams preview image one",
    },
    {
      src: "/ulcamfullset.jpg",
      alt: "Ultralight Cams preview image two",
    },
    {
      src: "/ulcam3.jpg",
      alt: "Ultralight Cams preview image three",
    },
    {
      src: "/ulcam4.jpg",
      alt: "Ultralight Cams preview image four",
    },
  ],
  about: [
    "The core of this project was figuring out a way to use Dyneema instead of steel for the core structural integrity of a cam. The idea is relatively simple, but executing on it was extremely difficult because no one had figured out how to assemble a cam with Dyneema and keep the overall stiffness and durability of the steel variant. I invented a novel assembly method to create a tensioned loop of Dyneema that holds the entire cam together but remains internal and protected. This involved hand-building dozens of prototype designs, all of which required their own assembly methods with custom components and custom assembly tools. In the end, the design was patented and the assembly method remains a trade secret over 10 years later. These remain the lightest full-range cams ever built.",
  ],
} as const;
