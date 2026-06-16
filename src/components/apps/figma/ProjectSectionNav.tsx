import type { ProjectSection } from "../../../data/projects";

interface ProjectSectionNavProps {
  sections: ProjectSection[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export default function ProjectSectionNav({ sections, activeId, onSelect, className = "" }: ProjectSectionNavProps) {
  return (
    <nav aria-label="Project sections" className={className}>
      <ul className="space-y-[2px]">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(section.id)}
                className="group flex w-full items-center gap-2.5 rounded-md px-2 py-[7px] text-left transition-colors hover:bg-black/[0.03]"
              >
                <span
                  className={`h-[1px] shrink-0 transition-all duration-300 ${
                    isActive ? "w-3 bg-inkStrong" : "w-2 bg-inkFaint group-hover:bg-inkTertiary"
                  }`}
                />
                <span
                  className={`truncate text-[12.5px] transition-colors duration-200 ${
                    isActive ? "font-medium text-inkStrong" : "text-inkTertiary group-hover:text-inkSecondary"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
