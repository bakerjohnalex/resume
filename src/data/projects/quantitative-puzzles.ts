type QuantitativePuzzle = {
  title: string;
  href: string;
  description: string;
  extraLink?: {
    title: string;
    href: string;
  };
};

export const quantitativePuzzlesData = {
  metadata: {
    title: "Quantitative Puzzles - Selected Work",
    description: "Landing page for Jane Street puzzle projects.",
  },
  title: "Quantitative Puzzles",
  summary:
    "I solved a few of the Jane Street monthly puzzles. They are hard for me and I'm proud of the ones I've finished.",
  tags: ["Probability", "Combinatorics", "Python", "Calculus", "Ambiguity"],
  about: [
    "These puzzles are published monthly, and are often ambiguous as well as technically challenging. The ones I'm most proud of have involved heavy technical component, often involving probability theory, combinatorics, calculus, and some thoughtful python. Some are simply pictures with no instructions.",
    "If you are going to look at one of these, choose Robot Long Jump. It's an incredibly simple problem statement, with a not so simple answer.",
  ],
  puzzles: [
    {
      title: "Robot Long Jump",
      href: "https://www.janestreet.com/puzzles/robot-long-jump-index/",
      description:
        "This took me 20 ish hours to complete, mostly pencil and paper math, but with some basic python simulations to make sure the math was in the ballpark. The basics of the math were convolutions of probability density functions to arrive at a piecewise integral, solving the integral to get a function, and finding local maximum of the function on an interval.",
    },
    {
      title: "Lesses More",
      href: "https://www.janestreet.com/puzzles/lesses-more-index/",
      description:
        "I ended up treating this one as a coding project, figuring out how to search a massive space under the constraint of using only my home CPU.",
    },
    {
      title: "Games Night",
      href: "https://www.janestreet.com/puzzles/games-night-index/",
      description:
        "This is a good one for someone who doesn't want to do any math. Just good old fashioned ambiguity and a trail of crumbs.",
    },
    {
      title: "Altered States 2",
      href: "https://www.janestreet.com/puzzles/altered-states-2-index/",
      description:
        "This was fun, but I didn't even come close to the optimal solution. This is probably a good starter problem for people that are interested in doing these puzzles, because the requirements for the precision of the solution are a bit lower than the folks at Jane Street usually require.",
    },
    {
      title: "Arc Edge Acreage",
      href: "https://www.janestreet.com/puzzles/arc-edge-acreage-index/",
      description:
        "This was one of the simplest ones, requiring some basics of random walk theory and combinatorics. Verified with a python simulation. I made a short video of all of the solution branches.",
      extraLink: {
        title: "Short solution branches video",
        href: "https://youtube.com/shorts/x3RYxJXV86w",
      },
    },
    {
      title: "Twenty Four Seven Four in One",
      href: "https://www.janestreet.com/puzzles/twenty-four-seven-four-in-one-index/",
      description:
        "This is more or less a super sudoku, but with an interesting twist that led to using an image analysis tool (cv2 blob tool) to evaluate final solutions. Done completely in python.",
    },
  ] as QuantitativePuzzle[],
} as const;
