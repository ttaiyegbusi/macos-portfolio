import { useCallback, useState } from "react";
import type { AppId } from "../types";

/** A mobile screen target: an app, the settings panel, or the home screen (null). */
export type MobileTarget = AppId | "settings";

export interface MobileNav {
  /** currently open target, or null when on the home screen */
  active: MobileTarget | null;
  open: (target: MobileTarget) => void;
  close: () => void;
}

/**
 * Minimal mobile navigation: one screen open at a time, full-screen, or the
 * home screen when none is open. Sheets handle their own entrance/exit
 * animation; this just tracks which target is active.
 */
export function useMobileNav(): MobileNav {
  const [active, setActive] = useState<MobileTarget | null>(null);

  const open = useCallback((target: MobileTarget) => setActive(target), []);
  const close = useCallback(() => setActive(null), []);

  return { active, open, close };
}
