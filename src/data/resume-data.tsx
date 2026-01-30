import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Alex Baker",
  initials: "AB",
  location: "Salt Lake City, UT",
  locationLink: "https://www.google.com/maps/place/saltlakecity",
  about: "I handle the technical implementation of hard to solve problems that address real user needs. This usually means 3D CAD, FEA, building building my own prototypes and maybe some Python. I thrive in extremely ambiguous environments.",
  summary: (
    <>
      Design engineer that loves creating things. 
    </>
  ),
  avatarUrl: "/me.jpg",
  personalWebsiteUrl: "https://google.com",
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
        url: "https://www.linkedin.com/alex-baker-100",
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
      end: "2011",
    },
  ],
  work: [
    {
      company: "Black Diamond Equipmemt",
      link: "https://blackdiamondequipment.com/",
      roles: [
        {
          badges: ["Current"],
          title: "Senior Design Engineer",
          start: "2023",
          end: "Present",
          description: (
            <>
              Design engineering leader for the brand's most ambitious products.
              <ul className="list-inside list-disc">
                <li>
                  Designing and building prototypes for the research arm of Black Diamond.
                  Electronics integration into PPE hardgoods. 
                  Python, openVESC, Lisp, C, RF with bluetooth.
                  Essentially an experienced mechanical engineer powered by AI, Arduinos, and a professional machine shop .
                </li>
                <li>
                  Design of two headlamps from concept to production. Responsible for all 3D CAD, from aesthetic surfaces to PCB layout. Design for mass production
                  assembly, including complex injection mold layouts with multiple lifters and overmolds.
                </li>
                <li>
                  Taught freeform NURBS surfacing best practices to entire engineering team.
                </li>
              </ul>
            </>
          ),
        },
        {
          badges: [],
          title: "Design Engineer",
          start: "2020",
          end: "2023",
          description: (
            <>
              Led end-to-end product design efforts across technical outdoor equipment.
              <ul className="list-inside list-disc">
                <li>
                  Developed high-performance hardgoods with advanced materials and manufacturing processes.
                </li>
                <li>
                  Partnered with cross-functional teams to refine product requirements and validate design performance.
                </li>
              </ul>
            </>
          ),
        },
        {
          badges: [],
          title: "Quality Engineer",
          start: "2017",
          end: "2020",
          description: (
            <>
              Supported product quality initiatives to improve reliability and manufacturing readiness.
              <ul className="list-inside list-disc">
                <li>
                  Implemented test plans and failure analysis workflows for critical components.
                </li>
                <li>
                  Collaborated with suppliers to resolve quality issues and improve production consistency.
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
          start: "2018",
          end: "2020",
          description: (
            <>
              Wrote and prosecuted patents as a technical consultant.
            </>
          ),
        },
      ],
    },
  ],
  skills: [
    "Siemens NX",
    "Non Linear FEA",
    "ANSYS",
    "OpenAI Codex",
    "TensorFlow",
    "Arduino Robotics",
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
        "An entire line of a carabiners, designed ground up and developed at a new factory",
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
      title: "X4 (quality)",
      techStack: ["PPE", "Product Certification", "PLC Programming","Statistical QC","Extreme Ownnership"],
      description:
        "My first professional project. I was responsible for the quality of a new PPE product being developed at a new company-owned factory overseas",
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
