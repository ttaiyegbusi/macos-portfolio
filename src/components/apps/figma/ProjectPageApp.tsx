import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useProjectViewer } from "../../../context/ProjectViewerContext";
import { PROJECTS_BY_PAGE } from "../../../data/projects";
import ProjectSectionNav from "./ProjectSectionNav";
import ProjectCaseStudy from "./ProjectCaseStudy";

export default function ProjectPageApp() {
  const { activePage } = useProjectViewer();
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const clickScrollLock = useRef(false);

  const project = activePage ? PROJECTS_BY_PAGE[activePage] ?? null : null;

  // Reset to the top + first section whenever a different project loads in.
  useEffect(() => {
    if (!project) return;
    setActiveSectionId(project.sections[0]?.id ?? "");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    });
  }, [project?.id]);

  // Intersection Observer drives the active section indicator, scoped to
  // this window's own scroll container (not the page/window).
  useEffect(() => {
    if (!project) return;
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickScrollLock.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).dataset.sectionId;
          if (id) setActiveSectionId(id);
        }
      },
      { root, rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    // Sections register themselves into sectionRefs during the commit phase
    // (before this effect runs), so refs are already populated here. Wait a
    // frame anyway to let layout/images settle before observing.
    const attach = () => {
      Object.entries(sectionRefs.current).forEach(([id, el]) => {
        if (el) {
          el.dataset.sectionId = id;
          observer.observe(el);
        }
      });
    };
    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [project?.id]);

  const handleSelectSection = (id: string) => {
    const target = sectionRefs.current[id];
    const root = scrollRef.current;
    if (!target || !root) return;
    clickScrollLock.current = true;
    setActiveSectionId(id);
    const offset = target.offsetTop - root.offsetTop - 4;
    root.scrollTo({ top: offset, behavior: reduceMotion ? "auto" : "smooth" });
    window.setTimeout(() => {
      clickScrollLock.current = false;
    }, 600);
  };

  if (!project) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FAFAFA] text-inkMuted">
        No project selected
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 bg-[#FAFAFA]">
      <ProjectSectionNav
        sections={project.sections}
        activeId={activeSectionId}
        onSelect={handleSelectSection}
        className="hidden w-[176px] shrink-0 overflow-y-auto border-r border-borderFaint px-3 py-6 sm:block"
      />

      <div ref={scrollRef} className="app-scroll min-h-0 flex-1 overflow-y-auto">
        {/* Compact horizontal nav for narrow window widths */}
        <div className="sticky top-0 z-10 -mb-px overflow-x-auto border-b border-borderFaint bg-[#FAFAFA]/95 px-4 py-2 backdrop-blur-sm sm:hidden">
          <div className="flex gap-4">
            {project.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSelectSection(section.id)}
                aria-current={section.id === activeSectionId ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap text-[12.5px] transition-colors ${
                  section.id === activeSectionId ? "font-medium text-inkStrong" : "text-inkTertiary"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <ProjectCaseStudy project={project} scrollRef={scrollRef} sectionRefs={sectionRefs} />
      </div>
    </div>
  );
}
