import { motion, useReducedMotion } from "framer-motion";

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

export default function MobileProjects() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-full overflow-y-auto bg-[#F7F7F8] px-5 pb-16 pt-1">
      <p className="mb-4 text-[13px] text-inkTertiary">Selected work — 2024 to 2026</p>

      <div className="space-y-4">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
          >
            <div className="h-28 w-full" style={{ background: p.accent }} />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-semibold text-inkStrong">{p.name}</h2>
                <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-inkSecondary">
                  {p.tag}
                </span>
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-inkSecondary">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-black/[0.04] px-2 py-1 text-[11px] font-medium text-inkTertiary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
