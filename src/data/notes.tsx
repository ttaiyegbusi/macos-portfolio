import type { ReactNode } from "react";

export interface Note {
  id: string;
  title: string;
  date: string;
  preview: string;
  body: ReactNode;
}

/**
 * Personal notes shown in the Notes app. Shared between the desktop window and
 * the mobile master-detail view so the content stays single-sourced.
 */
export const NOTES: Note[] = [
  {
    id: "about-me",
    title: "About Me",
    date: "Today, 9:41 AM",
    preview: "Hi, I'm Te...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>
          Hi, I'm <span className="font-semibold text-inkStrong">Temitope Aiyegbusi</span> — a product designer based in
          Lagos, Nigeria. I'm passionate about transforming ideas into clean, functional, and visually captivating
          products.
        </p>
        <p>
          I care about the small details: spacing that breathes, type that reads, and interactions that feel inevitable
          rather than decorative. This portfolio — a little macOS desktop — is proof of that.
        </p>
        <p>
          Reach me anytime at <span className="font-medium text-inkStrong">aiyegbusitope@gmail.com</span>.
        </p>
      </div>
    ),
  },
  {
    id: "skills-tools",
    title: "Skills & Tools",
    date: "Yesterday",
    preview: "Product design, ...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>
          Product design, UX, and interaction design sit at the core of what I do. I move comfortably between research,
          wireframing, and high-fidelity execution.
        </p>
        <p>
          Tools I reach for daily: <span className="font-medium text-inkStrong">Figma</span> for design and
          prototyping, <span className="font-medium text-inkStrong">React</span> and{" "}
          <span className="font-medium text-inkStrong">Tailwind</span> when I want to build the real thing, and a
          rotating set of AI tools that speed up the parts that should be fast.
        </p>
        <p>I believe a designer who can build ships better products. So I keep one foot in each world.</p>
      </div>
    ),
  },
  {
    id: "design-principles",
    title: "Design Principles",
    date: "Monday",
    preview: "Quiet, airy, minim...",
    body: (
      <div className="space-y-5 text-[15px] leading-[1.7] text-inkSecondary">
        <p>Quiet, airy, minimal. I'd rather remove than add.</p>
        <p>
          A few things I hold to: clarity beats cleverness, motion should explain rather than entertain, and every
          element on screen should earn its place.
        </p>
        <p>Good design feels obvious in hindsight. The work is making it obvious.</p>
      </div>
    ),
  },
];
