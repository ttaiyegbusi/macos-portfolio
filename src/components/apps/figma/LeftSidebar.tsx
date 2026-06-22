import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { File, Hash, PanelLeft, Plus, Search } from "lucide-react";

const PAGES = [
  "About Me",
  "Knit",
  "icametoo",
  "Football booth",
  "Chain Core",
  "Reeple",
  "Turbopay",
  "Wiremoney",
  "Myrentease",
];
const PROJECTS = ["Keyboard", "Mobile App", "Mobile App"];

/** Pages that open the project case-study window when their canvas frame is clicked. */
export const CASE_STUDY_PAGES = new Set([
  "Knit",
  "icametoo",
  "Football booth",
  "Chain Core",
  "Reeple",
  "Turbopay",
  "Wiremoney",
  "Myrentease",
]);

const ITEM_META: Record<string, { title: string; subtitle: string; thumb?: string }> = {
  "About Me": { title: "About Me", subtitle: "Portfolio overview" },
  Knit: { title: "Knit", subtitle: "Design tool", thumb: "/images/projects/knit-thumb.png" },
  icametoo: { title: "icametoo", subtitle: "Event discovery", thumb: "/images/projects/icametoo-thumb.png" },
  "Football booth": { title: "Football Booth", subtitle: "Social networking", thumb: "/images/projects/football-booth-thumb.png" },
  "Chain Core": { title: "Chain Core", subtitle: "Web3 dashboard", thumb: "/images/projects/chain-core-thumb.png" },
  Reeple: { title: "Reeple", subtitle: "Remittances & payments", thumb: "/images/projects/reeple-thumb.png" },
  Turbopay: { title: "Turbopay", subtitle: "Payments app", thumb: "/images/projects/turbopay-thumb.png" },
  Wiremoney: { title: "Wiremoney", subtitle: "Multi-currency accounts", thumb: "/images/projects/wiremoney-thumb.png" },
  Myrentease: { title: "Rentease", subtitle: "Property & rent management", thumb: "/images/projects/myrentease-thumb.png" },
  Keyboard: { title: "Keyboard", subtitle: "3D exploration" },
  "Mobile App": { title: "Mobile App", subtitle: "Concept design" },
};

const PREVIEW_HEIGHT = 178;

interface LeftSidebarProps {
  activePage: string;
  onSelectPage: (page: string) => void;
  onCollapse: () => void;
  isDarkMode?: boolean;
}

interface HoverPreview {
  name: string;
  top: number;
}

export default function LeftSidebar({ activePage, onSelectPage, onCollapse, isDarkMode = false }: LeftSidebarProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<HoverPreview | null>(null);

  const showPreview = (name: string) => (e: React.MouseEvent<HTMLElement>) => {
    if (name === "About Me") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rowRect = e.currentTarget.getBoundingClientRect();
    const wrapRect = wrapper.getBoundingClientRect();
    const top = Math.max(6, Math.min(rowRect.top - wrapRect.top, wrapRect.height - PREVIEW_HEIGHT - 6));
    setPreview({ name, top });
  };
  const hidePreview = () => setPreview(null);

  const meta = preview ? ITEM_META[preview.name] : null;

  return (
    <div ref={wrapperRef} className="relative h-full w-full">
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-panel border shadow-panel backdrop-blur-sm ${
          isDarkMode
            ? "border-[#3a3a3a] bg-[#222]/90"
            : "border-borderLight bg-white/90"
        }`}
      >
        {/* Title row */}
        <div
          className={`flex h-11 shrink-0 items-center justify-between border-b px-3.5 ${
            isDarkMode ? "border-[#2a2a2a]" : "border-borderFaint"
          }`}
        >
          <span className={`text-[15px] font-medium tracking-tight ${isDarkMode ? "text-[#ddd]" : "text-[#626262]"}`}>
            Knit
          </span>
          <button
            onClick={onCollapse}
            title="Hide sidebars"
            className={`rounded p-1 transition-colors ${
              isDarkMode
                ? "text-[#999] hover:bg-white/[0.08] hover:text-[#ccc]"
                : "text-iconSoft hover:bg-black/[0.05] hover:text-inkSecondary"
            }`}
          >
            <PanelLeft size={14} strokeWidth={1.6} />
          </button>
        </div>

        {/* File / search row */}
        <div
          className={`flex h-[35px] shrink-0 items-center justify-between border-b px-3.5 ${
            isDarkMode ? "border-[#2a2a2a]" : "border-borderFaint"
          }`}
        >
          <span className={`text-[12px] ${isDarkMode ? "text-[#888]" : "text-inkTertiary"}`}>File</span>
          <Search size={13} strokeWidth={1.6} className={isDarkMode ? "text-[#666]" : "text-iconSoft"} />
        </div>

        {/* Pages */}
        <div className={`border-b px-2 pb-2 pt-3 ${isDarkMode ? "border-[#2a2a2a]" : "border-borderFaint"}`}>
          <div className="flex items-center justify-between px-1.5 pb-1.5">
            <span className={`text-[10.5px] font-medium tracking-[0.12em] ${isDarkMode ? "text-[#666]" : "text-iconSoft"}`}>
              PAGES
            </span>
            <Plus size={12} strokeWidth={1.6} className={isDarkMode ? "text-[#666]" : "text-iconSoft"} />
          </div>
          {PAGES.map((page) => {
            const isActive = page === activePage;
            return (
              <button
                key={page}
                onClick={() => onSelectPage(page)}
                onMouseEnter={showPreview(page)}
                onMouseLeave={hidePreview}
                className={`flex h-[30px] w-full items-center gap-2 rounded-md px-1.5 text-left text-[12.5px] transition-colors ${
                  isActive
                    ? isDarkMode
                      ? "bg-white/[0.08] text-[#ddd]"
                      : "bg-black/[0.05] text-inkSecondary"
                    : isDarkMode
                      ? "text-[#999] hover:bg-white/[0.04]"
                      : "text-inkTertiary hover:bg-black/[0.03]"
                }`}
              >
                <File size={12.5} strokeWidth={1.5} className={isActive ? (isDarkMode ? "text-[#aaa]" : "text-inkMuted") : isDarkMode ? "text-[#666]" : "text-iconMuted"} />
                <span className="truncate">{page}</span>
              </button>
            );
          })}
        </div>

        {/* Projects */}
        <div className="px-2 pt-3">
          <div className="flex items-center justify-between px-1.5 pb-1.5">
            <span className={`text-[10.5px] font-medium tracking-[0.12em] ${isDarkMode ? "text-[#666]" : "text-iconSoft"}`}>
              PROJECTS
            </span>
            <Plus size={12} strokeWidth={1.6} className={isDarkMode ? "text-[#666]" : "text-iconSoft"} />
          </div>
          {PROJECTS.map((project, i) => (
            <div
              key={`${project}-${i}`}
              onMouseEnter={showPreview(project)}
              onMouseLeave={hidePreview}
              className={`flex h-[30px] w-full cursor-default items-center gap-2 rounded-md px-1.5 text-[12.5px] transition-colors ${
                isDarkMode
                  ? "text-[#999] hover:bg-white/[0.04]"
                  : "text-inkTertiary hover:bg-black/[0.03]"
              }`}
            >
              <Hash size={12.5} strokeWidth={1.5} className={isDarkMode ? "text-[#666]" : "text-iconMuted"} />
              <span className="truncate">{project}</span>
            </div>
          ))}
        </div>

        <div className="flex-1" />
      </div>

      {/* Hover preview card */}
      <AnimatePresence>
        {preview && meta && (
          <motion.div
            key={preview.name}
            initial={{ opacity: 0, x: -6, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 480, damping: 34 }}
            className={`pointer-events-none absolute z-20 w-[176px] rounded-[6px] border p-2 shadow-[0_10px_30px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.05)] ${
              isDarkMode
                ? "border-[#3a3a3a] bg-[#1a1a1a]"
                : "border-borderLight bg-white"
            }`}
            style={{ left: "calc(100% + 10px)", top: preview.top }}
          >
            {meta.thumb ? (
              <div className={`h-[118px] w-full overflow-hidden rounded-[4px] border ${isDarkMode ? "border-[#2a2a2a]" : "border-borderFaint"}`}>
                <img src={meta.thumb} alt="" className="h-full w-full object-cover" draggable={false} />
              </div>
            ) : (
              <div className={`h-[118px] w-full rounded-[4px] border ${isDarkMode ? "border-[#2a2a2a] bg-[#0f0f0f]" : "border-borderFaint bg-[#F6F6F6]"}`} />
            )}
            <p className={`mt-2 px-0.5 text-[12px] font-semibold leading-tight ${isDarkMode ? "text-[#ddd]" : "text-inkStrong"}`}>
              {meta.title}
            </p>
            <p className={`mb-0.5 mt-0.5 px-0.5 text-[10.5px] leading-tight ${isDarkMode ? "text-[#777]" : "text-inkTertiary"}`}>
              {meta.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
