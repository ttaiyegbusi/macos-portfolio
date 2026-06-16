import type { ReactNode } from "react";
import { Github, Link2, Linkedin } from "lucide-react";
import { DribbbleGlyph, XGlyph } from "../components/apps/figma/glyphs";

export interface SocialLink {
  label: string;
  icon: ReactNode;
  href: string;
}

export const EMAIL = "aiyegbusitope@gmail.com";

export const SOCIALS: SocialLink[] = [
  { label: "X (formerly Twitter)", icon: <XGlyph size={15} />, href: "https://x.com/aiyegbusitope" },
  { label: "Dribbble", icon: <DribbbleGlyph size={16} />, href: "https://dribbble.com/ttaiyegbusi" },
  { label: "Github", icon: <Github size={16} strokeWidth={1.6} />, href: "https://github.com/ttaiyegbusi" },
  { label: "Website", icon: <Link2 size={16} strokeWidth={1.6} />, href: "https://tta.framer.website/" },
  { label: "LinkedIn", icon: <Linkedin size={16} strokeWidth={1.6} />, href: "https://www.linkedin.com/in/ttaiyegbusi/" },
];

export interface ProjectEntry {
  title: string;
  subtitle: string;
}

/** Project frames from the Figma canvas, surfaced as cards on mobile. */
export const PROJECTS: ProjectEntry[] = [
  { title: "Knit", subtitle: "Design tool" },
  { title: "icametoo", subtitle: "Event discovery" },
  { title: "Football Booth", subtitle: "Social networking" },
  { title: "Chain Core", subtitle: "Web3 dashboard" },
  { title: "Keyboard", subtitle: "3D exploration" },
];
