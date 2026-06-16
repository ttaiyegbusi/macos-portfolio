import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MacLoadingDialog from "./MacLoadingDialog";
import { usePortfolioPreloader } from "./usePortfolioPreloader";

interface PreloaderProps {
  /** Called once the loader has fully animated out, so the app can mark itself ready. */
  onComplete?: () => void;
}

/**
 * Full-screen, top-most preloading overlay. Sits above everything, blocks
 * interaction with the desktop beneath, and fades/scales out softly once
 * loading completes. Respects prefers-reduced-motion.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const { progress, done } = usePortfolioPreloader();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // When loading finishes, hold for a beat so 100% registers, then exit.
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setVisible(false), 320);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#FBFBFC]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.3 : 0.6,
            ease: [0.32, 0.72, 0, 1],
          }}
          // Block all interaction with the desktop while present.
          style={{ touchAction: "none" }}
        >
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.3 } }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0.3 }
                : { type: "spring", stiffness: 260, damping: 24, mass: 0.9 }
            }
          >
            <MacLoadingDialog progress={progress} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
