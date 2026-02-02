export const carabinersData = {
  metadata: {
    title: "Carabiners - Selected Work",
    description: "Landing page for the Carabiners selected work.",
  },
  title: "Carabiners",
  summary:
    "Placeholder copy for Carabiners. Replace this sentence with a crisp, benefit-driven one-liner when the story is ready.",
  images: [
    {
      src: "/biner1.jpg",
      alt: "Carabiners preview image one",
    },
    {
      src: "/biner2.jpg",
      alt: "Carabiners preview image two",
    },
    {
      src: "/biner2.jpg",
      alt: "Carabiners preview image three",
    },
    {
      src: "/biner4.jpg",
      alt: "Carabiners preview image four",
    },
  ],
  about: [
    "I led the design of a new line of carabiners at a new manufacturing partner. We were winding down in-house carabiner production, and I was responsible for launching an all-new product line at a factory we hadn’t used before. I owned the mechanical design for every carabiner, including 3D models and drawing sets, while coordinating closely with the factory, industrial design, and project management to keep requirements aligned and decisions moving. The best part was the cross-functional collaboration, which helped deliver five carabiner projects early and under budget and established a strong foundation for future work at the factory. Key contributors included Jake Hall (industrial design), Mary Kate (project management), and the team at CIC for executing production. I am extremely grateful to have been able to work with this team.",
  ],
  sections: [
    {
      title: "A special note on carabiner design:",
      paragraphs: [
        "Carabiners are a unique product to design because they are PPE with certification and safety requirements, they are also very cheap (FOB costs need to be a few dollars), and they are extremely weight constrained. They appear easy to design at first glance, but very small surface tweaks can be the difference between garbage and a long lasting product that I'm happy to trust my life with. In summary, I think a mediocre carabiner is easy to design (I've made a few), but a weight constrained, fit for production, durable, good looking carabiner that people actually want to buy is a special challenge in nuance.",
      ],
    },
    {
      title: "Surfacing:",
      paragraphs: [
        "Carabiners are essentially one sculpted surface, so the engineer needs to be (or become) proficient at freeform sculpting. I was lucky enough to learn the foundations of freeform surfacing from an incredibly talented industrial designer. Since then I've designed several more and despite attempts at making parametric models of carabiners, I still think freeform is the right way to get a highly refined carabiner that looks great and passes all the necessary tests.",
        "With this experience, I created a course and a syllabus to teach surfacing to engineers, and I think it adds a lot of value to any project where engineers are working in tight collaboration with industrial designers. For quick teaser, here are some of my core values of surfacing:",
        "1. If something looks G0, it should be G0. This is best done by making each surface the trimming entity for the other, forcing a clean G0 condition.",
        "2. All splines and surfaces should be either degree 1 (lines), or degree 3. Anything else deserves a good explanation, and I've yet to hear one, though I'm sure I will someday.",
        "3. All surfaces should have a 'handful' of control points, and no more.",
        "All of these rules can and should be broken sometimes, but I think anyone following these 3 in their model will have a great foundation for making excellent surfaces that can be shared across modelling kernels.",
      ],
    },
    {
      title: "FEA:",
      paragraphs: [
        "Analyzing a carabiner is a fairly 'pure' engineering analysis because there is typically one one or two parts in the analysis. To get the analysis right, I gathered stress/strain curves of the exact rodstock we use in manufacturing. With a refined model, we can run open-gate analysis in a couple minutes on a consumer grade machine in the CPU, predicting failure with ~5% error. This allows for extremely fast iteration on non-linear models, and cuts down prototype costs by a large percentage. Carabiners are all about predicting how they bend and re-shape themselves in the plastic region, keeping the challenge going even though the analysis tools are excellent.",
      ],
    },
    {
      title: "",
      paragraphs: [
        "I didn't expect to write that much about carabiner design. If you read this and found it useful, enjoyed it, or want to argue about my surfacing core values, please reach out.",
      ],
    },
  ],
} as const;
