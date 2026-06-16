import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BACKGROUNDS, DEFAULT_BACKGROUND_ID, type BackgroundOption } from "../data/backgrounds";

const STORAGE_KEY = "tta-background";

interface BackgroundContextValue {
  background: BackgroundOption;
  backgrounds: BackgroundOption[];
  setBackgroundId: (id: string) => void;
}

const BackgroundContext = createContext<BackgroundContextValue | null>(null);

function readStoredId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && BACKGROUNDS.some((b) => b.id === stored)) return stored;
  } catch {
    /* storage unavailable (private mode, SSR) — fall back to default */
  }
  return DEFAULT_BACKGROUND_ID;
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundId, setBackgroundId] = useState<string>(readStoredId);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, backgroundId);
    } catch {
      /* non-fatal */
    }
  }, [backgroundId]);

  const value = useMemo<BackgroundContextValue>(() => {
    const background = BACKGROUNDS.find((b) => b.id === backgroundId) ?? BACKGROUNDS[0];
    return { background, backgrounds: BACKGROUNDS, setBackgroundId };
  }, [backgroundId]);

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>;
}

export function useBackground(): BackgroundContextValue {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used inside BackgroundProvider");
  return ctx;
}
