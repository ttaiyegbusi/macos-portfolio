import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProjectCaseStudy as ProjectCaseStudyData, ProjectSection } from "../../../data/projects";

interface ProjectCaseStudyProps {
  project: ProjectCaseStudyData;
  scrollRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

function SectionBlock({
  section,
  registerRef,
  reduceMotion,
}: {
  section: ProjectSection;
  registerRef: (id: string, el: HTMLElement | null) => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.section
      id={`section-${section.id}`}
      ref={(el) => registerRef(section.id, el)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0.75, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root: undefined, margin: "-10% 0px -60% 0px", once: true }}
      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
      className="py-7 first:pt-0"
    >
      <h2 className="mb-3 text-[19px] font-semibold tracking-tight text-inkStrong">{section.title}</h2>
      <div className="space-y-4 text-[14.5px] leading-[1.7] text-inkSecondary">
        {section.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {section.image && (
        <div className="mt-5 overflow-hidden rounded-[10px] border border-borderFaint bg-[#F6F6F6]">
          <img
            src={section.image}
            alt=""
            className="h-auto w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
    </motion.section>
  );
}

export default function ProjectCaseStudy({ project, scrollRef, sectionRefs }: ProjectCaseStudyProps) {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset] = useState(0);

  // Subtle parallax on the hero image as the user scrolls, skipped under reduced motion.
  useEffect(() => {
    if (reduceMotion) return;
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const onScroll = () => {
      const top = scrollEl.scrollTop;
      setHeroOffset(Math.min(top * 0.12, 40));
    };
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [reduceMotion, scrollRef]);

  const registerRef = (id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="mx-auto w-full max-w-[720px] px-8 py-9 sm:px-12">
      {/* Metadata + title */}
      <p className="mb-3 text-[12px] text-inkTertiary">
        {project.category}
        <span className="px-1.5 text-inkFaint">•</span>
        {project.platforms.join(", ")}
        <span className="px-1.5 text-inkFaint">•</span>
        {project.year}
      </p>
      <h1 className="text-[26px] font-semibold leading-[1.3] tracking-tight text-inkStrong">{project.title}</h1>

      {/* Hero */}
      <div ref={heroRef} className="mt-7 overflow-hidden rounded-[14px]">
        {project.heroImage ? (
          <img src={project.heroImage} alt="" className="h-auto w-full object-cover" loading="eager" />
        ) : (
          <div
            className="hero-noise relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden"
            style={{
              background: project.heroTone,
              transform: reduceMotion ? undefined : `translateY(${heroOffset}px) scale(1.04)`,
            }}
          >
            <div className="rounded-[10px] border border-white/30 bg-white/90 px-5 py-3 text-[12px] font-medium text-inkSecondary shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              {project.windowTitle} preview
            </div>
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="divide-y divide-borderFaint">
        {project.sections.map((section) => (
          <SectionBlock key={section.id} section={section} registerRef={registerRef} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
}
