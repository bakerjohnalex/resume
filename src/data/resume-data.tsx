import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
  name: "Alex Baker",
  initials: "AB",
  location: "Salt Lake City, UT",
  locationLink: "https://www.google.com/maps/place/saltlakecity",
  about: "Design Engineer specializing in technical consumer products",
  summary: (
    <>
      Design engineer with deep experience in creating technical designs
      that look amazing. 
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
          badges: ["CAD", "FEA"],
          title: "Senior Design Engineer",
          start: "2023",
          end: "Present",
          description: (
            <>
              Design engineering leader for the brand's most ambitious products.
              <ul className="list-inside list-disc">
                <li>
                  Building physical concept prototypes involving electronics integration into PPE hardgoods. Python, openVESC, Lisp, C, RF with bluetooth.
                  Essentially arduino integration into hardgoods.
                </li>
                <li>
                  Design of two headlamps from concept to production. Responsible for all 3D CAD, from aesthetic surfaces to PCB layout. Desin for mass production
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
          badges: ["CAD", "FEA"],
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
          badges: ["CAD", "FEA"],
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
          badges: ["Patents", "Technical Consulting"],
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
    "React/Next.js/Remix",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
    "WebRTC",
    "WebSockets",
    "Node.js",
    "GraphQL",
    "Relay",
    "System Architecture",
    "Remote Team Leadership",
  ],
  projects: [
    {
      title: "Ultralight Cams",
      techStack: ["TypeScript", "Next.js", "Browser Extension", "PostgreSQL"],
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
        "TypeScript",
        "Next.js",
        "Vite",
        "GraphQL",
        "WebRTC",
        "Tailwind CSS",
        "PostgreSQL",
        "Redis",
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
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "The most popular headlamps in the world",
      link: {
        label: "Lamps",
        href: "/projects/lamps",
      },
    },
    {
      title: "Belay",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "Ongoing design project, design for safety and ease of use at the same time",
      link: {
        label: "Belay",
        href: "/projects/belay",
      },
    },
    {
      title: "X4 (quality)",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "My first professional project. I was responsible for the quality of a new PPE product being developed at a new company-owned factory overseas",
      link: {
        label: "X4 (quality)",
        href: "/projects/x4-quality",
      },
    },
    {
      title: "Stinger",
      techStack: ["TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "An epic sheet metal project that hasn't made it to market (yet)",
      link: {
        label: "Stinger",
        href: "/projects/stinger",
      },
    },
  ],
} as const;
