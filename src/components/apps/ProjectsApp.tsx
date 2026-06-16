import { ArrowUpRight, FileText } from "lucide-react";

const PROJECTS = [
  {
    name: "Knit",
    tag: "Design Tool",
    description:
      "A collaborative design workspace concept — file browser, pages, and a pannable canvas. The product this very portfolio is modeled after.",
    tools: ["Figma", "Design System", "Prototyping"],
    accent: "linear-gradient(135deg, #c0ebd0, #8ed8ce)",
  },
  {
    name: "icametoo",
    tag: "Events",
    description:
      "A social event-discovery app: find what's happening nearby, RSVP with friends, and never show up alone.",
    tools: ["Figma", "Mobile", "iOS"],
    accent: "linear-gradient(135deg, #0a0d14, #4a5160)",
  },
  {
    name: "Football Booth",
    tag: "Sports",
    description:
      "Match-day companion for football fans — live scores, lineups, and a booth for hot takes with your crew.",
    tools: ["Figma", "Framer", "Android"],
    accent: "linear-gradient(135deg, #9bd5a3, #2f8f3f)",
  },
  {
    name: "Chain Core",
    tag: "Web3",
    description:
      "A clean, approachable dashboard for on-chain analytics. Complex data, quiet interface — no neon required.",
    tools: ["Figma", "Data Viz", "Web"],
    accent: "linear-gradient(135deg, #dcf0fb, #3099de)",
  },
];

export default function ProjectsApp() {
  return (
    <div className="flex h-full flex-col bg-windowBody">
      <header className="border-b border-borderLight bg-white px-5 py-3">
        <p className="text-[13px] font-semibold text-inkStrong">Projects</p>
        <p className="text-[10px] text-inkTertiary">Selected work — 2024 to 2026</p>
      </header>

      <div className="app-scroll flex-1 space-y-3 overflow-y-auto p-4">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="flex gap-4 rounded-card border border-borderSubtle bg-white p-4 shadow-card transition-shadow hover:shadow-panel"
          >
            <div
              className="hidden h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg text-[20px] font-semibold text-white/95 sm:flex"
              style={{ background: project.accent }}
            >
              {project.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h2 className="text-[14px] font-semibold tracking-tight text-inkStrong">{project.name}</h2>
                <span className="text-[10px] font-medium uppercase tracking-wide text-inkFaint">{project.tag}</span>
              </div>
              <p className="mt-1 text-[12px] leading-5 text-inkSecondary">{project.description}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-borderLight bg-[#F7F7F7] px-2 py-0.5 text-[10px] font-medium text-inkMuted"
                  >
                    {tool}
                  </span>
                ))}
                <span className="flex-1" />
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 rounded-full bg-inkStrong px-2.5 py-1 text-[10px] font-medium text-white transition-opacity hover:opacity-85"
                >
                  <FileText size={10} strokeWidth={2} />
                  Case Study
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-1 rounded-full border border-borderSubtle bg-white px-2.5 py-1 text-[10px] font-medium text-inkSecondary transition-colors hover:bg-[#F7F7F7]"
                >
                  Live
                  <ArrowUpRight size={10} strokeWidth={2} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
