export const lampsData = {
  metadata: {
    title: "Lamps - Selected Work",
    description: "Landing page for the Lamps selected work.",
  },
  title: "Lamps",
  summary:
    "The Cosmo and Spot are two of the most popular headlamps in the world. I designed the latest iteration in Spring 2024.",
  images: [
    {
      src: "/lamp1.jpg",
      alt: "Lamps preview image one",
    },
    {
      src: "/lamp2.jpg",
      alt: "Lamps preview image two",
    },
    {
      src: "/lamp3.jpg",
      alt: "Lamps preview image three",
    },
    {
      src: "/me.jpg",
      alt: "Lamps preview image four",
    },
  ],
  about: [
    "One of our lamp design engineers quit in the middle of a complete overhaul of our primary headlamp line, and I helped pick up the slack by designing two of the lamps from the ground up. This turned into an incredibly fun and fast-paced blast of PCB layout, complex injection molding, and design for mass assembly.",
    "Headlamps are a flagship product, so much of the time was spent doing 3D surfacing of multiple aesthetic surfaces based on sketches from industrial design. I was happy to get back to my roots of surface sculpting, architecting intersection lines between multiple freeform surfaces to look great from any angle.",
    "The actual injection molding was a challenge too, needing multiple lifters and slides to get a PCB crammed into a tiny space that was watertight and had two tactile buttons. To prototype the buttons, I 3D printed parts and my own molds, then RTV overmolded the buttons in place to replicate the feel before committing to tooling.I also redesigned custom battery contacts to accept batteries smoothly, remain in contact while bouncing around, and accommodate a custom LiPo rechargeable battery.",
    "There were also snap-fits, compliant mechanisms for a latch, and a two-piece pivot design that needed to perform well but be extremely fast and easy to assemble.",
    "I'm extremely proud of the process and the final result, and very grateful for Kenny Peterson, the lead design engineer for lamps, who kept me calm and provided needed guidance while I went as fast as possible into a product line I had never touched before with a team I'd never worked with.",
  ],
} as const;
