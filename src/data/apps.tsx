import type { AppDefinition, AppId } from "../types";
import FigmaApp from "../components/apps/figma/FigmaApp";
import ProjectPageApp from "../components/apps/figma/ProjectPageApp";
import NotesApp from "../components/apps/NotesApp";
import DribbbleApp from "../components/apps/DribbbleApp";
import ImagePreviewApp from "../components/apps/ImagePreviewApp";
import FinderApp from "../components/apps/FinderApp";
import ProjectsApp from "../components/apps/ProjectsApp";
import { DribbbleIcon, FigmaIcon, FinderIcon, NotesIcon, ProjectsIcon } from "../components/icons/AppIcons";
import PreviewIcon from "../components/icons/PreviewIcon";
import ProjectPageIcon from "../components/icons/ProjectPageIcon";

/** vertical space reserved at the bottom of the screen for the dock */
export const DOCK_CLEARANCE = 92;

const clampBounds = (x: number, y: number, w: number, h: number, vw: number, vh: number) => {
  const cw = Math.min(w, vw - 24);
  const ch = Math.min(h, vh - DOCK_CLEARANCE - 24);
  return {
    w: cw,
    h: ch,
    x: Math.max(12, Math.min(x, vw - cw - 12)),
    y: Math.max(12, Math.min(y, vh - DOCK_CLEARANCE - ch)),
  };
};

export const APPS: Record<AppId, AppDefinition> = {
  finder: {
    id: "finder",
    name: "Finder",
    minSize: { w: 520, h: 340 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.1, vh * 0.14, 760, 500, vw, vh),
    render: () => <FinderApp />,
    icon: <FinderIcon />,
  },
  projects: {
    id: "projects",
    name: "Projects",
    minSize: { w: 460, h: 360 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.5, vh * 0.1, 660, 560, vw, vh),
    render: () => <ProjectsApp />,
    icon: <ProjectsIcon />,
  },
  figma: {
    id: "figma",
    name: "Figma",
    customChrome: true,
    minSize: { w: 740, h: 480 },
    defaultBounds: (vw, vh) => {
      // mirrors the screenshot: large, horizontally centered, generous margins
      const w = Math.min(1281, vw - Math.max(48, vw * 0.16));
      const h = Math.min(800, vh - DOCK_CLEARANCE - Math.max(40, vh * 0.12));
      return { x: (vw - w) / 2, y: Math.max(16, (vh - DOCK_CLEARANCE - h) / 2), w, h };
    },
    render: (props) => <FigmaApp {...props} />,
    icon: <FigmaIcon />,
  },
  notes: {
    id: "notes",
    name: "Notes",
    minSize: { w: 440, h: 320 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.16, vh * 0.2, 620, 460, vw, vh),
    render: () => <NotesApp />,
    icon: <NotesIcon />,
  },
  dribbble: {
    id: "dribbble",
    name: "Dribbble",
    minSize: { w: 520, h: 380 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.18, vh * 0.12, 1060, 680, vw, vh),
    render: () => <DribbbleApp />,
    icon: <DribbbleIcon />,
  },
  imagePreview: {
    id: "imagePreview",
    name: "Preview",
    minSize: { w: 480, h: 360 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.25, vh * 0.15, 900, 700, vw, vh),
    render: () => <ImagePreviewApp />,
    icon: <PreviewIcon />,
  },
  projectPage: {
    id: "projectPage",
    name: "Project",
    minSize: { w: 560, h: 420 },
    defaultBounds: (vw, vh) => clampBounds(vw * 0.5 - 470, vh * 0.5 - 360, 940, 720, vw, vh),
    render: () => <ProjectPageApp />,
    icon: <ProjectPageIcon />,
  },
};

/** dock order (left to right) */
export const APP_LIST: AppDefinition[] = [
  APPS.finder,
  APPS.projects,
  APPS.figma,
  APPS.notes,
  APPS.dribbble,
  APPS.imagePreview,
  APPS.projectPage,
];
