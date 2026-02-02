import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Alex Baker",
  initials: "AB",
  location: "Salt Lake City, UT",
  locationLink: "https://www.google.com/maps/place/saltlakecity",
  about: "Design engineer that loves creating things",
  summary: (
    <>
      I own technical execution on hard-to-solve product problems, turning ambiguous needs into prototypes and production-ready designs. My core toolkit includes solid modeling, nonlinear FEA, Class A surfacing, and strong hands-on prototyping skills. I rely heavily on AI for analysis and task automation. I thrive when the problems are challenging and no step-by-step solution exists.
    </>
  ),
  avatarUrl: "/me.jpg",
  personalWebsiteUrl: "https://alexbaker.info",
  contact: {
    email: "bakerjohnalex@gmail.com",
    tel: "605.390.3739",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/bakerjohnalex",
        icon: "github",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/alex-baker-100",
        icon: "linkedin",
      },
      {
        name: "X",
        url: "https://x.com/",
        icon: "x",
      },
    ],
  },
  education: [
    {
      school: "Portland State University",
      degree: "MS and BS in Mechanical Engineering",
      start: "2003",
      end: "2010",
    },
  ],
  educationHighlights: [
    "Applied for (and won) opportunity to fly an experiment on NASA's low-G 'vomit comet' airplane.",
    "Wrote image analysis code in MATLAB to help pay for school.",
  ],
  work: [
  {
    company: "Black Diamond Equipment",
    link: "https://blackdiamondequipment.com/",
    roles: [
      {
        badges: ["Current"],
        title: "Senior Design Engineer",
        start: "2019",
        end: "Present",
        description: (
          <>
            Lead design engineer for the brand's most ambitious projects.
            <ul className="list-inside list-disc">
              <li>
                Designed and built physical product prototypes for advanced R&amp;D programs, taking early concepts to validation
                through rapid iteration. Integrated electronics into safety-critical hardgoods (PPE), including on-device measurement,
                remote sensing, and RF. Owned everything from solid modeling to programming to building.
              </li>
              <li>
                Designed two headlamps from concept to production, owning 3D CAD from freeform/aesthetic surfaces
                through mechanical architecture and DFM for mass production assembly, including complex injection
                mold layouts with lifters, slides, and overmolds.
              </li>
              <li>
                Taught freeform NURBS surfacing best practices across the engineering team, improving surface quality
                and easing integration with the ID team.
              </li>
            </ul>
          </>
        ),
      },
      {
        badges: [],
        title: "Design Engineer",
        start: "2013",
        end: "2019",
        description: (
          <>
            Designed and shipped hardgoods products across multiple categories, all from early concept to production.
            <ul className="list-inside list-disc">
              <li>
                Lead design engineer for multiple successful product launches with meaningful impact on revenue and margin. This includes cams, carabiners, stoppers, buckles, probes, a very particular fan, ice accessories, crampons, personal anchor systems and more.
              </li>
              <li>
                Named inventor on multiple granted patents for innovations across multiple hardware categories.
              </li>
              <li>
                Developed long-term relationships with many vendors and suppliers via on-site collaboration domestically and abroad.
              </li>
            </ul>
          </>
        ),
      },
      {
        badges: [],
        title: "Quality Engineer",
        start: "2011",
        end: "2013",
        description: (
          <>
            R&amp;D Quality Engineer supporting test and validation of pre-production and concept-stage PPE.
            <ul className="list-inside list-disc">
              <li>
                Developed and executed test plans for life-safety PPE, including fixture design/build and
                instrumentation (pneumatics, LabVIEW, Instron).
              </li>
              <li>
                Partnered with suppliers pre-production to communicate quality risks and implement monitoring and
                control plans for ongoing manufacturing.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    company: "Alleman Hall McCoy Russell and Tuttle",
    link: "https://example.com",
    roles: [
      {
        badges: [],
        title: "Technical Consultant",
        start: "2010",
        end: "2011",
        description: (
          <>
            Drafted and prosecuted patents as a technical consultant, translating engineering concepts into clear,
            defensible claims.
          </>
        ),
      },
    ],
  },
],

  skills: [
    "Siemens NX",
    "Nonlinear FEA",
    "ANSYS",
    "OpenAI Codex",
    "TensorFlow",
    "Arduino",
    "Forging",
    "CNC",
    "Injection Molding",
    "Electronic Integration",
    "PCB Packaging",
    "3D Printing",
    "RTV Molding",
  ],
  projects: [
    {
      title: "Ultralight Cams",
      techStack: ["CNC", "Dyneema", "Splicing", "Mass Assembly"],
      description:
        "The world's lightest camming devices, 10 years running.",
      link: {
        label: "Ultralight Cams",
        href: "/projects/ultralight-cams",
      },
    },
    {
      title: "Carabiners",
      techStack: [
        "Forging",
        "Supplier Validation",
        "CNC",
        "Material Sourcing",
      ],
      description:
        "An entire line of carabiners, designed from the ground up and developed at a new factory",
      link: {
        label: "Carabiners",
        href: "/projects/carabiners",
      },
    },
    {
      title: "Lamps",
      techStack: ["Injection Molding", "Slides", "Lifters","Overmolds","Rapid RTV","PCB Layout","Compliant Mechanisms"],
      description:
        "The most popular headlamps in the world",
      link: {
        label: "Lamps",
        href: "/projects/lamps",
      },
    },
    {
      title: "Belay",
      techStack: ["Forging", "CNC", "MIM","Rope Dynamics", "Motion Analysis"],
      description:
        "Ongoing design project, design for safety and ease of use at the same time",
      link: {
        label: "Belay",
        href: "/projects/belay",
      },
    },
    {
      title: "X4 ",
      techStack: ["PPE", "Product Certification", "PLC Programming", "Statistical QC", "Extreme Ownership"],
      description:
        "I was responsible for the quality of a new PPE product being developed at a new company-owned factory overseas",
      link: {
        label: "X4 (quality)",
        href: "/projects/x4-quality",
      },
    },
    {
      title: "Stinger",
      techStack: ["Sheet Metal", "Injection Molding", "Steel Coating","Heat Treating"],
      description:
        "An epic sheet metal project that hasn't made it to market (yet)",
      link: {
        label: "Stinger",
        href: "/projects/stinger",
      },
    },
  ],
} as const;
