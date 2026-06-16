import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectViewerContextType {
  /** sidebar page name of the project currently loaded into the viewer window (e.g. "Knit", "Reeple") */
  activePage: string | null;
  setActiveProject: (pageName: string) => void;
  clearActiveProject: () => void;
}

const ProjectViewerContext = createContext<ProjectViewerContextType | null>(null);

export function ProjectViewerProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<string | null>(null);

  const setActiveProject = (pageName: string) => setActivePage(pageName);
  const clearActiveProject = () => setActivePage(null);

  return (
    <ProjectViewerContext.Provider value={{ activePage, setActiveProject, clearActiveProject }}>
      {children}
    </ProjectViewerContext.Provider>
  );
}

export function useProjectViewer() {
  const ctx = useContext(ProjectViewerContext);
  if (!ctx) throw new Error("useProjectViewer must be used inside ProjectViewerProvider");
  return ctx;
}
