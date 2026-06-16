import type { ReactNode } from "react";

export type AppId = "finder" | "projects" | "figma" | "notes" | "dribbble" | "imagePreview" | "projectPage";

export interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WindowState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  bounds: Bounds;
  /** bounds before maximizing, restored on un-maximize */
  prevBounds: Bounds | null;
  z: number;
  /** translation from window center to dock icon center, captured at minimize time */
  minimizeTarget: { dx: number; dy: number } | null;
  /** bumps every open so the mount animation re-runs */
  openCount: number;
}

/** Props passed into every app's content component by AppWindow */
export interface AppContentProps {
  appId: AppId;
  isMaximized: boolean;
  /** the three traffic lights, ready to drop into custom chrome */
  controls: ReactNode;
  /** spread onto whichever element should act as the drag handle (custom chrome only) */
  dragHandleProps: {
    onPointerDown: (e: React.PointerEvent) => void;
    onDoubleClick: () => void;
  };
}

export interface AppDefinition {
  id: AppId;
  name: string;
  /** apps with custom chrome (Figma) render their own title bar + controls */
  customChrome?: boolean;
  minSize: { w: number; h: number };
  defaultBounds: (vw: number, vh: number) => Bounds;
  render: (props: AppContentProps) => ReactNode;
  icon: ReactNode;
}
