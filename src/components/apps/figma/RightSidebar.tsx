import { ArrowUpRight, Copy, Github, Link2, Linkedin, Moon, Users } from "lucide-react";
import { DribbbleGlyph, XGlyph } from "./glyphs";

const SOCIALS = [
  { label: "X (formerly Twitter)", icon: <XGlyph size={13} />, href: "https://x.com/aiyegbusitope" },
  { label: "Dribbble", icon: <DribbbleGlyph size={14} />, href: "https://dribbble.com/ttaiyegbusi" },
  { label: "Github", icon: <Github size={14} strokeWidth={1.5} />, href: "https://github.com/ttaiyegbusi" },
  { label: "Website", icon: <Link2 size={14} strokeWidth={1.5} />, href: "https://tta.framer.website/" },
  { label: "LinkedIn", icon: <Linkedin size={14} strokeWidth={1.5} />, href: "https://www.linkedin.com/in/ttaiyegbusi/" },
];

interface RightSidebarProps {
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export default function RightSidebar({ isDarkMode = false, onToggleDarkMode }: RightSidebarProps) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aiyegbusitope@gmail.com");
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const borderCls = isDarkMode ? "border-[#383838]" : "border-borderFaint";

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-panel border shadow-panel backdrop-blur-sm ${
        isDarkMode ? "border-[#3a3a3a] bg-[#252525]/95" : "border-borderLight bg-white/90"
      }`}
    >
      {/* Profile header */}
      <div className={`flex shrink-0 items-center gap-2.5 border-b px-3.5 py-3.5 ${borderCls}`}>
        <div className={`h-[27px] w-[27px] shrink-0 rounded-full ${isDarkMode ? "bg-[#454545]" : "bg-iconMuted"}`} />
        <div className="min-w-0">
          <p className={`truncate text-[12px] font-semibold leading-tight ${isDarkMode ? "text-[#d8d8d8]" : "text-[#6C6C6C]"}`}>
            Temitope Aiyegbusi
          </p>
          <p className={`truncate text-[10.5px] leading-tight ${isDarkMode ? "text-[#828282]" : "text-iconSoft"}`}>
            aiyegbusitope@gmail.com
          </p>
        </div>
      </div>

      {/* Utility icon row */}
      <div className={`flex h-[34px] shrink-0 items-center gap-4 border-b px-3.5 ${borderCls} ${isDarkMode ? "text-[#9a9a9a]" : "text-iconSoft"}`}>
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? "Light mode" : "Dark mode"}
          className={`rounded p-1 transition-colors ${
            isDarkMode ? "bg-white/[0.08] text-[#e0e0e0] hover:bg-white/[0.14]" : "hover:bg-black/[0.05] hover:text-inkSecondary"
          }`}
        >
          <Moon size={13} strokeWidth={1.5} />
        </button>
        <button
          onClick={copyEmail}
          title="Copy email to clipboard"
          className={`rounded p-1 transition-colors ${
            isDarkMode ? "hover:bg-white/[0.08] hover:text-[#d0d0d0]" : "hover:bg-black/[0.05] hover:text-inkSecondary"
          }`}
        >
          <Copy size={13} strokeWidth={1.5} />
        </button>
        <Users size={13} strokeWidth={1.5} />
      </div>

      {/* Socials */}
      <div className="px-2 pt-3">
        <div className="flex items-center justify-between px-1.5 pb-2">
          <span className={`text-[10.5px] font-medium tracking-[0.12em] ${isDarkMode ? "text-[#777]" : "text-iconSoft"}`}>SOCIALS</span>
          <ArrowUpRight size={12} strokeWidth={1.6} className={isDarkMode ? "text-[#777]" : "text-iconSoft"} />
        </div>
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className={`group flex h-[31px] w-full items-center justify-between rounded-md px-1.5 text-[12.5px] transition-colors ${
              isDarkMode
                ? "text-[#b0b0b0] hover:bg-white/[0.06] hover:text-[#e0e0e0]"
                : "text-inkTertiary hover:bg-black/[0.03] hover:text-inkSecondary"
            }`}
          >
            <span className="truncate">{social.label}</span>
            <span className={`transition-colors ${isDarkMode ? "text-[#888] group-hover:text-[#ccc]" : "text-iconSoft group-hover:text-inkMuted"}`}>
              {social.icon}
            </span>
          </a>
        ))}
      </div>

      <div className={`flex-1 border-t ${borderCls}`} style={{ marginTop: 14 }} />
    </div>
  );
}
