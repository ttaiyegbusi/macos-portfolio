import { useEffect, useRef, useState } from "react";

/**
 * Drives the preloader: a smoothly-eased simulated progress that also
 * respects real readiness (fonts + a couple of key images) and always
 * resolves via a hard fallback timeout so the app can never hang.
 */

// Status copy keyed by the progress threshold it unlocks at.
const STAGES: { at: number; label: string }[] = [
  { at: 0, label: "preparing desktop" },
  { at: 12, label: "opening desktop" },
  { at: 35, label: "loading app windows" },
  { at: 55, label: "setting up interactions" },
  { at: 75, label: "arranging windows" },
  { at: 90, label: "almost ready" },
  { at: 100, label: "opening portfolio" },
];

export function stageLabel(progress: number): string {
  let label = STAGES[0].label;
  for (const s of STAGES) {
    if (progress >= s.at) label = s.label;
  }
  return label;
}

const MIN_VISIBLE_MS = 1800; // keep the animation feeling intentional
const FALLBACK_MS = 3600; // never block longer than this

interface PreloaderState {
  progress: number; // 0..100
  done: boolean; // true once we've hit 100 and min-time elapsed
}

export function usePortfolioPreloader(): PreloaderState {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const startRef = useRef<number>(performance.now());
  const readyRef = useRef(false); // real assets reported ready
  const rafRef = useRef<number>(0);

  // Mark "real" readiness: fonts loaded (IBM Plex matters for layout) + a tick.
  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      if (!cancelled) readyRef.current = true;
    };

    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    if (fontsReady) {
      fontsReady.then(markReady).catch(markReady);
    } else {
      markReady();
    }

    // Hard fallback: if fonts never resolve, force readiness.
    const fallback = window.setTimeout(markReady, FALLBACK_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  // Animation loop: ease progress toward a moving target.
  useEffect(() => {
    const tick = () => {
      setProgress((prev) => {
        const elapsed = performance.now() - startRef.current;
        const minElapsed = elapsed >= MIN_VISIBLE_MS;
        const forced = elapsed >= FALLBACK_MS;

        // Ceiling the bar can chase. It can only reach 100 once the app is
        // really ready AND the minimum visible time has passed.
        const canFinish = (readyRef.current && minElapsed) || forced;
        const ceiling = canFinish ? 100 : 92;

        // Ease toward the ceiling; slower as it approaches so it never snaps.
        const remaining = ceiling - prev;
        const step = Math.max(0.4, remaining * 0.045);
        const next = Math.min(ceiling, prev + step);

        if (next >= 100) {
          setDone(true);
          return 100;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { progress, done };
}
