import type { ReactNode } from "react";
import type { AppId } from "../types";
import { APPS } from "./apps";
import MobileFigma from "../components/mobile/apps/MobileFigma";
import MobileNotes from "../components/mobile/apps/MobileNotes";
import MobileDribbble from "../components/mobile/apps/MobileDribbble";
import MobileProjects from "../components/mobile/apps/MobileProjects";
import MobileFinder from "../components/mobile/apps/MobileFinder";

/**
 * Mobile app registry. Reuses the same icons + names from the desktop APPS
 * record, but each app renders a touch-native mobile screen instead of a
 * draggable window. Screens are placeholders in this phase; real content is
 * wired app-by-app in the next phase.
 *
 * `imagePreview` is intentionally excluded from the home grid/dock: on mobile
 * the Preview opens as a full-screen viewer launched from Dribbble, not as a
 * standalone home-screen app.
 */

export interface MobileAppDefinition {
  id: AppId;
  name: string;
  icon: ReactNode;
  /** the full-screen mobile content for this app */
  render: () => ReactNode;
  /** show on the home-screen grid */
  onHome: boolean;
  /** pin to the bottom dock */
  inDock: boolean;
}

const def = (
  id: AppId,
  opts: { onHome?: boolean; inDock?: boolean; render?: () => ReactNode; name?: string } = {},
): MobileAppDefinition => ({
  id,
  name: opts.name ?? APPS[id].name,
  icon: APPS[id].icon,
  render: opts.render ?? (() => null),
  onHome: opts.onHome ?? true,
  inDock: opts.inDock ?? false,
});

/** Home-screen grid order. */
export const MOBILE_APPS: MobileAppDefinition[] = [
  def("figma", { inDock: true, name: "About", render: () => <MobileFigma /> }),
  def("notes", { inDock: true, render: () => <MobileNotes /> }),
  def("dribbble", { inDock: true, render: () => <MobileDribbble /> }),
  def("projects", { render: () => <MobileProjects /> }),
  def("finder", { inDock: true, render: () => <MobileFinder /> }),
];

export const MOBILE_DOCK_APPS: MobileAppDefinition[] = MOBILE_APPS.filter((a) => a.inDock);

export function getMobileApp(id: AppId): MobileAppDefinition | undefined {
  return MOBILE_APPS.find((a) => a.id === id);
}
